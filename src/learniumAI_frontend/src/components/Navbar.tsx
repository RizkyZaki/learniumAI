import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { logout } = useAuth();

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
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img
            src="/assets/logo/logo.png"
            alt="Learnium Logo"
            width={120}
            height={120}
          />
        </div>

        {/* User Info */}
        <div className="flex items-center space-x-2">
          <a onClick={logout}>
            <img
              src="/assets/logo/icon-user.png"
              alt="User Icon"
              width={32}
              height={32}
            />
          </a>
        </div>
      </div>
    </nav>
  );
}
