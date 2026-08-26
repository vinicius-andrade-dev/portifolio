import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["pt", "en", "es"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Exclui arquivos estáticos, rotas de API e arquivos internos do Next.js
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Verifica se a URL tem um prefixo de idioma
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    // Redireciona /pt ou /pt/... para / ou /...
    // para manter uma hierarquia de URL limpa.
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

  // Se não houver prefixo de idioma, reescreve para /pt internamente.
  // Isso mantém a URL como `/` mas serve o código de idioma português da pasta [locale].
  const url = request.nextUrl.clone();
  url.pathname = `/pt${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    // Otimizado para evitar conflitos com novos caminhos do Next.js 16+ (como /_vercel)
    // Mantém as exclusões originais necessárias
    "/((?!api|_next/static|_next/image|_vercel|favicon.ico|sitemap.xml|robots.txt|manifest.json|icon-.*).*)",
  ],
};
