import React from "react";

interface FileDropZoneProps {
  onFileUpload: (files: File[]) => void;
}

const FileDropZone: React.FC<FileDropZoneProps> = ({ onFileUpload }) => {
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);

    // Validasi hanya menerima PDF
    const pdfFiles = files.filter((file) =>
      file.name.toLowerCase().endsWith(".pdf")
    );

    if (pdfFiles.length === 0) {
      alert("Only PDF files are allowed!");
      return;
    }

    onFileUpload(pdfFiles);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    // Validasi hanya menerima PDF
    const pdfFiles = files.filter((file) =>
      file.name.toLowerCase().endsWith(".pdf")
    );

    if (pdfFiles.length === 0) {
      alert("Only PDF files are allowed!");
      return;
    }

    onFileUpload(pdfFiles);
  };

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className="border-2 border-dashed border-gray-lightMedium rounded-lg p-8 text-center cursor-pointer bg-primary-dark bg-opacity-20"
    >
      {/* Ikon Awan */}
      <div className="flex justify-center mb-4">
        <img
          src="/assets/logo/backup.png"
          alt="Cloud Upload"
          className="w-16 h-16"
        />
      </div>

      {/* Teks Instruksi */}
      <p className="text-gray-lightMedium text-lg font-medium mb-2">
        Drag your file(s) to start uploading
      </p>

      {/* Separator "OR" */}
      <div className="flex items-center justify-center my-4">
        <div className="w-20 border-t border-gray-light"></div>
        <p className="mx-2 text-gray-light">OR</p>
        <div className="w-20 border-t border-gray-light"></div>
      </div>

      {/* Tombol Browse Files */}
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileInput}
        className="hidden"
        id="file-input"
      />
      <label
        htmlFor="file-input"
        className="inline-block py-2 px-6 rounded-md bg-gradient-to-r from-[#FB928E] to-[#6F41FF] text-white font-medium cursor-pointer hover:opacity-90"
      >
        Browse files
      </label>
    </div>
  );
};

export default FileDropZone;
