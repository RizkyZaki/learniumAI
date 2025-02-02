import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
        isScrolled ? "bg-[#0C0B27]/80 backdrop-blur-md shadow-lg" : "bg-[#0C0B27]"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center py-6 px-6 lg:px-20">
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

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white text-2xl">
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Navigation Links */}
        <ul
          className={`lg:flex text-white lg:static lg:flex-row lg:space-x-8 ${
            isMenuOpen ? "absolute top-full left-0 right-0 bg-[#0C0B27] flex flex-col items-center space-y-6 py-6 lg:flex" : "hidden lg:flex"
          }`}
        >
          <li className="hover:text-gray-400 text-lg">
            <a href="#home" onClick={() => setIsMenuOpen(false)}>Home</a>
          </li>
          <li className="hover:text-gray-400 text-lg">
            <a href="#how-it-works" onClick={() => setIsMenuOpen(false)}>How This Works</a>
          </li>
          <li className="hover:text-gray-400 text-lg">
            <a href="#benefits" onClick={() => setIsMenuOpen(false)}>Benefits</a>
          </li>
          {/* Sign In and Sign Up Buttons inside Mobile Menu */}
          <li className="lg:hidden">
            {isAuthenticated ? (
              <button
                className="bg-red-500 text-white px-6 py-3 rounded-full shadow-md hover:opacity-90"
                onClick={() => { logout(); setIsMenuOpen(false); }}
              >
                Logout
              </button>
            ) : (
              <button
                className="bg-gradient-to-r from-[#FB928E] to-[#6F41FF] text-white px-6 py-3 rounded-full shadow-md hover:opacity-90"
                onClick={() => { login(); setIsMenuOpen(false); }}
              >
                Login
              </button>
            )}
          </li>
        </ul>

        {/* Sign In and Sign Up Buttons for Desktop */}
        <div className="hidden lg:flex items-center space-x-4">
          {isAuthenticated ? (
            <button
              className="bg-red-500 text-white px-6 py-3 rounded-full shadow-md hover:opacity-90"
              onClick={logout}
            >
              Logout
            </button>
          ) : (
            <button
              className="bg-gradient-to-r from-[#FB928E] to-[#6F41FF] text-white px-6 py-3 rounded-full shadow-md hover:opacity-90"
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
