import React from "react";

const SummaryList: React.FC = () => {
  const summaries = [
    { id: 1, title: "Ringkasan Bagian 1", cards: 5, questions: 10 },
    { id: 2, title: "Ringkasan Bagian 2", cards: 5, questions: 10 },
    { id: 3, title: "Ringkasan Bagian 3", cards: 5, questions: 10 },
  ];

  return (
    <div className="space-y-4 px-4 md:px-0">
      {summaries.map((summary) => (
        <div
          key={summary.id}
          className="w-full max-w-[477px] bg-primary-dark bg-opacity-10 border p-6 rounded-3xl shadow-lg flex flex-col justify-between"
        >
          <div>
            <h3 className="text-xl font-bold text-white mb-2">
              {summary.title}
            </h3>
            <p className="text-sm text-gray-200 mb-2">
              <span className="font-semibold">Waterfall Model:</span> Lorem
              ipsum
            </p>
            <p className="text-sm text-gray-200">
              <span className="font-semibold">5 Kartu:</span> 10 pertanyaan
            </p>
          </div>
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0 mt-4">
            <button className="bg-gradient-to-r from-[#FB928E] to-[#6F41FF] text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-md hover:opacity-90 transition w-full sm:w-auto">
              Lihat ringkasan
            </button>
            <button className="bg-transparent border border-purple-500 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-purple-500 hover:text-white hover:opacity-90 transition w-full sm:w-auto">
              Kerjakan kuis
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryList;
