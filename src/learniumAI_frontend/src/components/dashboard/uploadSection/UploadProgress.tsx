import React from "react";

interface UploadProgressProps {
  progress: number;
  timeLeft: string;
}

const UploadProgress: React.FC<UploadProgressProps> = ({
  progress,
  timeLeft,
}) => {
  return (
    <div className="bg-[#F1ECFF] p-4 rounded-lg mt-4 shadow-sm">
      {/* Teks Progres */}
      <p className="text-black font-medium mb-1">Mengunggah...</p>

      {/* Info Progres */}
      <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
        <span>{`${progress}%`}</span>
        <span>{timeLeft}</span>
      </div>

      {/* Progres Bar */}
      <div className="w-full bg-gray-300 rounded-full overflow-hidden h-2">
        <div
          className="bg-primary-normal h-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default UploadProgress;
