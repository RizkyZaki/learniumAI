import React, { useState, useEffect } from "react";
import FlashcardSummary from "./FlashcardSummary";
import FlashcardQuiz from "./FlashcardQuiz";
import ProgressCard from "./ProgressCard";
import ReactMarkdown from "react-markdown";
import FlashcardNotes from "./FlashcardNotes";

interface FlashcardProps {
  type: "summary" | "notes";
  summaryTitle: string;
  summaryContent: string;
  notesContent: string;
  // quizData: { question: string; options: string[]; correctAnswer: string }[];
  onSwitch: () => void;
}

const Flashcard: React.FC<FlashcardProps> = ({
  type,
  summaryTitle,
  summaryContent,
  notesContent,
  onSwitch,
}) => {
  useEffect(() => {
    console.log("📌 Flashcard Component Props Updated:", {
      type,
      summaryTitle,
      summaryContent,
      notesContent,
    });
  }, [type, summaryTitle, summaryContent, notesContent]);

  const [currentType, setCurrentType] = useState<"summary" | "notes">(type);
  const [quizData, setQuizData] = useState<Record<string, string>>({});
  // console.log("📌 Data Quiz yang diterima di Flashcard.tsx:", quizData); // 🔍 Debugging

  useEffect(() => {
    // Ambil data kuis dari localStorage
    const storedData = localStorage.getItem("summaryData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const processedQuiz = processMarkdown(parsedData.quiz);
      setQuizData(processedQuiz);
    }
  }, []);

  // Fungsi untuk memproses Markdown menjadi format per section untuk quiz
  const processMarkdown = (data: string): Record<string, string> => {
    const sections: Record<string, string> = {};
    let currentSection = "";

    data.split("\n").forEach((line) => {
      if (line.startsWith("### ")) {
        currentSection = line.replace("### ", "").trim();
        sections[currentSection] = "";
      } else if (currentSection) {
        sections[currentSection] += line + "\n";
      }
    });

    return sections;
  };

  return (
    <div className="w-full">
      <div className="bg-[#2C2638] p-6 md:p-8 lg:p-10 rounded-2xl shadow-lg text-white">
        {/* Header Flashcards */}
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          {type === "summary" ? "Flashcards" : "Notes"}
        </h2>

        {/* Flashcard Header */}
        <div className="relative bg-gradient-to-r from-[#D2C4FF] to-[#6F41FF] p-4 md:p-6 rounded-xl shadow-md flex items-center justify-between">
          <span className="text-primary-dark font-semibold text-sm md:text-lg">
            {summaryTitle}
          </span>
        </div>

        {/* Tombol Switch Ringkasan <-> Notes */}
        <button
          onClick={onSwitch}
          className="mt-4 flex items-center justify-center bg-[#6F41FF] text-white text-xs md:text-sm font-medium hover:bg-opacity-90 py-2 px-6 md:px-8 rounded-lg transition"
        >
          {type === "summary" ? "Lihat Notes" : "Lihat Flashcards"}
        </button>

        {/* Flashcard Content */}
        <div className="mt-6">
          {type === "summary" ? (
            <>
              <FlashcardSummary summaryContent={summaryContent} />
            </>
          ) : (
            <FlashcardNotes notesContent={notesContent} />
          )}
        </div>

        {/* Progress di bagian bawah */}
        {/* <div className="mt-6 md:mt-8">
          <ProgressCard
            title="Progres Belajar"
            totalCards={5}
            totalQuestions={10}
            progress={50}
          />
        </div> */}
      </div>
    </div>
  );
};

export default Flashcard;
