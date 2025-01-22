import { useState } from "react";
import FileDropZone from "./FileDropZone";
import UploadProgress from "./UploadProgress";
import UploadedFileItem from "./UploadedFileItem";

interface UploadedFile {
  name: string;
  size: string;
  progress: number;
}

const UploadSection = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [uploadingFile, setUploadingFile] = useState<UploadedFile | null>(null);

  const [isUploading, setIsUploading] = useState(false);

  const files = [{ name: "Contoh Materi 1.pdf", size: "5.3MB", progress: 100 }];

  const handleFileUpload = (files: File[]) => {
    const file = files[0];
    const newFile = {
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      progress: 0,
    };

    setUploadingFile(newFile);

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
          return null;
        }
      });
    }, 500);
  };

  const handleRemoveFile = (fileName: string) => {
    setUploadedFiles((prevFiles) =>
      prevFiles.filter((file) => file.name !== fileName)
    );
  };

  return (
    <section className="rounded-lg  mb-32">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-4xl font-semibold text-basic-white">Upload File</h1>
      </div>

      {/* Upload Section */}
      <FileDropZone onFileUpload={handleFileUpload} />
      {uploadingFile && (
        <UploadProgress
          progress={uploadingFile.progress}
          timeLeft={`${(10 - uploadingFile.progress / 10) * 0.5} detik lagi`}
        />
      )}

      {/* Note */}
      <p className="text-gray-light mt-2 text-sm">
        Format yang didukung: .jpg, .png, .svg, dan .zip
      </p>

      {/* Uploaded Files */}
      <div className="mt-4 space-y-2">
        {uploadedFiles.map((file) => (
          <UploadedFileItem
            key={file.name}
            file={file}
            onRemove={handleRemoveFile}
            isUploading={isUploading}
          />
        ))}
      </div>
    </section>
  );
};

export default UploadSection;
