import React, { useState } from "react";

interface FlashcardQuizProps {
  question: string;
  options: string[];
  correctAnswer: string;
  onSelectAnswer: (isCorrect: boolean) => void;
}

// Di dalam FlashcardQuiz
const FlashcardQuiz: React.FC<FlashcardQuizProps> = ({
  question,
  options,
  correctAnswer,
  onSelectAnswer,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const handleAnswerClick = (answer: string) => {
    setSelectedAnswer(answer);
    onSelectAnswer(answer === correctAnswer);
  };

  return (
    <div className="bg-gradient-to-r from-[#6F41FF]/80 to-[#432799] p-6 rounded-2xl shadow-lg text-white">
      {/* Question Box */}
      <div className="bg-gradient-to-r from-[#6F41FF] to-[#432799] p-6 rounded-xl text-lg font-semibold shadow-lg mb-6">
        {question}
      </div>

      {/* Answer Options */}
      <div className="space-y-3">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerClick(option)}
            className={`w-full text-left py-4 px-5 rounded-xl text-sm font-medium transition-all duration-300 border
              ${
                selectedAnswer === option
                  ? option === correctAnswer
                    ? "bg-green-600 text-white border-[#A782FF]" // Warna untuk jawaban benar
                    : "bg-[#5E3B76] text-white border-[#C54B8C]" // Warna untuk jawaban salah
                  : "bg-[#6F41FF] bg-opacity-0 text-gray-300 border-[#6F41FF] hover:bg-[#6F41FF] hover:text-white"
              }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FlashcardQuiz;
