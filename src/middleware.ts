import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["pt", "en", "es"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Exclude static assets, API paths, and internal Next.js files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Check if the URL has a locale prefix
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    // If it's the default locale (pt), redirect /pt or /pt/... to / or /...
    // to maintain a clean URL hierarchy.
    if (pathname === "/pt") {
      const newUrl = request.nextUrl.clone();
      newUrl.pathname = "/";
      return NextResponse.redirect(newUrl);
    }
    if (pathname.startsWith("/pt/")) {
      const newUrl = request.nextUrl.clone();
      newUrl.pathname = pathname.substring(3);
      return NextResponse.redirect(newUrl);
    }
    return NextResponse.next();
  }

  // If there's no locale prefix, rewrite it to /pt internally.
  // This keeps the URL as `/` but serves the Portuguese locale code from the [locale] folder.
  const url = request.nextUrl.clone();
  url.pathname = `/pt${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    // Match all paths except api routes, _next/static, _next/image, favicon.ico, etc.
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|manifest.json|icon-.*).*)",
  ],
};
