import { Link } from "react-router-dom";
import { FaPlay, FaStar, FaClock, FaTrophy } from "react-icons/fa";
import { useGetMissionsQuery } from "../../api/missionApiSlice";

const MissionSelection = () => {
  const {
    data: missionsResponse,
    isLoading,
    error,
  } = useGetMissionsQuery({ limit: 4 });

  const missions = missionsResponse?.data || [];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Mudah":
        return "bg-green-100 text-green-800";
      case "Sedang":
        return "bg-yellow-100 text-yellow-800";
      case "Sulit":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getDifficultyIcon = (difficulty) => {
    switch (difficulty) {
      case "Mudah":
        return "🟢";
      case "Sedang":
        return "🟡";
      case "Sulit":
        return "�";
      default:
        return "⚪";
    }
  };

  if (isLoading) {
    return (
      <section
        id="missions"
        className="py-20 bg-gradient-to-br from-purple-50 to-blue-50"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Memuat misi...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        id="missions"
        className="py-20 bg-gradient-to-br from-purple-50 to-blue-50"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-red-600">
              Gagal memuat misi. Silakan coba lagi.
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (missions.length === 0) {
    return (
      <section
        id="missions"
        className="py-20 bg-gradient-to-br from-purple-50 to-blue-50"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-gray-600">Tidak ada misi tersedia saat ini.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="missions"
      className="py-20 bg-gradient-to-br from-purple-50 to-blue-50"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Pilih <span className="text-purple-600">Misimu</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Pilih misi yang ingin kamu selesaikan hari ini! Setiap misi akan
              memberikan poin dan pengetahuan baru.
            </p>
          </div>

          {/* Missions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {missions.map((mission) => (
              <div
                key={mission.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 border border-purple-100 overflow-hidden"
              >
                {/* Mission Header */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-4xl">🎯</span>
                    <div
                      className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1 ${getDifficultyColor(mission.level)}`}
                    >
                      <span>{getDifficultyIcon(mission.level)}</span>
                      <span>{mission.level}</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{mission.title}</h3>
                  <p className="text-white/90 leading-relaxed">
                    {mission.description}
                  </p>
                </div>

                {/* Mission Details */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <FaClock className="text-purple-600" />
                        <span>15-30 menit</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FaStar className="text-yellow-500" />
                        <span>{mission.points} poin</span>
                      </div>
                    </div>
                  </div>

                  {/* Subjects */}
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">
                      Mata Pelajaran:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                        {mission.subject}
                      </span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Link
                    to={`/mission/${mission.id}`}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all flex items-center justify-center space-x-2 group"
                  >
                    <FaPlay className="group-hover:animate-pulse" />
                    <span>Lihat Misi</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-8 md:p-12 text-white">
            <FaTrophy className="text-6xl mx-auto mb-6 text-yellow-300" />
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Siap Menjadi Pahlawan Pengetahuan?
            </h3>
            <p className="text-xl mb-8 text-purple-100 max-w-2xl mx-auto">
              Daftar sekarang dan mulai petualangan belajar yang seru! Raih poin
              tertinggi dan jadilah juara di leaderboard!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-yellow-400 hover:bg-yellow-300 text-purple-800 px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
              >
                Daftar Sekarang - Gratis!
              </Link>
              <Link
                to="/login"
                className="bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-full font-bold text-lg transition-all backdrop-blur-sm border-2 border-white/30"
              >
                Sudah Punya Akun? Masuk
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSelection;
