import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE_NAME } from "@/lib/session";

export function middleware(req: NextRequest) {
  const sessionToken = req.cookies.get(SESSION_COOKIE_NAME)?.value;
  const { pathname } = req.nextUrl;

  const isProtectedRoute = pathname.startsWith("/dashboard");
  const isLoginRoute = pathname === "/login";

  if (isProtectedRoute && !sessionToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isLoginRoute && sessionToken) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
