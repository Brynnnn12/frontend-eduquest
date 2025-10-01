import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaBook,
  FaUser,
  FaSignInAlt,
  FaUserPlus,
} from "react-icons/fa";
import { useSelector } from "react-redux";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const user = useSelector((state) => state.auth.user);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
              <FaBook className="text-purple-600 text-xl" />
            </div>
            <span className="text-2xl font-bold text-white">EduQuest</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a
              href="#hero"
              className="text-white hover:text-yellow-300 transition-colors font-medium"
            >
              Beranda
            </a>
            <a
              href="#about"
              className="text-white hover:text-yellow-300 transition-colors font-medium"
            >
              Tentang
            </a>
            <a
              href="#missions"
              className="text-white hover:text-yellow-300 transition-colors font-medium"
            >
              Misi
            </a>
            <a
              href="#contact"
              className="text-white hover:text-yellow-300 transition-colors font-medium"
            >
              Kontak
            </a>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <Link
                to="/dashboard"
                className="flex items-center space-x-2 bg-white text-purple-600 px-4 py-2 rounded-full font-semibold hover:bg-yellow-100 transition-colors"
              >
                <FaUser />
                <span>Dashboard</span>
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center space-x-2 bg-white text-purple-600 px-4 py-2 rounded-full font-semibold hover:bg-yellow-100 transition-colors"
                >
                  <FaSignInAlt />
                  <span>Masuk</span>
                </Link>
                <Link
                  to="/register"
                  className="flex items-center space-x-2 bg-yellow-400 text-purple-600 px-4 py-2 rounded-full font-semibold hover:bg-yellow-300 transition-colors"
                >
                  <FaUserPlus />
                  <span>Daftar</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white hover:text-yellow-300 transition-colors"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-purple-500 pt-4">
            <nav className="flex flex-col space-y-4">
              <a
                href="#hero"
                className="text-white hover:text-yellow-300 transition-colors font-medium"
                onClick={toggleMenu}
              >
                Beranda
              </a>
              <a
                href="#about"
                className="text-white hover:text-yellow-300 transition-colors font-medium"
                onClick={toggleMenu}
              >
                Tentang
              </a>
              <a
                href="#missions"
                className="text-white hover:text-yellow-300 transition-colors font-medium"
                onClick={toggleMenu}
              >
                Misi
              </a>
              <a
                href="#contact"
                className="text-white hover:text-yellow-300 transition-colors font-medium"
                onClick={toggleMenu}
              >
                Kontak
              </a>
              <div className="flex flex-col space-y-2 pt-4 border-t border-purple-500">
                <Link
                  to="/login"
                  className="flex items-center space-x-2 bg-white text-purple-600 px-4 py-2 rounded-full font-semibold hover:bg-yellow-100 transition-colors text-center justify-center"
                  onClick={toggleMenu}
                >
                  <FaSignInAlt />
                  <span>Masuk</span>
                </Link>
                <Link
                  to="/register"
                  className="flex items-center space-x-2 bg-yellow-400 text-purple-600 px-4 py-2 rounded-full font-semibold hover:bg-yellow-300 transition-colors text-center justify-center"
                  onClick={toggleMenu}
                >
                  <FaUserPlus />
                  <span>Daftar</span>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
