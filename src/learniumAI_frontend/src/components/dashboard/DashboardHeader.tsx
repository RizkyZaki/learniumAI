import React from "react";

interface DashboardHeaderProps {
  principal: string | undefined;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ principal }) => {
  // Format Principal ID agar hanya menampilkan bagian awal dan akhir
  const formatPrincipal = (id: string | undefined) => {
    if (!id) return "";
    const parts = id.split("-");
    return `${parts[0]}...${parts[parts.length - 1]}`;
  };

  return (
    <div className="mb-14 mt-32">
      {/* Header dengan gradasi warna */}
      <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-[#FB928E] to-[#6F41FF] bg-clip-text text-transparent relative inline-block">
        Welcome, Your Principal ID: {formatPrincipal(principal)}!{" "}
        <span className="text-[#FB928E]">👋</span>
        {/* Garis di bawah teks */}
        <img
          src="/assets/logo/line.png"
          alt="Underline Gradient"
          className="absolute left-0 bottom-[-10px] w-full"
        />
      </h1>
    </div>
  );
};

export default DashboardHeader;
