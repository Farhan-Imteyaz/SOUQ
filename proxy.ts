import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

export function proxy(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const currentPath = req.nextUrl.pathname;

  // Redirect logged-in users away from /login
  if (currentPath === "/login" && token) {
    try {
      jwt.verify(token, SECRET);
      return NextResponse.redirect(new URL("/", req.url));
    } catch {
      // invalid token, allow to login
      return NextResponse.next();
    }
  }

  if (currentPath.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      jwt.verify(token, SECRET);
      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/dashboard/:path*"], // apply middleware to login and dashboard
};
