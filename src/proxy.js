import { NextResponse } from "next/server";
import { auth } from "./lib/auth";
import { headers } from "next/headers";

// This function can be marked `async` if using `await` inside
export async function proxy(request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // current page path

  const user = session?.user;
  if (!user) {
    const fullPath = request.nextUrl.pathname + request.nextUrl.search;
    const loginUrl = new URL("/sign-in", request.url);
    loginUrl.searchParams.set("redirect", fullPath);
    return NextResponse.redirect(loginUrl);
  }
}

// Alternatively, you can use a default export:
// export default function proxy(request) { ... }

export const config = {
  matcher: ["/donation-requests/:id", "/dashboard", "/funding"],
};
