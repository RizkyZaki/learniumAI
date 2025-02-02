import React, { useState, useEffect } from "react";
import FlashcardSummary from "./FlashcardSummary";
import FlashcardQuiz from "./FlashcardQuiz";
import ProgressCard from "./ProgressCard";
import ReactMarkdown from "react-markdown";

interface FlashcardProps {
  type: "summary" | "quiz";
  question?: string;
  options?: string[];
  correctAnswer?: string;
  summaryTitle?: string;
  summaryContent?: string;
}

const Flashcard: React.FC<FlashcardProps> = (props) => {
  const [flashcardData, setFlashcardData] = useState<string | null>(null);

  useEffect(() => {
    // Ambil data dari localStorage
    const storedData = localStorage.getItem("summaryData");

    if (storedData) {
      const parsedData = JSON.parse(storedData);

      if (props.type === "summary") {
        setFlashcardData(parsedData.flashcards);
      } else if (props.type === "quiz") {
        setFlashcardData(parsedData.quiz);
      }
    }
  }, [props.type]);

  return (
    <div className="w-full">
      <div className="bg-[#2C2638] p-6 md:p-8 lg:p-10 rounded-2xl shadow-lg text-white">
        {/* Header Flashcards */}
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Flashcards
        </h2>

        {/* Flashcard Header */}
        <div className="relative bg-gradient-to-r from-[#D2C4FF] to-[#6F41FF] p-4 md:p-6 rounded-xl shadow-md flex items-center justify-between">
          <span className="text-primary-dark font-semibold text-sm md:text-lg">
            {props.type === "summary" ? "Ringkasan Materi" : "Kuis"}
          </span>
        </div>

        {/* Tombol Kembali */}
        <button className="mt-4 flex items-center bg-[#4b455b] text-gray-300 text-xs md:text-sm font-medium hover:bg-opacity-90 hover:text-white py-2 px-4 md:px-5 rounded-lg">
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
          Kembali ke ringkasan
        </button>

        {/* Header "Ringkasan" atau "Kuis" */}
        <h2 className="text-xl md:text-2xl font-semibold text-white mt-6 mb-4">
          {props.type === "summary" ? "Ringkasan" : "Kuis"}
        </h2>

        {/* Flashcard Content */}
        <div className="mt-6">
          {flashcardData ? (
            <ReactMarkdown className="prose prose-invert">
              {flashcardData}
            </ReactMarkdown>
          ) : (
            <p className="text-gray-300">Data flashcard tidak tersedia.</p>
          )}
        </div>

        {/* Progress di bagian bawah */}
        <div className="mt-6 md:mt-8">
          <ProgressCard
            title="Bagian 1"
            totalCards={5}
            totalQuestions={10}
            progress={50}
          />
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
