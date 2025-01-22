interface BenefitCardProps {
  icon: string;
  title: string;
  description: string;
}

export default function BenefitCard({
  icon,
  title,
  description,
}: BenefitCardProps) {
  return (
    <div
      className="relative bg-cover bg-no-repeat text-center p-8 rounded-xl"
      style={{
        backgroundImage: `url(/assets/images/card.png)`,
        width: "373px", // Dimensi lebar default
        height: "500px", // Dimensi tinggi default
      }}
    >
      {/* Tab Judul */}
      <div className="absolute left-64 top-2 transform -translate-x-1/2 px-6 py-2 text-white text-2xl font-semibold bg-transparent">
        {title}
      </div>

      {/* Ikon */}
      <img src={icon} alt={title} className="mx-auto mt-24 w-30 h-30" />

      {/* Deskripsi */}
      <p className="text-gray-300 mt-20 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}
