import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, login, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleAuthAction = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      login();
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#0C0B27]/80 backdrop-blur-md shadow-lg"
            : "bg-[#0C0B27]"
        }`}
      >
        <div className="container mx-auto flex justify-between items-center py-4 px-6 md:px-10">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img
              src="/assets/logo/logo.png"
              alt="Learnium Logo"
              className="w-24 md:w-32"
            />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white text-2xl"
            >
              {isMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>

          {/* Navigation Links */}
          <ul
            className={`md:flex text-white md:static md:flex-row md:space-x-8 ${
              isMenuOpen
                ? "absolute top-full left-0 right-0 bg-[#0C0B27] flex flex-col items-center space-y-6 py-6 md:flex"
                : "hidden md:flex"
            }`}
          >
            <li className="hover:text-gray-400 text-lg">
              <a href="#home" onClick={() => setIsMenuOpen(false)}>
                Home
              </a>
            </li>
            <li className="hover:text-gray-400 text-lg">
              <a href="#how-it-works" onClick={() => setIsMenuOpen(false)}>
                How This Works
              </a>
            </li>
            <li className="hover:text-gray-400 text-lg">
              <a href="#benefits" onClick={() => setIsMenuOpen(false)}>
                Benefits
              </a>
            </li>
            {/* Auth Button inside Mobile Menu */}
            <li className="md:hidden">
              <button
                className="bg-gradient-to-r from-[#FB928E] to-[#6F41FF] text-white px-6 py-3 rounded-full shadow-md hover:opacity-90"
                onClick={handleAuthAction}
              >
                {isAuthenticated ? "GO" : "Login"}
              </button>
            </li>
          </ul>

          {/* Auth Button for Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={handleAuthAction}
              className="bg-gradient-to-r from-[#FB928E] to-[#6F41FF] text-white px-6 py-3 rounded-full shadow-md hover:opacity-90"
            >
              {isAuthenticated ? "GO" : "Login"}
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
