"use client";
import { useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Pagination from "./Pagination";

export default function UrlPagination({ currentPage, totalPages }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handlePageChange = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <div className={`transition-opacity duration-200 ${isPending ? "opacity-50 pointer-events-none" : ""}`}>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
