import { Link } from "react-router-dom";
import { FaPlay, FaRocket, FaStar } from "react-icons/fa";

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 py-20 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-400 rounded-full animate-bounce"></div>
        <div className="absolute top-20 right-20 w-16 h-16 bg-pink-400 rounded-full animate-pulse"></div>
        <div
          className="absolute bottom-20 left-1/4 w-12 h-12 bg-green-400 rounded-full animate-bounce"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-10 right-1/3 w-8 h-8 bg-orange-400 rounded-full animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Petualangan
            <span className="block text-yellow-300">Belajar Seru!</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-purple-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Bergabunglah dalam petualangan edukasi yang menyenangkan! Selesaikan
            misi, jawab quiz, dan kumpulkan poin untuk menjadi pahlawan
            pengetahuan!
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              to="/register"
              className="group flex items-center space-x-3 bg-yellow-400 hover:bg-yellow-300 text-purple-800 px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <FaRocket className="text-xl group-hover:animate-bounce" />
              <span>Mulai Petualangan!</span>
            </Link>
            <button className="group flex items-center space-x-3 bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-full font-bold text-lg transition-all backdrop-blur-sm border-2 border-white/30">
              <FaPlay className="text-xl group-hover:animate-pulse" />
              <span>Lihat Demo</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-center mb-3">
                <FaStar className="text-yellow-300 text-3xl" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">100+</h3>
              <p className="text-purple-100">Misi Menarik</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-center mb-3">
                <FaRocket className="text-blue-300 text-3xl" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">50+</h3>
              <p className="text-purple-100">Quiz Seru</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-center mb-3">
                <FaPlay className="text-green-300 text-3xl" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">1000+</h3>
              <p className="text-purple-100">Pemain Aktif</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="w-full h-auto">
          <path
            fill="#ffffff"
            d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,48C960,53,1056,75,1152,80C1248,85,1344,75,1392,69.3L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
