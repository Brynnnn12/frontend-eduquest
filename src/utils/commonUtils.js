/**
 * Utility functions untuk operasi umum
 */

/**
 * Safely get nested object property
 * @param {Object} obj - Object to get property from
 * @param {string} path - Dot notation path (e.g., "user.profile.name")
 * @param {*} defaultValue - Default value if path doesn't exist
 * @returns {*} - Value at path or default value
 */
export const getNestedProperty = (obj, path, defaultValue = undefined) => {
  const keys = path.split(".");
  let result = obj;

  for (const key of keys) {
    if (result == null || typeof result !== "object") {
      return defaultValue;
    }
    result = result[key];
  }

  return result !== undefined ? result : defaultValue;
};

/**
 * Debounce function untuk search inputs
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Format number dengan leading zeros
 * @param {number} num - Number to format
 * @param {number} size - Minimum length
 * @returns {string} - Formatted number
 */
export const padNumber = (num, size) => {
  return String(num).padStart(size, "0");
};

/**
 * Capitalize first letter of string
 * @param {string} str - String to capitalize
 * @returns {string} - Capitalized string
 */
export const capitalize = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Truncate text dengan ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} - Truncated text
 */
export const truncateText = (text, maxLength) => {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

/**
 * Check if array is empty or null
 * @param {Array} arr - Array to check
 * @returns {boolean} - True if empty or null
 */
export const isEmptyArray = (arr) => {
  return !Array.isArray(arr) || arr.length === 0;
};

/**
 * Check if object is empty
 * @param {Object} obj - Object to check
 * @returns {boolean} - True if empty
 */
export const isEmptyObject = (obj) => {
  return !obj || typeof obj !== "object" || Object.keys(obj).length === 0;
};

/**
 * Generate random ID
 * @param {number} length - Length of ID
 * @returns {string} - Random ID
 */
export const generateId = (length = 8) => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

/**
 * Deep clone object
 * @param {*} obj - Object to clone
 * @returns {*} - Cloned object
 */
export const deepClone = (obj) => {
  if (obj === null || typeof obj !== "object") return obj;
  if (obj instanceof Date) return new Date(obj.getTime());
  if (obj instanceof Array) return obj.map((item) => deepClone(item));
  if (typeof obj === "object") {
    const clonedObj = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }
};

/**
 * Sort array of objects by property
 * @param {Array} arr - Array to sort
 * @param {string} prop - Property to sort by
 * @param {boolean} ascending - Sort direction
 * @returns {Array} - Sorted array
 */
export const sortByProperty = (arr, prop, ascending = true) => {
  if (!Array.isArray(arr)) return arr;

  return [...arr].sort((a, b) => {
    const aVal = getNestedProperty(a, prop);
    const bVal = getNestedProperty(b, prop);

    if (aVal < bVal) return ascending ? -1 : 1;
    if (aVal > bVal) return ascending ? 1 : -1;
    return 0;
  });
};
