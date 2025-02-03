import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Flashcard from "../components/summaryQuiz/flashcard/Flashcard";

const SummaryQuiz: React.FC = () => {
  const [summaryData, setSummaryData] = useState<{
    notes: string;
    flashcard: Record<string, string>;
    quiz: Record<
      string,
      { question: string; options: string[]; correctAnswer: string }[]
    >;
  } | null>(null);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [viewType, setViewType] = useState<"summary" | "quiz">("summary");

  useEffect(() => {
    const storedData = localStorage.getItem("summaryData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);

      const processedQuiz = processQuizMarkdown(parsedData.quiz);
      const processedFlashcards = processMarkdown(parsedData.flashcards);

      setSummaryData({
        notes: parsedData.notes,
        flashcard: processedFlashcards,
        quiz: processedQuiz,
      });
    }
  }, []);

  const processMarkdown = (data: string) => {
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

  const processQuizMarkdown = (data: string) => {
    const quizSections: Record<
      string,
      { question: string; options: string[]; correctAnswer: string }[]
    > = {};

    let currentSection = "";
    let currentQuestion = "";
    let options: string[] = [];
    let correctAnswer = "";

    data.split("\n").forEach((line) => {
      if (line.startsWith("### ")) {
        if (currentSection && currentQuestion) {
          quizSections[currentSection].push({
            question: currentQuestion,
            options,
            correctAnswer,
          });
        }
        currentSection = line.replace("### ", "").trim();
        quizSections[currentSection] = [];
        currentQuestion = "";
        options = [];
        correctAnswer = "";
      } else if (line.startsWith("- Q: ")) {
        if (currentQuestion) {
          quizSections[currentSection].push({
            question: currentQuestion,
            options,
            correctAnswer,
          });
        }
        currentQuestion = line.replace("- Q: ", "").trim();
        options = [];
        correctAnswer = "";
      } else if (line.match(/- [A-D]: /)) {
        const answerText = line.replace(/- [A-D]: /, "").trim();
        const isCorrect = line.includes("(correct)");
        const cleanedOption = answerText.replace("(correct)", "").trim();
        options.push(cleanedOption);
        if (isCorrect) correctAnswer = cleanedOption;
      }
    });

    if (currentSection && currentQuestion) {
      quizSections[currentSection].push({
        question: currentQuestion,
        options,
        correctAnswer,
      });
    }

    return quizSections;
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 md:p-6 pt-24 pb-24 space-y-6 md:mt-40 md:mb-40">
        {summaryData ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="col-span-1">
              <h2 className="text-2xl md:text-3xl font-bold text-primary-light mb-3">
                Ringkasan / Kuis
              </h2>
              <div className="bg-[#2C2638] p-6 rounded-xl shadow-lg text-white">
                <h3 className="text-lg font-semibold mb-3">Pilih Section:</h3>
                <div className="space-y-2">
                  {Object.keys(summaryData.flashcard).map((section) => (
                    <button
                      key={section}
                      onClick={() => setSelectedSection(section)}
                      className={`w-full text-left py-3 px-4 rounded-lg text-sm font-medium transition ${
                        selectedSection === section
                          ? "bg-[#6F41FF] text-white"
                          : "bg-[#3E2C5D] text-gray-300 hover:bg-[#6F41FF] hover:text-white"
                      }`}
                    >
                      {section}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-span-2">
              {selectedSection ? (
                <Flashcard
                  type={viewType}
                  summaryTitle={selectedSection}
                  summaryContent={
                    viewType === "summary"
                      ? `${summaryData.flashcard[selectedSection] || ""}`
                      : ""
                  }
                  notesContent={summaryData.notes}
                  quizData={
                    viewType === "quiz"
                      ? summaryData.quiz[selectedSection] || []
                      : []
                  }
                  onSwitch={() =>
                    setViewType(viewType === "summary" ? "quiz" : "summary")
                  }
                />
              ) : (
                <p className="text-gray-400 text-center">
                  Pilih section untuk melihat{" "}
                  {viewType === "summary" ? "ringkasan" : "kuis"}.
                </p>
              )}
            </div>
          </div>
        ) : (
          <p className="text-gray-400 text-center">
            Tidak ada data yang tersedia.
          </p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default SummaryQuiz;
