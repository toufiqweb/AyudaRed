"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

/**
 * Reusable Pagination component matching new design
 *
 * Props:
 *  - currentPage        {number}   — currently active page (1-indexed)
 *  - totalPages         {number}   — total number of pages
 *  - onPageChange       {function} — called with the new page number
 *  - totalItems         {number}   — (optional) total number of items
 *  - itemsPerPage       {number}   — (optional) number of items per page (default: 10)
 *  - onItemsPerPageChange {function} — (optional) called when rows per page changes
 */
export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage = 10,
  onItemsPerPageChange,
}) {
  const [inputValue, setInputValue] = useState(currentPage?.toString() || "1");

  useEffect(() => {
    setInputValue(currentPage?.toString() || "1");
  }, [currentPage]);

  if (totalPages <= 1 && !totalItems) return null;

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    let newPage = parseInt(inputValue, 10);
    if (isNaN(newPage) || newPage < 1) {
      newPage = 1;
    } else if (newPage > totalPages) {
      newPage = totalPages;
    }
    setInputValue(newPage.toString());
    if (newPage !== currentPage) {
      onPageChange(newPage);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleInputBlur();
    }
  };

  const startItem = totalItems ? (currentPage - 1) * itemsPerPage + 1 : 0;
  const endItem = totalItems ? Math.min(currentPage * itemsPerPage, totalItems) : 0;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full text-sm text-muted-foreground select-none py-2">
      {/* Left: Showing info */}
      <div className="flex-1 flex justify-start">
        {totalItems ? (
          <span>
            Showing {startItem}-{endItem} from {totalItems}
          </span>
        ) : null}
      </div>

      {/* Center: Pagination Controls */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage <= 1}
          title="First"
          className="p-1 rounded text-muted-foreground hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronsLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage <= 1}
          title="Previous"
          className="p-1 rounded text-muted-foreground hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 mx-1">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyDown}
            className="w-10 h-8 text-center border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
          <span className="font-medium">of {totalPages}</span>
        </div>

        <button
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage >= totalPages}
          title="Next"
          className="p-1 rounded text-muted-foreground hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage >= totalPages}
          title="Last"
          className="p-1 rounded text-muted-foreground hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronsRight className="w-4 h-4" />
        </button>
      </div>

      {/* Right: Rows per page */}
      <div className="flex-1 flex justify-end items-center gap-2">
        {onItemsPerPageChange ? (
          <>
            <span>Rows per page:</span>
            <div className="relative">
              <select
                value={itemsPerPage}
                onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
                className="h-8 pl-2 pr-6 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer appearance-none"
              >
                {[10, 20, 30, 40, 50].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                <ChevronRight className="w-3 h-3 rotate-90" />
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
