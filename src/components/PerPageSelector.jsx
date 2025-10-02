import React from "react";

const PerPageSelector = ({
  value,
  onChange,
  options = [5, 10, 25, 50, 100],
  className = "",
}) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <label htmlFor="per-page" className="text-sm font-medium text-gray-700">
        Show:
      </label>
      <select
        id="per-page"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="block w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white shadow-sm text-sm"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <span className="text-sm text-gray-600">entries</span>
    </div>
  );
};

export default PerPageSelector;
