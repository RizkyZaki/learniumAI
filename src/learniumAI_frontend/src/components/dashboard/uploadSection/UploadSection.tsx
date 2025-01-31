import { useState } from "react";
import FileDropZone from "./FileDropZone";
import UploadProgress from "./UploadProgress";
import UploadedFileItem from "./UploadedFileItem";
import { generateEducationalContent } from "../../../services/llmService";
import * as pdfjs from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker?url";

// Konfigurasi workerSrc untuk pdfjs-dist
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

interface UploadedFile {
  name: string;
  size: string;
  progress: number;
}

const UploadSection = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [uploadingFile, setUploadingFile] = useState<UploadedFile | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [extractedContent, setExtractedContent] = useState<string | null>(null);

  const handleFileUpload = async (files: File[]) => {
    const file = files[0];
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
          setUploadedFiles((prevFiles) => [
            ...prevFiles,
            { ...newFile, progress: 100 },
          ]);
          setUploadingFile(null);
          setIsUploading(false);
          return null;
        }
      });
    }, 500);

    // Ekstrak teks dari PDF setelah selesai diunggah
    const extractedText = await extractTextFromPDF(file);
    setExtractedContent(extractedText);

    // Kirim teks ke LLM untuk diproses
    if (extractedText) {
      const result = await generateEducationalContent(extractedText);
      console.log("Ringkasan:", result.notes);
      console.log("Flashcards:", result.flashcards);
      console.log("Quiz:", result.quiz);
    }
  };

  // Fungsi ekstraksi teks dari PDF menggunakan pdfjs-dist
  const extractTextFromPDF = async (file: File): Promise<string> => {
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onload = async (event) => {
        try {
          const typedArray = new Uint8Array(
            event.target?.result as ArrayBuffer
          );
          console.log("PDF Loaded, Extracting Text...");

          const pdf = await pdfjs.getDocument({ data: typedArray }).promise;
          console.log(`PDF memiliki ${pdf.numPages} halaman.`);

          let extractedText = "";
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();

            const pageText = textContent.items
              .map((item) => (item as any).str)
              .join(" ");
            console.log(`Halaman ${i} Ekstrak:`, pageText);

            extractedText += pageText + "\n";
          }

          console.log("Final Extracted Text:", extractedText);
          resolve(extractedText);
        } catch (error) {
          console.error("Error extracting text from PDF:", error);
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

      <div className="mt-4 space-y-2">
        {uploadedFiles.map((file) => (
          <UploadedFileItem
            key={file.name}
            file={file}
            onRemove={() => {}}
            isUploading={isUploading}
          />
        ))}
      </div>
    </section>
  );
};

export default UploadSection;
