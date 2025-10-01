import { memo, useMemo } from "react";

const Pagination = memo(
  ({ currentPage, totalItems, itemsPerPage, onPageChange, className = "" }) => {
    const totalPages = useMemo(
      () => Math.ceil(totalItems / itemsPerPage),
      [totalItems, itemsPerPage]
    );

    if (totalPages <= 1) return null;

    const handlePrevious = () => {
      if (currentPage > 1) {
        onPageChange(currentPage - 1);
      }
    };

    const handleNext = () => {
      if (currentPage < totalPages) {
        onPageChange(currentPage + 1);
      }
    };

    return (
      <div
        className={`mt-4 flex justify-center items-center space-x-4 ${className}`}
      >
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-300 transition-colors"
          aria-label="Previous page"
        >
          Previous
        </button>

        <span className="px-3 py-2 bg-white border border-gray-300 rounded text-gray-700 font-medium">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-300 transition-colors"
          aria-label="Next page"
        >
          Next
        </button>
      </div>
    );
  }
);

Pagination.displayName = "Pagination";

export default Pagination;
