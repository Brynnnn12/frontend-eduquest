import { FaBookOpen, FaGamepad, FaTrophy, FaUsers } from "react-icons/fa";

const About = () => {
  const features = [
    {
      icon: <FaBookOpen className="text-4xl text-purple-600" />,
      title: "Belajar Menyenangkan",
      description:
        "Pelajari berbagai mata pelajaran melalui cerita petualangan yang menarik dan karakter-karakter lucu.",
    },
    {
      icon: <FaGamepad className="text-4xl text-blue-600" />,
      title: "Game Interaktif",
      description:
        "Mainkan game edukasi yang membuat belajar terasa seperti bermain, bukan tugas yang membosankan.",
    },
    {
      icon: <FaTrophy className="text-4xl text-yellow-600" />,
      title: "Poin & Hadiah",
      description:
        "Kumpulkan poin dari setiap misi yang diselesaikan dan tukarkan dengan badge dan hadiah spesial.",
    },
    {
      icon: <FaUsers className="text-4xl text-green-600" />,
      title: "Bersama Teman",
      description:
        "Bersaing dengan teman-teman dalam leaderboard dan bagikan pencapaianmu di media sosial.",
    },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Apa itu <span className="text-purple-600">EduQuest</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              EduQuest adalah platform pembelajaran interaktif yang dirancang
              khusus untuk anak-anak SD. Kami mengubah proses belajar dari yang
              membosankan menjadi petualangan seru yang penuh tantangan!
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white to-purple-50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 border border-purple-100"
              >
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 text-center mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Story Section */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-8 md:p-12 text-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl md:text-4xl font-bold mb-6">
                  Cerita Petualangan Edukasi
                </h3>
                <p className="text-lg mb-6 leading-relaxed text-purple-100">
                  Setiap misi adalah sebuah cerita petualangan dimana kamu akan
                  bertemu dengan karakter-karakter lucu dan menghadapi
                  tantangan-tantangan menarik. Selesaikan quiz, pecahkan
                  teka-teki, dan kumpulkan poin!
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                    <span className="font-semibold">
                      🧙‍♂️ Pahlawan Pengetahuan
                    </span>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                    <span className="font-semibold">🏰 Dunia Fantasi</span>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                    <span className="font-semibold">⭐ Poin & Badge</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-yellow-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-4xl">🎯</span>
                    </div>
                    <h4 className="text-2xl font-bold mb-2">Misi Harian</h4>
                    <p className="text-purple-100">
                      Selesaikan misi harian untuk mendapatkan poin ekstra dan
                      badge spesial!
                    </p>
                  </div>
                </div>
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-pink-400 rounded-full flex items-center justify-center animate-bounce">
                  <span className="text-white font-bold">⭐</span>
                </div>
                <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-green-400 rounded-full flex items-center justify-center animate-pulse">
                  <span className="text-white font-bold">🎈</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
