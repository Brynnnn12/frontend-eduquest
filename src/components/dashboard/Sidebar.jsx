import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaTimes,
  FaBook,
  FaPalette,
  FaUserCircle,
  FaGraduationCap,
  FaTrophy,
} from "react-icons/fa";

export default function Sidebar({ isOpen, setIsOpen }) {
  const location = useLocation();

  const menuItems = [
    { icon: FaHome, label: "Beranda", path: "/dashboard" },
    { icon: FaTrophy, label: "Badges", path: "/dashboard/badges" },
    { icon: FaBook, label: "Quiz", path: "/dashboard/quiz" },
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
          fixed mx-4 sm:mx-0  my-2 px-2 container rounded-2xl lg:static inset-y-0 left-0 z-30
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
              <span className="font-bold text-white">PH</span>
            </div>
            <div>
              <p className="font-semibold">Petualang Hebat</p>
              <p className="text-sm text-blue-200">Level 5</p>
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
