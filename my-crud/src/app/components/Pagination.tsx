// Props for the Pagination component
type PaginationProps = {
  currentPage: number; // The current active page
  totalPages: number;  // The total number of pages
  onPageChange: (page: number) => void; // Callback to change the page
};

// Pagination component renders navigation controls for paginated data
export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  return (
    // Container for pagination controls
    <div className="flex justify-center gap-2 mt-4 color-gray-500">
      {/* Previous page button, disabled on first page */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 bg-gray-600 rounded hover:bg-gray-400 disabled:opacity-50 cursor-pointer"
      >
        ← Before
      </button>

      {/* Display current page and total pages */}
      <span className="px-3 py-1">{currentPage} / {totalPages}</span>

      {/* Next page button, disabled on last page */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 bg-gray-600 rounded hover:bg-gray-400 disabled:opacity-50 cursor-pointer"
      >
        Next →
      </button>
    </div>
  );
}