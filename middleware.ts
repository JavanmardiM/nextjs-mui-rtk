import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUserToken } from "./lib/auth";

export async function middleware(req: NextRequest) {
  const { token } = await getUserToken();
  const url = req.nextUrl.clone();

  if (!token && url.pathname !== "/login") {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (url.pathname === "/login" && token) {
    url.pathname = "/admin/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
