// middleware.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

// Public API route prefixes
const PUBLIC_API_PREFIXES = [
  "/api/system-health",
  "/api/user/auth/login",
  "/api/user/auth/register",
];

export function proxy(req: NextRequest) {
  const currentPath = req.nextUrl.pathname;
  const token = req.cookies.get("token")?.value;

  /* ─────────────────────────────────────────────
     ✅ PUBLIC API ROUTES (NO AUTH)
  ───────────────────────────────────────────── */
  const isPublicRoute = PUBLIC_API_PREFIXES.some((path) => {
    const matches = currentPath.startsWith(path);
 
    return matches;
  });

  if (isPublicRoute) {
    return NextResponse.next();
  }

  /* ─────────────────────────────────────────────
     🛑 LOGIN PAGE
  ───────────────────────────────────────────── */
  if (currentPath === "/login") {
    if (token) {
      try {
        jwt.verify(token, SECRET);

        return NextResponse.redirect(new URL("/", req.url));
      } catch {
        return NextResponse.next();
      }
    }

    return NextResponse.next();
  }

  /* ─────────────────────────────────────────────
     🔐 DASHBOARD
  ───────────────────────────────────────────── */
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

  /* ─────────────────────────────────────────────
     🔑 PROTECTED APIs
  ───────────────────────────────────────────── */
  if (currentPath.startsWith("/api/")) {
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
      const decoded = jwt.verify(token, SECRET) as { id: string };
      if (!decoded?.id) throw new Error("Invalid token payload");

      const headers = new Headers(req.headers);
      headers.set("x-user-id", decoded.id);

      return NextResponse.next({
        request: { headers },
      });
    } catch (error) {
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/dashboard/:path*", "/api/:path*"],
};
