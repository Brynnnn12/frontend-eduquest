import React from "react";
import { FaSearch, FaSpinner } from "react-icons/fa";

const SearchInput = ({
  value,
  onChange,
  placeholder = "Search...",
  isLoading = false,
  className = "",
}) => {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        {isLoading ? (
          <FaSpinner className="text-gray-400 animate-spin" />
        ) : (
          <FaSearch className="text-gray-400" />
        )}
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white shadow-sm"
      />
    </div>
  );
};

export default SearchInput;
