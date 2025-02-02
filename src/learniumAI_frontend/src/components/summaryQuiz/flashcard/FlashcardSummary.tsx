import React from "react";

interface FlashcardSummaryProps {
  summaryTitle: string;
  summaryContent: string;
}

const FlashcardSummary: React.FC<FlashcardSummaryProps> = ({
  summaryTitle,
  summaryContent,
}) => {
  return (
    <div className="bg-[#6F41FF] p-6 rounded-xl text-white shadow-md">
      <h3 className="text-xl font-bold mb-4">{summaryTitle}</h3>
      <p className="text-sm font-light leading-relaxed">{summaryContent}</p>
    </div>
  );
};

export default FlashcardSummary;
