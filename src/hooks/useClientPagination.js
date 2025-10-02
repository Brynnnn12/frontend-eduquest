import { useState, useMemo, useCallback } from "react";

/**
 * Custom hook untuk client-side pagination dan search
 * @param {Array} data - Data array yang akan dipagination
 * @param {number} initialItemsPerPage - Jumlah item per halaman awal
 * @param {Array} searchFields - Field yang bisa dicari
 * @returns {Object} - Pagination dan search utilities
 */
const useClientPagination = (
  data,
  initialItemsPerPage = 10,
  searchFields = []
) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
  const [search, setSearch] = useState("");

  // Client-side filtering
  const filteredData = useMemo(() => {
    if (!search.trim() || !searchFields.length) return data;

    const searchLower = search.toLowerCase();
    return data.filter((item) =>
      searchFields.some((field) => {
        const value = item[field];
        if (Array.isArray(value)) {
          return value.some((v) =>
            String(v).toLowerCase().includes(searchLower)
          );
        }
        return String(value).toLowerCase().includes(searchLower);
      })
    );
  }, [data, search, searchFields]);

  // Client-side pagination
  const paginationData = useMemo(() => {
    const totalItems = filteredData.length;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
    const paginatedItems = filteredData.slice(startIndex, endIndex);

    return {
      items: paginatedItems,
      totalItems,
      totalPages: Math.ceil(totalItems / itemsPerPage),
      currentPage,
      itemsPerPage,
      startIndex: startIndex + 1,
      endIndex,
      hasNextPage: endIndex < totalItems,
      hasPrevPage: currentPage > 1,
    };
  }, [filteredData, currentPage, itemsPerPage]);

  // Handlers
  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const handleItemsPerPageChange = useCallback((newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page
  }, []);

  const handleSearchChange = useCallback((newSearch) => {
    setSearch(newSearch);
    setCurrentPage(1); // Reset to first page when search changes
  }, []);

  const resetPagination = useCallback(() => {
    setCurrentPage(1);
  }, []);

  return {
    // Data
    filteredData,
    paginatedData: paginationData.items,
    paginationInfo: paginationData,

    // State
    currentPage,
    itemsPerPage,
    search,

    // Handlers
    handlePageChange,
    handleItemsPerPageChange,
    handleSearchChange,
    resetPagination,

    // Computed
    isSearching: search.trim().length > 0,
    hasData: filteredData.length > 0,
  };
};

export default useClientPagination;
