import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaHeart,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="bg-gradient-to-r from-gray-800 to-gray-900 text-white"
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-bold text-xl">📚</span>
              </div>
              <span className="text-2xl font-bold">EduQuest</span>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Platform pembelajaran interaktif yang membuat belajar menjadi
              petualangan seru untuk anak-anak SD.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-pink-400 transition-colors"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-300 transition-colors"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-red-400 transition-colors"
              >
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Menu Cepat
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#hero"
                  className="text-gray-300 hover:text-yellow-400 transition-colors"
                >
                  Beranda
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-gray-300 hover:text-yellow-400 transition-colors"
                >
                  Tentang Kami
                </a>
              </li>
              <li>
                <a
                  href="#missions"
                  className="text-gray-300 hover:text-yellow-400 transition-colors"
                >
                  Misi & Quiz
                </a>
              </li>
              <li>
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-yellow-400 transition-colors"
                >
                  Masuk
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="text-gray-300 hover:text-yellow-400 transition-colors"
                >
                  Daftar
                </Link>
              </li>
            </ul>
          </div>

          {/* Subjects */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Mata Pelajaran
            </h3>
            <ul className="space-y-2">
              <li className="text-gray-300">Matematika</li>
              <li className="text-gray-300">Bahasa Indonesia</li>
              <li className="text-gray-300">Ilmu Pengetahuan Alam</li>
              <li className="text-gray-300">Ilmu Pengetahuan Sosial</li>
              <li className="text-gray-300">Bahasa Inggris</li>
              <li className="text-gray-300">Seni & Budaya</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Hubungi Kami
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-purple-400 flex-shrink-0" />
                <span className="text-gray-300">info@eduquest.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone className="text-purple-400 flex-shrink-0" />
                <span className="text-gray-300">+62 812-3456-7890</span>
              </div>
              <div className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-purple-400 flex-shrink-0 mt-1" />
                <span className="text-gray-300">
                  Jl. Pendidikan No. 123
                  <br />
                  Jakarta, Indonesia
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-700 pt-8 pb-8">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-lg font-semibold mb-4 text-white">
              Dapatkan Update Terbaru
            </h3>
            <p className="text-gray-300 mb-4">
              Berlangganan newsletter kami untuk mendapatkan misi baru dan tips
              belajar!
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Masukkan email kamu"
                className="flex-1 px-4 py-2 rounded-l-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-r-lg font-semibold transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} EduQuest. Dibuat dengan{" "}
              <FaHeart className="inline text-red-500 mx-1" /> untuk anak-anak
              Indonesia.
            </p>
            <div className="flex space-x-6 text-sm">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Kebijakan Privasi
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Syarat & Ketentuan
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Bantuan
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
