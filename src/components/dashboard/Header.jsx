import { FaBars, FaBell, FaSearch } from "react-icons/fa";
import { useGetCharacterQuery } from "../../api/characterApiSlice";

export default function Header({ onMenuClick }) {
  const { data: character } = useGetCharacterQuery();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-4 lg:px-6 py-4">
        {/* Left Section - Menu Button */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg bg-[#E0E7FF] text-[#4F46E5] hover:bg-[#4F46E5] hover:text-white transition-colors"
          >
            <FaBars size={18} />
          </button>

          <div className="relative hidden lg:block">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" size={16} />
            </div>
            <input
              type="text"
              placeholder="Cari petualangan..."
              className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent"
            />
          </div>
        </div>

        {/* Right Section - Notifications & Profile */}
        <div className="flex items-center space-x-4">
          {/* Notification Bell */}
          <button className="relative p-2 rounded-lg bg-[#E0E7FF] text-[#4F46E5] hover:bg-[#4F46E5] hover:text-white transition-colors">
            <FaBell size={18} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          {/* User Profile */}
          <div className="flex items-center space-x-3">
            <div className="hidden lg:block text-right">
              <p className="text-sm font-semibold text-gray-900">
                {character?.username || "Loading..."}
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#10B981] to-[#F59E0B] p-0.5">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                <span className="font-bold text-[#4F46E5]">
                  {character?.username
                    ? character.username.charAt(0).toUpperCase()
                    : "?"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
