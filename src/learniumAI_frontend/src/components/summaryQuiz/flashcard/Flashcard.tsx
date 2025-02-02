import React from "react";
import FlashcardSummary from "./FlashcardSummary";
import FlashcardQuiz from "./FlashcardQuiz";
import ProgressCard from "./ProgressCard";

interface FlashcardProps {
  type: "summary" | "quiz";
  question?: string;
  options?: string[];
  correctAnswer?: string;
  summaryTitle?: string;
  summaryContent?: string;
}

const Flashcard: React.FC<FlashcardProps> = (props) => {
  return (
    <div className="w-full">
      <div className="bg-[#2C2638] p-6 md:p-8 lg:p-10 rounded-2xl shadow-lg text-white">
        {/* Header Flashcards */}
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Flashcards
        </h2>

        {/* Flashcard Header */}
        <div className="relative bg-gradient-to-r from-[#D2C4FF] to-[#6F41FF] p-4 md:p-6 rounded-xl shadow-md flex items-center justify-between">
          <span className="text-[#1E1A29] font-semibold text-sm md:text-lg">
            Pengertian Waterfall Model?
          </span>
          <div className="w-10 h-10 md:w-14 md:h-14 bg-[url('/path-to-stars-icon.svg')] bg-cover opacity-40"></div>
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
          {props.type === "summary" &&
          props.summaryTitle &&
          props.summaryContent ? (
            <FlashcardSummary
              summaryTitle={props.summaryTitle}
              summaryContent={props.summaryContent}
            />
          ) : props.type === "quiz" &&
            props.question &&
            props.options &&
            props.correctAnswer ? (
            <FlashcardQuiz
              question={props.question}
              options={props.options}
              correctAnswer={props.correctAnswer}
              onSelectAnswer={(isCorrect) =>
                console.log(isCorrect ? "Benar!" : "Salah!")
              }
            />
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
