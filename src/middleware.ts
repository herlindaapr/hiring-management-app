import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    const pathname = req.nextUrl.pathname;

    // Redirect authenticated users away from login/register pages
    if ((pathname === "/" || pathname === "/register") && isAuth && token?.role) {
      if (token.role === "admin") {
        return NextResponse.redirect(new URL("/admins", req.url));
      } else if (token.role === "user") {
        return NextResponse.redirect(new URL("/candidates", req.url));
      }
    }

    // Protect admin routes
    if (pathname.startsWith("/admins")) {
      if (!isAuth || !token?.role) {
        return NextResponse.redirect(new URL("/", req.url));
      }
      if (token.role !== "admin") {
        // User role should access candidates page
        return NextResponse.redirect(new URL("/candidates", req.url));
      }
    }

    // Protect candidate routes
    if (pathname.startsWith("/candidates")) {
      if (!isAuth || !token?.role) {
        return NextResponse.redirect(new URL("/", req.url));
      }
      if (token.role !== "user") {
        // Admin role should access admin page
        return NextResponse.redirect(new URL("/admins", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname;
        
        // Allow access to public pages (login, register) without authentication
        if (pathname === "/" || pathname === "/register") {
          return true;
        }
        
        // Require authentication and valid role for protected routes
        if (pathname.startsWith("/admins") || pathname.startsWith("/candidates")) {
          return !!token && !!token.role;
        }
        
        // For other routes, require authentication
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    "/admins/:path*",
    "/candidates/:path*",
    "/",
    "/register",
  ],
};

