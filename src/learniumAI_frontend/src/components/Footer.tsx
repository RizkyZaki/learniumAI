import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="py-8 text-white bg-[#0C0B27]">
      
      {/* Container Utama */}
      <div className="container mx-auto px-6">
        {/* Logo dan Navigation */}
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-700 pb-4">
          {/* Logo */}
          <div className="mb-4 md:mb-0 flex justify-center md:justify-start">
            <Link to="/">
              <img
                src="/assets/logo/logo.png"
                alt="Learnium Logo"
                className="w-32"
              />
            </Link>
          </div>

          {/* Navigation Links (Hanya tampil di tablet dan desktop) */}
          <ul className="hidden md:flex flex-wrap justify-center space-x-6 md:space-x-8">
            <li className="hover:text-gray-400">
              <a href="#home">Home</a>
            </li>
            <li className="hover:text-gray-400">
              <a href="#how-it-works">How This Works</a>
            </li>
            <li className="hover:text-gray-400">
              <a href="#benefits">Benefits</a>
            </li>
          </ul>
        </div>

        {/* Copyright */}
        <p className="text-gray-400 text-center mt-4">
          &copy; {currentYear}, Learnium. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
