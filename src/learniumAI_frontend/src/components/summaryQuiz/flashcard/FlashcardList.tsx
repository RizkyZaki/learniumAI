import React from "react";
import Flashcard from "./Flashcard";
import ProgressCard from "./ProgressCard";

const FlashcardList: React.FC = () => {
  const question = "Pengertian Waterfall Model?";
  const handleBackClick = () => {
    console.log("Back to summary clicked");
  };

  const summaryTitle = "Apa itu model Waterfall dalam pengembangan perangkat lunak?";
  const summaryContent =
    "Waterfall Model adalah model pengembangan perangkat lunak yang bersifat linear dan berurutan. Tahapan-tahapannya meliputi analisis kebutuhan, perancangan sistem, implementasi, integrasi dan pengujian, penerapan, serta pemeliharaan. Setiap tahap harus diselesaikan sepenuhnya sebelum melanjutkan ke tahap berikutnya.";

  return (
    <div className="bg-[#2C2638] p-6 rounded-2xl shadow-lg">
      <Flashcard
        question={question}
        onBackClick={handleBackClick}
        summaryTitle={summaryTitle}
        summaryContent={summaryContent}
      />
      <ProgressCard
        title="Bagian 1"
        totalCards={5}
        totalQuestions={10}
        progress={50} // Misalnya, progress 50%
      />
    </div>
  );
};

export default FlashcardList;
