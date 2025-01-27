import { useState } from "react";
import RecentChapters from "../components/dashboard/RecentChapters";
import UploadSection from "../components/dashboard/uploadSection/UploadSection";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import DashboardHeader from "../components/dashboard/DashboardHeader";
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
    <div className="bg-primary-background min-h-screen text-basic-white">
      <Navbar />
      <main className="max-w-7xl mx-auto px-7 py-8">
        <DashboardHeader principal={principal ?? undefined} />
        <UploadSection />
        <RecentChapters chapters={chapters} onRemove={handleRemoveChapter} />
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
