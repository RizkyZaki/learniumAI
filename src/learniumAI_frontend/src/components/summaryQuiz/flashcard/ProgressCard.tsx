import React from "react";

interface ProgressCardProps {
  title: string;
  totalCards: number;
  totalQuestions: number;
  progress: number; // progress dalam persentase (0-100)
}

const ProgressCard: React.FC<ProgressCardProps> = ({
  title,
  totalCards,
  totalQuestions,
  progress,
}) => {
  return (
    <div className="bg-gradient-to-r from-[#FB928E] to-[#6F41FF] p-6 mt-10 rounded-2xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white text-xl font-semibold">{title}</h3>
        <span className="text-gray-200 text-sm">{`${totalCards} kartu • ${totalQuestions} pertanyaan`}</span>
      </div>
      <div className="bg-white h-2 rounded-full overflow-hidden">
        <div
          className=" bg-primary-dark h-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-primary-dark text-sm mt-2">Progress kamu</p>
    </div>
  );
};

export default ProgressCard;
