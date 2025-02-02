import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
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

  const handleLogout = () => {
    logout();
    setIsLogoutDialogOpen(false);
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

          {/* Logout Button */}
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setIsLogoutDialogOpen(true)} 
              className="bg-red-500 text-white px-4 py-2 rounded-full shadow-md hover:opacity-90 text-sm md:text-base"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Custom Logout Confirmation Dialog */}
      {isLogoutDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 p-4">
          <div className="bg-[#0C0B27] text-white p-8 rounded-lg shadow-lg w-full max-w-md md:max-w-lg">
            <h2 className="text-lg md:text-xl font-bold text-center">Confirm Logout</h2>
            <p className="mt-2 text-gray-300 text-sm md:text-base text-center">
              Are you sure you want to log out?
            </p>
            <div className="mt-6 flex justify-center space-x-4">
              <button 
                onClick={() => setIsLogoutDialogOpen(false)} 
                className="px-5 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-sm md:text-base"
              >
                Cancel
              </button>
              <button 
                onClick={handleLogout} 
                className="px-5 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 text-sm md:text-base"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
