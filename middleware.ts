import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const publicPath = path === "/login" || path === "/signup";

  const protectedPath = path.startsWith("/api");

  const token = request.cookies.get("token")?.value || "";

  if (publicPath && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!publicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/", "/login", "/signup", "/api"],
};
