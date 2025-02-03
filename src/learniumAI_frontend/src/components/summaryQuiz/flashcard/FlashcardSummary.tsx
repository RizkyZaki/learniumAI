import React from "react";

interface FlashcardSummaryProps {
  summaryContent: string;
}

const FlashcardSummary: React.FC<FlashcardSummaryProps> = ({
  summaryContent,
}) => {
  // Format konten agar Q di atas dan A di bawah
  const formattedContent = summaryContent.split("\n").map((line, index) => {
    // Hapus tanda "-" di awal jika ada
    const cleanLine = line.replace(/^- /, "").trim();

    if (cleanLine.startsWith("Q:")) {
      return (
        <p key={index} className=" text-white">
          {cleanLine}
        </p>
      );
    } else if (cleanLine.startsWith("A:")) {
      return (
        <p key={index} className=" text-white">
          {cleanLine}
        </p>
      );
    }
    return (
      <p key={index} className="text-white">
        {cleanLine}
      </p>
    );
  });

  return (
    <div className="bg-[#6F41FF] p-6 rounded-xl text-white shadow-md">
      <div className="prose prose-invert text-sm font-light leading-relaxed space-y-3">
        {formattedContent}
      </div>
    </div>
  );
};

export default FlashcardSummary;
