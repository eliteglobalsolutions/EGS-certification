import { NextResponse, type NextRequest } from "next/server";

const LOCALES = ["en", "zh"] as const;

function normalizeLocalePath(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];

  if (!first || !LOCALES.includes(first as (typeof LOCALES)[number])) {
    return {
      hasLocale: false,
      pathname: `/en${pathname === "/" ? "" : pathname}`,
    };
  }

  let index = 1;
  while (index < segments.length && LOCALES.includes(segments[index] as (typeof LOCALES)[number])) {
    index += 1;
  }

  if (index === 1) {
    return { hasLocale: true, pathname };
  }

  const normalized = `/${first}${index < segments.length ? `/${segments.slice(index).join("/")}` : ""}`;
  return {
    hasLocale: true,
    pathname: normalized,
  };
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const normalized = normalizeLocalePath(pathname);

  if (normalized.pathname !== pathname) {
    const url = request.nextUrl.clone();
    url.pathname = normalized.pathname;
    return NextResponse.redirect(url);
  }

  if (!normalized.hasLocale) {
    const url = request.nextUrl.clone();
    url.pathname = normalized.pathname;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)",
  ],
};
