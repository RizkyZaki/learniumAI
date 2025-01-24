import { useState } from "react";
import RecentChapters from "../components/dashboard/RecentChapters";
import UploadSection from "../components/dashboard/uploadSection/UploadSection";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { principal } = useAuth();
  const [chapters, setChapters] = useState([
    { name: "Contoh Materi 1.pdf", size: "5.3MB" },
    { name: "Contoh Materi 2.pdf", size: "5.3MB" },
    { name: "Contoh Materi 3.pdf", size: "5.3MB" },
    { name: "Contoh Materi 4.pdf", size: "5.3MB" },
    { name: "Contoh Materi 5.pdf", size: "5.3MB" },
  ]);

  const handleRemoveChapter = (chapterName: string) => {
    setChapters((prevChapters) =>
      prevChapters.filter((chapter) => chapter.name !== chapterName)
    );
  };
  return (
    <div className="bg-primary-backgorund min-h-screen text-basic-white">
      <Navbar />
      <main className="max-w-7xl mx-auto px-7 py-8">
        <div className="mb-14 mt-32">
          {/* Header dengan gradasi warna */}
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-[#FB928E] to-[#6F41FF] bg-clip-text text-transparent relative inline-block">
            Welcome, Your Principal ID {principal}!{" "}
            <span className="text-[#FB928E]">👋</span>
            {/* Garis di bawah teks */}
            <img
              src="/assets/logo/line.png"
              alt="Underline Gradient"
              className="absolute left-0 bottom-[-10px] w-full"
            />
          </h1>
        </div>
        <UploadSection />
        <RecentChapters chapters={chapters} onRemove={handleRemoveChapter} />
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
