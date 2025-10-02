import { useMemo } from "react";

/**
 * Hook untuk client-side search/filtering
 * @param {Array} data - Array data yang akan difilter
 * @param {string} searchQuery - Query pencarian
 * @param {Array} searchFields - Array field yang akan dicari (default: semua field)
 * @returns {Array} - Data yang sudah difilter
 */
const useClientSearch = (data, searchQuery, searchFields = null) => {
  return useMemo(() => {
    if (!searchQuery || !searchQuery.trim()) {
      return data;
    }

    const query = searchQuery.toLowerCase().trim();

    return data.filter((item) => {
      // Jika searchFields tidak disediakan, cari di semua field
      const fieldsToSearch = searchFields || Object.keys(item);

      return fieldsToSearch.some((field) => {
        const value = item[field];
        if (value === null || value === undefined) return false;

        // Handle different data types
        if (typeof value === "string") {
          return value.toLowerCase().includes(query);
        }
        if (typeof value === "number") {
          return value.toString().includes(query);
        }
        if (Array.isArray(value)) {
          return value.some((arrItem) =>
            typeof arrItem === "string"
              ? arrItem.toLowerCase().includes(query)
              : arrItem.toString().includes(query)
          );
        }

        // For other types, convert to string
        return String(value).toLowerCase().includes(query);
      });
    });
  }, [data, searchQuery, searchFields]);
};

export default useClientSearch;
