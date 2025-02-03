import React from "react";
import ReactMarkdown from "react-markdown";

interface FlashcardNotesProps {
  notesContent: string;
}

const FlashcardNotes: React.FC<FlashcardNotesProps> = ({ notesContent }) => {
  return (
    <div className="bg-[#6F41FF] p-6 rounded-xl text-white shadow-md mt-5">
      <h3 className="text-xl font-bold mb-4">Catatan</h3>
      <ReactMarkdown className="prose prose-invert text-sm font-light leading-relaxed">
        {notesContent}
      </ReactMarkdown>
    </div>
  );
};

export default FlashcardNotes;
