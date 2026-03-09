import { NextResponse, type NextRequest } from "next/server";

  const LOCALES = ["en", "zh"];

  export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const hasLocale = LOCALES.some(
      (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/
  `)
    );

    if (!hasLocale) {
      const url = request.nextUrl.clone();
      url.pathname = `/en${pathname === "/" ? "" : pathname}`;
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  export const config = {
    matcher: [
      "/((?!api|_next|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)",
    ],
  };