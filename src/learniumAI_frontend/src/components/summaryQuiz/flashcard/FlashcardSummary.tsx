import React from "react";
import ReactMarkdown from "react-markdown";

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
      <ReactMarkdown className="prose prose-invert text-sm font-light leading-relaxed">
        {summaryContent}
      </ReactMarkdown>
    </div>
  );
};

export default FlashcardSummary;
