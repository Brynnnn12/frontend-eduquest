import { useState, useEffect } from "react";
import { API_LIMITS } from "../constants/appConstants";

/**
 * Hook untuk load all data at once untuk client-side search
 * @param {Function} queryFn - RTK Query hook function
 * @param {Object} baseParams - Parameter dasar untuk query
 * @param {Array} searchFields - Fields yang bisa dicari
 * @param {number} maxLimit - Maximum limit untuk load data (default: 100)
 * @returns {Object} - { data: allData, isLoading, error, filteredData, searchFields }
 */
const useAllDataForSearch = (
  queryFn,
  baseParams = {},
  searchFields = null,
  maxLimit = API_LIMITS.QUIZ_LOAD_LIMIT
) => {
  const [allData, setAllData] = useState([]);
  const [hasLoadedAll, setHasLoadedAll] = useState(false);

  // Load all data with high limit (adjust based on your needs)
  const {
    data: response,
    isLoading,
    error,
  } = queryFn({
    ...baseParams,
    page: 1,
    limit: maxLimit, // Load maximum data for search
  });

  // Store all data when loaded
  useEffect(() => {
    if (response?.data && !hasLoadedAll) {
      setAllData(response.data);
      setHasLoadedAll(true);
    }
  }, [response?.data, hasLoadedAll]);

  // Get pagination info
  const totalItems = response?.meta?.total || 0;
  const hasMoreData = totalItems > maxLimit; // If more than maxLimit items, might need server-side search

  return {
    data: allData,
    isLoading: isLoading && !hasLoadedAll,
    error,
    totalItems,
    hasMoreData,
    searchFields: searchFields || ["title", "description", "name"], // Default searchable fields
  };
};

export default useAllDataForSearch;
