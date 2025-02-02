import React from "react";
import { useNavigate } from "react-router-dom";

interface UploadedFileItemProps {
  file: {
    name: string;
    size: string;
    progress: number;
    result?: {
      flashcards: string[];
    };
  };
  onRemove: (fileName: string) => void;
  isUploading: boolean;
  showResult: boolean;
  isProcessing: boolean; // Status processing untuk tombol
}

const UploadedFileItem: React.FC<UploadedFileItemProps> = ({
  file,
  onRemove,
  isUploading,
  showResult,
  isProcessing,
}) => {
  const navigate = useNavigate();

  const handleSeeResult = () => {
    console.log("See Result", file.result);

    if (file.result?.flashcards) {
      navigate("/summary-quiz", {
        state: { flashcards: file.result.flashcards },
      });
    }
  };
  const getFileIcon = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase();
    switch (extension) {
      case "pdf":
        return "/assets/doc-icons/Document - PDF/Filled.png";
      case "doc":
      case "docx":
        return "/assets/doc-icons/Document - DOCX/Filled.png";
      case "ppt":
      case "pptx":
        return "/assets/doc-icons/Document - PPTX/Filled.png";
      case "xls":
      case "xlsx":
        return "/assets/doc-icons/Document - XLSX/Filled.png";
      case "csv":
        return "/assets/doc-icons/Document - CSV/Filled.png";
      default:
        return "/assets/doc-icons/Document - TXT/Filled.png"; // Default icon
    }
  };

  return (
    <div className="mb-6">
      <div className="bg-[#F1ECFF] rounded-lg p-4 shadow-sm flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img
            src={getFileIcon(file.name)}
            alt={`${file.name} Icon`}
            className="w-8 h-8"
          />
          <div>
            <p className="font-medium text-black">{file.name}</p>
            <p className="text-gray-600 text-sm">{file.size}</p>
          </div>
        </div>
        <button
          className="text-gray-500 hover:text-red-500"
          onClick={() => onRemove(file.name)}
        >
          ✕
        </button>
      </div>

      {/* Tombol Generate Result */}
      <div className="mt-4 flex">
        <button
          onClick={handleSeeResult}
          disabled={isUploading || isProcessing}
          className={`py-2 px-6 rounded-md font-medium ${
            isUploading || isProcessing
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-[#FB928E] to-[#6F41FF] text-white hover:opacity-90"
          }`}
        >
          {isProcessing ? (
            <div className="animate-spin border-4 border-t-4 border-white rounded-full w-5 h-5"></div>
          ) : (
            "See Result"
          )}
        </button>
      </div>
    </div>
  );
};

export default UploadedFileItem;
