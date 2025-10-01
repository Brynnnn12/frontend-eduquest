import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaTimes,
  FaBook,
  FaPalette,
  FaUserCircle,
  FaGraduationCap,
  FaTrophy,
  FaTasks,
  FaChartLine,
} from "react-icons/fa";
import { useGetCharacterQuery } from "../../api/characterApiSlice";

export default function Sidebar({ isOpen, setIsOpen }) {
  const { data: character } = useGetCharacterQuery();

  const location = useLocation();

  const menuItems = [
    { icon: FaHome, label: "Beranda", path: "/dashboard" },
    { icon: FaTrophy, label: "Badges", path: "/dashboard/badges" },
    { icon: FaTasks, label: "Missions", path: "/dashboard/missions" },
    { icon: FaBook, label: "Quiz", path: "/dashboard/quiz" },
    { icon: FaChartLine, label: "Progress", path: "/dashboard/progress" },
    { icon: FaPalette, label: "Character", path: "/dashboard/character" },
    { icon: FaUserCircle, label: "Profile", path: "/dashboard/profile" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Overlay untuk mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-20 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed  container  lg:static inset-y-0 left-0 z-30
          w-64 bg-blue-600 text-white
          transform transition-transform duration-300 ease-in-out
          flex flex-col
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <FaGraduationCap className="text-white" size={24} />
          </div>
          <button
            className="lg:hidden p-2 hover:bg-blue-500 rounded"
            onClick={() => setIsOpen(false)}
          >
            <FaTimes />
          </button>
        </div>

        {/* Profile Section */}
        <div className="p-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="font-bold text-white">
                {character?.username
                  ? character.username.charAt(0).toUpperCase()
                  : "?"}
              </span>
            </div>
            <div>
              <p className="font-semibold">
                {character?.username || "Loading..."}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4">
          <p className="text-sm text-blue-200 mb-4">Menu Utama</p>

          <div className="space-y-2">
            {menuItems.map((item, index) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={index}
                  to={item.path}
                  className={`
                    flex items-center px-3 py-3 rounded-lg transition-colors
                    ${
                      active
                        ? "bg-white text-blue-600 font-semibold"
                        : "text-blue-100 hover:bg-blue-500 hover:text-white"
                    }
                  `}
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="mr-3" size={18} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </>
  );
}
