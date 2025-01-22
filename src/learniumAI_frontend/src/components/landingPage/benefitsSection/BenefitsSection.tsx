import BenefitCard from "./BenefitsCard";

export default function BenefitsSection() {
  return (
    <section
      id="benefits"
      className="py-20 text-center text-white bg-[#0C0B27]"
    >
      {/* Section Title */}
      <div className="mb-12">
        {/* Benefits Icon and Label */}
        <div className="inline-flex items-center space-x-2 px-4 py-2 border-2 rounded-xl text-sm font-semibold bg-transparent border-gradient-to-r from-pink-500 to-purple-500 text-white">
          <img
            src="/assets/logo/benefits.png"
            alt="Benefits Icon"
            width={20}
            height={20}
          />
          <span>Benefits</span>
        </div>

        <h2 className="text-3xl md:text-4xl mt-10 font-bold ">
          Mengapa{" "}
          <span className="bg-gradient-to-r from-[#FB928E] to-[#6F41FF] bg-clip-text text-transparent">
            Learnium
          </span>{" "}
          Tepat untuk Anda?
        </h2>
      </div>

      {/* Benefits List */}
      <div className="flex flex-wrap justify-center gap-8 md:gap-12">
        <BenefitCard
          icon="/assets/images/terstruktur.png"
          title="Terstruktur"
          description="Dengan auto-segmentasi, materi Anda akan dipecah menjadi bagian-bagian yang memudahkan arah proses belajar."
        />
        <BenefitCard
          icon="/assets/images/otomatis.png"
          title="Otomatis"
          description="Learnium secara otomatis menghasilkan kuis dari materi yang diunggah, membantu Anda mengukur pemahaman dengan cepat dan tepat."
        />
        <BenefitCard
          icon="/assets/images/fleksibel.png"
          title="Fleksibel"
          description="Belajar kapan saja dan di mana saja sesuai dengan kebutuhan memberi kebebasan penuh untuk menyesuaikan dengan aktivitas harian Anda."
        />
      </div>
    </section>
  );
}
