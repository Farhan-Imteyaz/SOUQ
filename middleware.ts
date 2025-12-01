import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
 
  // Protected routes
  const protectedRoutes = ["/dashboard"];

  const currentPath = req.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.some(route =>
    currentPath.startsWith(route)
  );

   console.log("Token in middleware:", isProtectedRoute, token);

  if (isProtectedRoute) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      jwt.verify(token, SECRET);
      return NextResponse.next();
    } catch (err) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

 
export const config = {
  matcher: [
    "/dashboard/:path*",
  ],
    runtime: "nodejs",
};
