import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SummaryList from "../components/summaryQuiz/summarySection/SummaryList";
import Flashcard from "../components/summaryQuiz/flashcard/Flashcard";
import ReactMarkdown from "react-markdown";
import axios from "axios";

const SummaryQuiz: React.FC = () => {
  const [summaryData, setSummaryData] = useState<{
    notes: string;
    flashcards: string;
    quiz: string;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Cek apakah data sudah ada di localStorage
        const cachedData = localStorage.getItem("summaryData");
        if (cachedData) {
          console.log("📌 Menggunakan data dari localStorage");
          setSummaryData(JSON.parse(cachedData));
          setLoading(false);
          return;
        }

        console.log("📤 Mengambil data dari API...");
        const response = await axios.get(
          "https://frisjjj.pythonanywhere.com/analyze"
        );

        if (response.status === 200) {
          console.log("✅ Data dari API:", response.data);
          localStorage.setItem("summaryData", JSON.stringify(response.data));
          setSummaryData(response.data);
        } else {
          throw new Error("Gagal mengambil data dari API.");
        }
      } catch (error) {
        console.error("❌ Error Fetch Data:", error);
        setError("Terjadi kesalahan dalam mengambil data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 md:p-6 pt-24 pb-24 space-y-6">
        {loading ? (
          <p className="text-center text-white">🔄 Memuat data...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : summaryData ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {/* Sidebar - Ringkasan Materi */}
            <div className="col-span-1">
              <h2 className="text-2xl md:text-3xl font-bold text-primary-light mb-3">
                Ringkasan
              </h2>
              <div className="bg-[#2C2638] p-6 rounded-xl shadow-lg text-white">
                <ReactMarkdown className="prose prose-invert">
                  {summaryData.notes}
                </ReactMarkdown>
              </div>
            </div>

            {/* Flashcard */}
            <div className="col-span-1 md:col-span-2">
              <Flashcard
                type="summary"
                summaryTitle="Flashcards"
                summaryContent={summaryData.flashcards}
              />
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
