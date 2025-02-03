import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Flashcard from "../components/summaryQuiz/flashcard/Flashcard";
import { useNavigate } from "react-router-dom";

const SummaryQuiz: React.FC = () => {
  const navigate = useNavigate();
  const [summaryData, setSummaryData] = useState<{
    notes: Record<string, string>;
    flashcard: Record<string, string>;
    quiz: Record<
      string,
      { question: string; options: string[]; correctAnswer: string }[]
    >;
  } | null>(null);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [viewType, setViewType] = useState<"summary" | "notes">("summary");

  useEffect(() => {
    const storedData = localStorage.getItem("summaryData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);

      const processedQuiz = processQuizMarkdown(parsedData.quiz);
      const processedFlashcards = processMarkdown(parsedData.flashcards);
      const processedNotes = processMarkdown(parsedData.notes);

      setSummaryData({
        notes: processedNotes,
        flashcard: processedFlashcards,
        quiz: processedQuiz,
      });

      // Pastikan memilih section pertama yang tersedia
      const firstSection =
        Object.keys(processedFlashcards)[0] || Object.keys(processedNotes)[0];
      if (firstSection) {
        console.log("Setting default selectedSection:", firstSection);
        setSelectedSection(firstSection);
      }
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

  // Fungsi untuk switch viewType dengan memastikan selectedSection valid
  const handleSwitchViewType = () => {
    setViewType((prev) => {
      const newViewType = prev === "summary" ? "notes" : "summary";

      if (summaryData) {
        let validSection = selectedSection;

        if (newViewType === "notes") {
          if (!summaryData.notes[selectedSection!]) {
            validSection = Object.keys(summaryData.notes)[0] || null;
          }
        } else {
          if (!summaryData.flashcard[selectedSection!]) {
            validSection = Object.keys(summaryData.flashcard)[0] || null;
          }
        }

        console.log(
          `📌 Switching to ${newViewType} with section:`,
          validSection
        );
        console.log(`📌 Notes Data:`, summaryData.notes[validSection!]);

        setSelectedSection(validSection);
      }

      return newViewType;
    });
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 md:p-6 pt-24 pb-24 space-y-6 md:mt-40 md:mb-40">
        <button
          className="bg-gradient-to-r from-[#FB928E] to-[#6F41FF] text-white px-6 py-3 rounded-full shadow-md hover:opacity-90"
          onClick={() => navigate("/dashboard")}
        >
          Back
        </button>
        {summaryData ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="col-span-1">
              <h2 className="text-2xl md:text-3xl font-bold text-primary-light mb-3">
                Section
              </h2>
              <div className="bg-[#2C2638] p-6 rounded-xl shadow-lg text-white">
                <h3 className="text-lg font-semibold mb-3">Pilih Section:</h3>
                <div className="space-y-2">
                  {Object.keys(
                    viewType === "summary"
                      ? summaryData.flashcard
                      : summaryData.notes
                  ).map((section) => (
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
                  notesContent={
                    viewType === "notes"
                      ? summaryData.notes[selectedSection] || ""
                      : ""
                  }
                  onSwitch={handleSwitchViewType}
                />
              ) : (
                <p className="text-gray-400 text-center">
                  Pilih section untuk melihat{" "}
                  {viewType === "summary" ? "ringkasan" : "notes"}.
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
