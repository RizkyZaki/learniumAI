export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative text-center py-20 mt-32 bg-[#0C0B27] overflow-hidden"
    >
      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight my-5">
          Ringkas, Pahami, Kuasai
        </h1>
        <p className="mt-4 text-base md:text-lg text-gray-300 max-w-1xl mx-auto px-16 whitespace-pre-line">
          Transformasi cara belajar dengan ringkasan otomatis dan kuis yang
          {"\n"}
          membantu Anda menguasai pemahaman.
        </p>
        <button className="mt-6 bg-gradient-to-r from-[#FB928E] to-[#6F41FF] text-white px-6 py-3 rounded-2xl shadow-lg hover:opacity-90 text-base md:text-lg flex items-center justify-center ml-auto mr-auto">
          Get Started
          <img
            src="/assets/logo/arrow.png"
            alt="Arrow"
            className="w-4 h-4 ml-2 md:w-5 md:h-5"
          />
        </button>
      </div>
      {/* Illustration */}
      <div className="relative mt-8 flex justify-center -z-0">
        <img
          src="/assets/images/background.png"
          alt="Hero Background"
          className="absolute -top-[150px] w-100 object-cover z-0"
        />
        <img
          src="/assets/images/ilustration.png"
          alt="Hero Illustration"
          className="relative w-72 md:w-96 lg:w-[500px] xl:w-[600px] z-10"
        />
      </div>
    </section>
  );
}
