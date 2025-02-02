import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SummaryList from "../components/summaryQuiz/summarySection/SummaryList";
import Flashcard from "../components/summaryQuiz/flashcard/Flashcard";

const SummaryQuiz: React.FC = () => {
  const [flashcardType, setFlashcardType] = useState<"summary" | "quiz">(
    "summary"
  );

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6 pt-24 pb-24 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <div className="col-span-1">
            <h2 className="text-3xl font-bold text-primary-light mb-3">
              Bagian Materi Anda
            </h2>
            <p className="text-gray-400 text-sm pb-10">
              Materi telah dipecah menjadi bagian-bagian yang mudah dipahami,
              siap untuk dipelajari
            </p>
            <SummaryList />
          </div>
          <div className="col-span-2">
            {flashcardType === "summary" ? (
              <Flashcard
                type="summary"
                summaryTitle="Apa itu model Waterfall dalam pengembangan perangkat lunak?"
                summaryContent="Waterfall Model adalah model pengembangan perangkat lunak yang bersifat linear dan berurutan..."
              />
            ) : (
              <Flashcard
                type="quiz"
                question="Apa itu model Waterfall dalam pengembangan perangkat lunak?"
                options={[
                  "Metode pengembangan perangkat lunak berbasis Agile yang memprioritaskan iterasi cepat dan umpan balik terus-menerus.",
                  "Model pengembangan perangkat lunak linier yang terdiri dari serangkaian tahapan berurutan yang harus diselesaikan sebelum melanjutkan ke tahap berikutnya.",
                  "Model pengembangan perangkat lunak yang tidak memerlukan dokumentasi dan fokus pada pengujian.",
                  "Model pengembangan perangkat lunak yang bersifat iteratif dan fleksibel, memungkinkan perubahan selama proses pengembangan.",
                ]}
                correctAnswer="Model pengembangan perangkat lunak linier yang terdiri dari serangkaian tahapan berurutan yang harus diselesaikan sebelum melanjutkan ke tahap berikutnya."
              />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SummaryQuiz;
