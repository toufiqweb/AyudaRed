"use client";

import EditDonationRequestPage from "@/components/dashboard/EditDonationRequestPage";
import RoleGuard from "@/components/shared/RoleGuard";

export default function Page() {
  return (
    <RoleGuard allowedRoles={["donor", "admin"]}>
      <EditDonationRequestPage />
    </RoleGuard>
  );
}
