import React from "react";

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
  return (
    <section className="mt-8 mb-20">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-4xl mb-4 font-semibold text-basic-white font-sans">
          Chapter Terkini
        </h1>
        <p className="text-gray-200 mt-2 text-sm font-medium font-sans">
          Yang baru saja Anda tambahkan
        </p>
      </div>

      {/* List of Chapters */}
      <div className="bg-[#F1ECFF] p-4 rounded-lg shadow-sm">
        {chapters.map((chapter, index) => (
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
              {/* Detail Chapter */}
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
              onClick={() => onRemove(chapter.name)}
              className="text-gray-500 hover:text-red-500"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentChapters;
