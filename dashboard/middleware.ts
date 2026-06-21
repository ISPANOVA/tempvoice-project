import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE_NAME } from "@/lib/session";
import { getAppBaseUrl } from "@/lib/url";

export function middleware(req: NextRequest) {
  const sessionToken = req.cookies.get(SESSION_COOKIE_NAME)?.value;
  const { pathname } = req.nextUrl;

  const isProtectedRoute = pathname.startsWith("/dashboard");
  const isLoginRoute = pathname === "/login";

  const baseUrl = getAppBaseUrl();

  if (isProtectedRoute && !sessionToken) {
    return NextResponse.redirect(new URL("/login", baseUrl));
  }

  if (isLoginRoute && sessionToken) {
    return NextResponse.redirect(new URL("/dashboard", baseUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
