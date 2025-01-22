export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0C0B27] shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
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
          <a href="#signin" className="text-white hover:text-gray-400">
            Sign in
          </a>
          <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full shadow-md hover:opacity-90">
            Sign up
          </button>
        </div>
      </div>
    </nav>
  );
}
