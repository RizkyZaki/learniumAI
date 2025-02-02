import { useState } from "react";
import FileDropZone from "./FileDropZone";
import UploadProgress from "./UploadProgress";
import UploadedFileItem from "./UploadedFileItem";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as pdfjs from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker?url";
import ReactLoading from "react-loading"; // Import react-loading

// Konfigurasi workerSrc untuk pdfjs-dist
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

interface UploadedFile {
  name: string;
  size: string;
  progress: number;
  result?: {
    notes: string;
    flashcards: string[];
    quiz: string[];
  };
}

const UploadSection = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [uploadingFile, setUploadingFile] = useState<UploadedFile | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedContent, setExtractedContent] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleFileUpload = async (files: File[]) => {
    const file = files[0];

    // Validasi hanya file PDF
    if (!file.name.toLowerCase().endsWith(".pdf")) {
      alert("Only PDF files are allowed!");
      return;
    }

    console.log("📂 File yang diunggah:", file);

    const newFile = {
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      progress: 0,
    };

    setUploadingFile(newFile);
    setIsUploading(true);

    // Simulasi upload dengan progres
    const interval = setInterval(() => {
      setUploadingFile((prev) => {
        if (prev && prev.progress < 100) {
          return { ...prev, progress: prev.progress + 10 };
        } else {
          clearInterval(interval);
          setUploadedFiles((prevFiles) => {
            const updatedFiles = [...prevFiles, { ...newFile, progress: 100 }];
            localStorage.setItem(
              "recentChapters",
              JSON.stringify(updatedFiles)
            ); // Simpan ke LocalStorage
            return updatedFiles;
          });
          setUploadingFile(null);
          setIsUploading(false);
          return null;
        }
      });
    }, 500);

    // Ekstrak teks dari PDF setelah selesai diunggah
    const extractedText = await extractTextFromPDF(file);
    console.log("📄 Hasil ekstraksi teks dari PDF:", extractedText);
    setExtractedContent(extractedText);

    // Kirim teks ke LLM untuk diproses
    if (extractedText) {
      try {
        setIsProcessing(true);
        const formData = new FormData();
        formData.append("content", extractedText);
        formData.append("file", file);

        console.log("📤 Mengirim teks ke API...");
        console.log("📝 Data yang dikirim:", extractedText);

        const response = await axios.post(
          "https://frisjjj.pythonanywhere.com/analyze",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("✅ Response dari API:", response.data);

        if (response.status === 200) {
          const result = response.data;

          console.log("🛠️ Data hasil dari API:", result);

          // Simpan hasil ke localStorage
          localStorage.setItem("summaryData", JSON.stringify(result));

          // Update state uploadedFiles dengan hasil
          setUploadedFiles((prevFiles) =>
            prevFiles.map((uploadedFile) =>
              uploadedFile.name === newFile.name
                ? { ...uploadedFile, result }
                : uploadedFile
            )
          );

          navigate("/summary-quiz", {
            state: { flashcards: result.flashcards },
          });
        } else {
          throw new Error("Gagal mendapatkan hasil");
        }
      } catch (error) {
        console.error("❌ Error posting to API:", error);
        setErrorMessage("Terjadi kesalahan dalam proses analisis.");
      } finally {
        setIsProcessing(false);
      }
    }
  };

  // Fungsi ekstraksi teks dari PDF menggunakan pdfjs-dist
  const extractTextFromPDF = async (file: File): Promise<string> => {
    console.log("📥 Mulai ekstraksi teks dari PDF...");

    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onload = async (event) => {
        try {
          const typedArray = new Uint8Array(
            event.target?.result as ArrayBuffer
          );
          const pdf = await pdfjs.getDocument({ data: typedArray }).promise;

          console.log("📜 Jumlah halaman PDF:", pdf.numPages);

          let extractedText = "";
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();

            const pageText = textContent.items
              .map((item) => (item as any).str)
              .join(" ");

            console.log(`📄 Teks halaman ${i}:`, pageText);

            extractedText += pageText + "\n";
          }

          console.log("✅ Final Extracted Text:", extractedText);
          resolve(extractedText);
        } catch (error) {
          console.error("❌ Error extracting text from PDF:", error);
          reject(error);
        }
      };

      reader.readAsArrayBuffer(file);
    });
  };

  return (
    <section className="rounded-lg mb-32">
      <div className="mb-6">
        <h1 className="text-4xl font-semibold text-basic-white">Upload File</h1>
      </div>

      <FileDropZone onFileUpload={handleFileUpload} />
      {uploadingFile && (
        <UploadProgress
          progress={uploadingFile.progress}
          timeLeft={`${(10 - uploadingFile.progress / 10) * 0.5} detik lagi`}
        />
      )}

      <p className="text-gray-light mt-2 text-sm">Format yang didukung: .pdf</p>

      {/* Overlay Loading saat Upload atau Processing */}
      {(isUploading || isProcessing) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center ">
          <ReactLoading type="spin" color="#F1ECFF" height={50} width={50} />
        </div>
      )}

      <div className="mt-4 space-y-2">
        {uploadedFiles.map((file) => (
          <UploadedFileItem
            key={file.name}
            file={file}
            onRemove={() => {}}
            isUploading={isUploading}
            isProcessing={isProcessing}
            showResult={file.result !== undefined}
          />
        ))}
      </div>

      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
    </section>
  );
};

export default UploadSection;
