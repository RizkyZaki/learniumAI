import { useAuth } from "../../context/AuthContext";

export default function CallToActionSection() {
  const { login } = useAuth();

  return (
    <section className="py-20 text-center text-white bg-[#0C0B27]">
      <div className="container mx-auto px-6">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold leading-tight">
          Siap Transformasi Cara Belajar dengan{" "}
          <span className="bg-gradient-to-r from-[#FB928E] to-[#6F41FF] bg-clip-text text-transparent">
            Learnium
          </span>
          ?
        </h2>

        {/* Subheading */}
        <p className="mt-4 text-gray-300 text-base md:text-lg">
          Rasakan perubahan cara belajar yang lebih efisien dan cepat
        </p>

        {/* Button */}
        <button
          onClick={login}
          className="mt-6 bg-gradient-to-r from-[#FB928E] to-[#6F41FF] text-white px-6 py-3 rounded-2xl shadow-lg hover:opacity-90 text-base md:text-lg flex items-center justify-center ml-auto mr-auto"
        >
          Get Started
          <img
            src="/assets/logo/arrow.png"
            alt="Arrow"
            className="w-4 h-4 ml-2 md:w-5 md:h-5"
          />
        </button>
      </div>
    </section>
  );
}
