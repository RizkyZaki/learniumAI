import React from "react";

interface FlashcardProps {
  question: string;
  onBackClick: () => void;
  summaryTitle: string;
  summaryContent: string;
}

const Flashcard: React.FC<FlashcardProps> = ({
  question,
  onBackClick,
  summaryTitle,
  summaryContent,
}) => {
  return (
    <>
      <h2 className="text-2xl font-bold text-white mb-6">Flashcards</h2>
      <div className="bg-gradient-to-r from-[#F1ECFF] to-[#6F41FF] p-4 rounded-xl text-primary-dark text-lg font-medium shadow-md mb-6">
        {question}
      </div>
      <button
        onClick={onBackClick}
        className="flex items-center bg-[#423759] text-gray-300 text-sm font-medium hover:bg-opacity-90 hover:text-white py-2 px-4 rounded-lg mb-6"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Kembali ke kuis
      </button>
      <div className="bg-[#6F41FF] p-6 rounded-xl text-white shadow-md">
        <h3 className="text-xl font-bold mb-4">{summaryTitle}</h3>
        <p className="text-sm font-light leading-relaxed">{summaryContent}</p>
      </div>
    </>
  );
};

export default Flashcard;
