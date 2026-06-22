"use client";

import { useRouter } from "next/navigation";
import Pagination from "@/components/ui/Pagination";

export default function FundingPaginationWrapper({ currentPage, totalPages }) {
  const router = useRouter();

  if (!totalPages || totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-6">
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => router.push(`/funding?page=${page}`)}
      />
    </div>
  );
}
