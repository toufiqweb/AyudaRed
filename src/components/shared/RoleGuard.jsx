"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserClientSession } from "@/lib/core/sessionClient";
import { Loader2 } from "lucide-react";

export default function RoleGuard({ allowedRoles, children }) {
  const { user, isPending } = useUserClientSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending) {
      if (!user) {
        router.replace("/sign-in");
      } else if (!allowedRoles.includes(user.role)) {
        router.replace("/unauthorized");
      }
    }
  }, [user, isPending, allowedRoles, router]);

  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-muted-foreground gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-sm font-medium">Verifying access privileges...</p>
      </div>
    );
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return null; // Prevent rendering unauthorized content while redirecting
  }

  return <>{children}</>;
}
