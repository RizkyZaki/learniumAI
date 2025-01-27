import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="bg-primary-backgorund min-h-screen text-basic-white flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-gray-lightMedium text-lg mb-8">
        Halaman yang Anda cari tidak ditemukan.
      </p>
      <Link
        to="/"
        className="bg-primary-background py-3 px-6 rounded-lg text-white hover:bg-primary-dark"
      >
        Kembali ke Home
      </Link>
    </div>
  );
};

export default NotFound;
