import { Skeleton } from "@mantine/core";
import React from "react";

const calculateTotalPages = (
  totalItems: number,
  itemsPerPage: number
): number => {
  return Math.ceil(totalItems / itemsPerPage);
};

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentpage: number;
  loading: boolean;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentpage,
  onPageChange,
  loading,
}) => {
  const totalPages = calculateTotalPages(totalItems, itemsPerPage);

  // Generate the range of pages to display
  const getVisiblePages = () => {
    const pages = [];
    const start = Math.max(1, currentpage - 1);
    const end = Math.min(totalPages, currentpage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div>
      {!loading && (
        <ul className="flex items-center justify-center">
          {/* Previous Button */}
          {currentpage > 1 && (
            <button
              className="relative inline-flex items-center px-4 py-2 border text-sm font-medium whitespace-nowrap cursor-pointer bg-white border-gray-300 text-gray-500 hover:bg-gray-50 rounded-l-md"
              onClick={() => onPageChange(currentpage - 1)}
            >
              Previous
            </button>
          )}

          {/* Visible Page Buttons */}
          {visiblePages.map((pageNumber) => (
            <button
              key={pageNumber}
              className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium whitespace-nowrap cursor-pointer ${
                currentpage === pageNumber
                  ? "z-10 bg-slate-100 border-slate-500 text-slate-600"
                  : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
              }`}
              disabled={currentpage === pageNumber}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}

          {/* Next Button */}
          {currentpage < totalPages && (
            <button
              className="relative inline-flex items-center px-4 py-2 border text-sm font-medium whitespace-nowrap cursor-pointer bg-white border-gray-300 text-gray-500 hover:bg-gray-50 rounded-r-md"
              onClick={() => onPageChange(currentpage + 1)}
            >
              Next
            </button>
          )}
        </ul>
      )}
      {loading && (
        <div className="flex items-center justify-center">
          <Skeleton height={"35px"} width={"200px"} mt={6} radius="0.75rem" />
        </div>
      )}
    </div>
  );
};

export default Pagination;
