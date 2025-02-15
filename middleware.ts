import { NextRequest, NextResponse } from "next/server";
import { getUserToken } from "./lib/auth";

export default async function middleware(request: NextRequest) {
  const { token } = await getUserToken();

  const signInUrl = new URL("/login", request.url);
  const dashboardUrl = new URL("/admin/dashboard", request.url);

  if (!token) {
    if (request.nextUrl.pathname === "/login") {
      return NextResponse.next();
    }

    return NextResponse.redirect(signInUrl);
  }

  if (request.nextUrl.pathname === "/login") {
    return NextResponse.redirect(dashboardUrl);
  }
}

export const config = {
  matcher: ["/login", "/admin/:path*"],
};
