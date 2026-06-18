"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Reusable Pagination component.
 *
 * Props:
 *  - currentPage  {number}   — currently active page (1-indexed)
 *  - totalPages   {number}   — total number of pages
 *  - onPageChange {function} — called with the new page number
 */
export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  /* ── Build the page number array ─────────────────────────────── */
  const buildPages = () => {
    if (totalPages <= 6) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, "…", totalPages];
    }

    if (currentPage >= totalPages - 2) {
      return [
        1,
        "…",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      "…",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "…",
      totalPages,
    ];
  };

  const pages = buildPages();

  return (
    <div className="flex items-center gap-1.5 select-none">
      {/* ← Previous */}
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className="w-9 h-9 flex items-center justify-center rounded-lg border border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Page numbers */}
      {pages.map((page, idx) =>
        page === "…" ? (
          <span
            key={`ellipsis-${idx}`}
            className="w-9 h-9 flex items-center justify-center text-xs text-muted-foreground font-medium"
          >
            •••
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            aria-label={`Page ${page}`}
            aria-current={page === currentPage ? "page" : undefined}
            className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-semibold border transition-all ${
              page === currentPage
                ? "bg-[#0f172a] text-white border-[#0f172a] shadow-sm scale-105"
                : "bg-background text-foreground border-border hover:bg-muted"
            }`}
          >
            {page}
          </button>
        ),
      )}

      {/* → Next */}
      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className="w-9 h-9 flex items-center justify-center rounded-lg border border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
