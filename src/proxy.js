import { NextResponse } from "next/server";
import { auth } from "./lib/auth";
import { headers } from "next/headers";

// This function can be marked `async` if using `await` inside
export async function proxy(request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const pathname = request.nextUrl.pathname;
  const user = session?.user;

  if (!user) {
    const fullPath = request.nextUrl.pathname + request.nextUrl.search;
    const loginUrl = new URL("/sign-in", request.url);
    loginUrl.searchParams.set("redirect", fullPath);
    return NextResponse.redirect(loginUrl);
  }

  const role = user.role;

  // Admin Only Routes
  if (pathname.startsWith("/dashboard/all-users") || pathname.startsWith("/dashboard/admin")) {
    if (role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  // Volunteer Only Routes
  if (pathname.startsWith("/dashboard/volunteer")) {
    if (role !== "volunteer") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  // Admin + Volunteer Shared Routes
  if (pathname.startsWith("/dashboard/all-blood-donation-request")) {
    if (role !== "admin" && role !== "volunteer") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  // Donor Only Routes
  if (
    pathname.startsWith("/dashboard/create-donation-request") ||
    pathname.startsWith("/dashboard/my-donation-requests") ||
    pathname.startsWith("/dashboard/donor")
  ) {
    if (role !== "donor") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  // Shared Edit Routes (Donor + Admin)
  if (pathname.startsWith("/dashboard/donation-requests/edit")) {
    if (role !== "donor" && role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/donation-requests/:id", "/funding"],
};
