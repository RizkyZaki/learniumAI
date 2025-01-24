import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, login, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0C0B27]/80 backdrop-blur-md shadow-lg"
          : "bg-[#0C0B27]"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center py-6 px-36">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <a href="#home">
            <img
              src="/assets/logo/logo.png"
              alt="Learnium Logo"
              width={120}
              height={120}
              className="logo-image"
            />
          </a>
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-8 text-white">
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

        {/* Sign In and Sign Up Buttons */}
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <div>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-full shadow-md hover:opacity-90"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              className="bg-gradient-to-r from-[#FB928E] to-[#6F41FF] text-white px-4 py-2 rounded-full shadow-md hover:opacity-90"
              onClick={login}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
