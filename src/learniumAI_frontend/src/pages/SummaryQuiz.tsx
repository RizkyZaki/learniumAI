import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SummaryList from "../components/summaryQuiz/summarySection/SummaryList";

const SummaryQuiz: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6 pt-24 pb-24 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SummaryQuiz;
