import { useParams, Link, useNavigate } from "react-router-dom";
import { FaPlay, FaStar, FaClock, FaTrophy, FaBookOpen } from "react-icons/fa";
import { useGetMissionByIdQuery } from "../../api/missionApiSlice";
import { useSelector } from "react-redux";

const MissionDetail = () => {
  const { missionId } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const { data: mission, isLoading, error } = useGetMissionByIdQuery(missionId);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Mudah":
        return "text-green-600 bg-green-100";
      case "Sedang":
        return "text-yellow-600 bg-yellow-100";
      case "Sulit":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getDifficultyIcon = (difficulty) => {
    switch (difficulty) {
      case "Mudah":
        return "🟢";
      case "Sedang":
        return "🟡";
      case "Sulit":
        return "🔴";
      default:
        return "⚪";
    }
  };

  if (isLoading) {
    return (
      <div className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Memuat detail misi...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !mission) {
    return (
      <div className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Misi Tidak Ditemukan
            </h1>
            <p className="text-gray-600 mb-6">
              Misi yang Anda cari tidak tersedia.
            </p>
            <Link
              to="/"
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleStartMission = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    //jika misi nya sudah diselesaikan maka nggak bisa masuk quiz lagi tetep di halaman misi
    if (mission.status === "completed") {
      navigate(`/mission/${mission.id}`);
      return;
    }
    // Navigate to quiz page for this mission
    navigate(`/quiz/${mission.id}`);
  };

  return (
    <div className="py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div
              className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-2 ${getDifficultyColor(mission.level)}`}
            >
              <span className="text-lg">
                {getDifficultyIcon(mission.level)}
              </span>
              <span>{mission.level}</span>
            </div>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaBookOpen className="text-white text-3xl" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {mission.title}
            </h1>
            <p className="text-gray-600 text-lg">{mission.description}</p>
          </div>
        </div>

        {/* Mission Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-2xl shadow-2xl p-6 text-center">
            <FaStar className="text-yellow-500 text-3xl mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-gray-800 mb-1">
              {mission.points}
            </h3>
            <p className="text-gray-600">Total Poin</p>
          </div>
          <div className="bg-white rounded-2xl shadow-2xl p-6 text-center">
            <FaClock className="text-purple-600 text-3xl mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-gray-800 mb-1">15-30</h3>
            <p className="text-gray-600">Menit</p>
          </div>
          <div className="bg-white rounded-2xl shadow-2xl p-6 text-center">
            <FaTrophy className="text-orange-500 text-3xl mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-gray-800 mb-1">
              {mission.subject}
            </h3>
            <p className="text-gray-600">Mata Pelajaran</p>
          </div>
        </div>

        {/* Mission Details */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Tentang Misi Ini
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                🎯 Objektif
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Selesaikan quiz interaktif dengan {mission.points} poin
                maksimal. Jawab pertanyaan dengan benar untuk mendapatkan nilai
                tinggi!
              </p>

              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                📚 Materi Pembelajaran
              </h3>
              <div className="bg-purple-50 rounded-lg p-4">
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                  {mission.subject}
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                🏆 Hadiah
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center space-x-2">
                  <FaStar className="text-yellow-500" />
                  <span>{mission.points} poin untuk leaderboard</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FaTrophy className="text-orange-500" />
                  <span>Badge khusus jika menyelesaikan</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FaBookOpen className="text-purple-500" />
                  <span>Sertifikat penyelesaian</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Start Mission */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl shadow-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Siap Memulai Petualangan?</h2>
          <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
            Klik tombol di bawah untuk memulai misi ini. Kamu akan diarahkan ke
            halaman quiz dengan timer dan sistem scoring yang menarik!
          </p>

          {user ? (
            <button
              onClick={handleStartMission}
              className="bg-yellow-400 hover:bg-yellow-300 text-purple-800 px-8 py-4 rounded-full font-bold text-xl transition-all transform hover:scale-105 shadow-lg flex items-center space-x-3 mx-auto"
            >
              <FaPlay className="text-2xl" />
              <span>Mulai Misi Sekarang!</span>
            </button>
          ) : (
            <div className="space-y-4">
              <p className="text-yellow-300 font-semibold">
                Kamu perlu masuk terlebih dahulu untuk memulai misi
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/login"
                  className="bg-white text-purple-600 px-6 py-3 rounded-full font-semibold hover:bg-yellow-100 transition-colors"
                >
                  Masuk
                </Link>
                <Link
                  to="/register"
                  className="bg-yellow-400 text-purple-800 px-6 py-3 rounded-full font-semibold hover:bg-yellow-300 transition-colors"
                >
                  Daftar Baru
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MissionDetail;
