import React from "react";
import { useLocation } from "react-router-dom";
import ProgressCard from "./ProgressCard";

const FlashcardList: React.FC = () => {
  const location = useLocation();
  const flashcards = location.state?.flashcards || [];

  return (
    <div className="bg-[#2C2638] p-6 rounded-2xl shadow-lg">
      {flashcards.length > 0 && (
        <div className="text-white mt-4">
          <h2 className="text-xl font-semibold">FlashCard Materi</h2>
          <p className="mt-2 text-gray-300">
            {flashcards.map((flashcard: any, index: number) => (
              <span key={index}>{flashcard.summaryContent}</span>
            ))}
          </p>
        </div>
      )}

      <ProgressCard
        title="Bagian 1"
        totalCards={5}
        totalQuestions={10}
        progress={10} // Misalnya, progress 10%
      />
    </div>
  );
};

export default FlashcardList;
