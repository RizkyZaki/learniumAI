import React, { useState } from "react";

interface RecentChapterProps {
  chapters: {
    name: string;
    size: string;
  }[];
  onRemove: (chapterName: string) => void;
}

const RecentChapters: React.FC<RecentChapterProps> = ({
  chapters,
  onRemove,
}) => {
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);

  const confirmRemove = (chapterName: string) => {
    setSelectedChapter(chapterName);
  };

  const handleRemove = () => {
    if (selectedChapter) {
      onRemove(selectedChapter);
      setSelectedChapter(null);
    }
  };

  return (
    <section className="mt-8 mb-20">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-4xl mb-4 font-semibold text-basic-white font-sans">
          Materi Terbaru
        </h1>
        <p className="text-gray-200 mt-2 text-sm font-medium font-sans">
          Berikut adalah daftar materi yang baru saja Anda tambahkan.
        </p>
      </div>

      {/* List of Materials */}
      <div className="bg-[#F1ECFF] p-4 rounded-lg shadow-sm">
        {chapters.length === 0 ? (
          <p className="text-gray-600 text-sm">Belum ada materi yang diunggah.</p>
        ) : (
          chapters.map((chapter, index) => (
            <div
              key={index}
              className="flex justify-between items-center mb-4 last:mb-0"
            >
              <div className="flex items-center gap-3">
                {/* Ikon PDF */}
                <img
                  src="/assets/doc-icons/Document - PDF/Filled.png"
                  alt="PDF Icon"
                  className="w-8 h-8"
                />
                {/* Detail Materi */}
                <div>
                  <p className="font-medium text-black font-sans">
                    {chapter.name}
                  </p>
                  <p className="text-gray-600 text-sm font-sans">
                    {chapter.size}
                  </p>
                </div>
              </div>
              {/* Tombol Hapus */}
              <button
                onClick={() => confirmRemove(chapter.name)}
                className="text-gray-500 hover:text-red-500"
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>

      {/* Konfirmasi Hapus Materi */}
      {selectedChapter && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-[#0C0B27] text-white p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h2 className="text-lg md:text-xl font-bold text-center">Konfirmasi Hapus</h2>
            <p className="mt-2 text-gray-300 text-sm md:text-base text-center">
              Apakah Anda yakin ingin menghapus materi ini?
            </p>
            <div className="mt-4 flex justify-center space-x-4">
              <button
                onClick={() => setSelectedChapter(null)}
                className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-sm md:text-base"
              >
                Batal
              </button>
              <button
                onClick={handleRemove}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 text-sm md:text-base"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default RecentChapters;
