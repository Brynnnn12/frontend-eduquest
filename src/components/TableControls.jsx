import React from "react";
import SearchInput from "./SearchInput";
import PerPageSelector from "./PerPageSelector";

const TableControls = ({
  searchValue,
  onSearchChange,
  perPage,
  onPerPageChange,
  totalItems,
  currentPage,
  itemsPerPage,
  searchPlaceholder = "Search...",
  perPageOptions = [5, 10, 25, 50, 100],
  isSearchLoading = false,
  className = "",
  showNoDataMessage = true,
  searchMode = "client", // Always client-side now
  clientSearchResults = null,
}) => {
  const isSearchActive = searchValue && searchValue.trim().length > 0;
  const hasNoData = totalItems === 0;

  // For client-side search, show filtered results count
  const displayTotal =
    searchMode === "client" && clientSearchResults !== null
      ? clientSearchResults.length
      : totalItems;

  const displayCurrentPage = searchMode === "client" ? 1 : currentPage; // Client search always shows page 1
  const displayItemsPerPage =
    searchMode === "client" ? displayTotal : itemsPerPage;

  const startItem = (displayCurrentPage - 1) * displayItemsPerPage + 1;
  const endItem = Math.min(
    displayCurrentPage * displayItemsPerPage,
    displayTotal
  );

  return (
    <div
      className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${className}`}
    >
      {/* Left side - Per page selector and info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <PerPageSelector
          value={perPage}
          onChange={onPerPageChange}
          options={perPageOptions}
        />
        {displayTotal > 0 && searchMode !== "client" && (
          <div className="text-sm text-gray-600">
            Showing {startItem} to {endItem} of {displayTotal} entries
          </div>
        )}
        {displayTotal > 0 && searchMode === "client" && (
          <div className="text-sm text-gray-600">
            Found {displayTotal} result{displayTotal !== 1 ? "s" : ""}
            {isSearchActive && ` for "${searchValue}"`}
          </div>
        )}
        {isSearchActive && hasNoData && showNoDataMessage && (
          <div className="text-sm text-orange-600 font-medium">
            Tidak ada data ditemukan untuk "{searchValue}"
          </div>
        )}
        {!isSearchActive && hasNoData && showNoDataMessage && (
          <div className="text-sm text-gray-500">Belum ada data tersedia</div>
        )}
      </div>

      {/* Right side - Search input */}
      <SearchInput
        value={searchValue}
        onChange={onSearchChange}
        placeholder={searchPlaceholder}
        isLoading={isSearchLoading}
        className="w-full sm:w-64"
      />
    </div>
  );
};

export default TableControls;
