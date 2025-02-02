import { useState, useEffect } from "react";
import RecentChapters from "../components/dashboard/RecentChapters";
import UploadSection from "../components/dashboard/uploadSection/UploadSection";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { principal } = useAuth();
  const [chapters, setChapters] = useState<
    { name: string; size: string; data: string }[]
  >([]);

  useEffect(() => {
    const storedChapters = localStorage.getItem("recentChapters");
    if (storedChapters) {
      setChapters(JSON.parse(storedChapters));
    }
  }, []);

  const handleRemoveChapter = (chapterName: string) => {
    const updatedChapters = chapters.filter(
      (chapter) => chapter.name !== chapterName
    );
    setChapters(updatedChapters);
    localStorage.setItem("recentChapters", JSON.stringify(updatedChapters));
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
