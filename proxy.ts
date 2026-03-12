import { NextResponse, type NextRequest } from "next/server";

const INTERNAL_LOCALES = ["en", "zh"] as const;
const PUBLIC_CN_PREFIX = "cn";

function normalizeLocalePath(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];

  if (!first) {
    return { type: "rewrite" as const, pathname: "/en" };
  }

  if (first === PUBLIC_CN_PREFIX) {
    return {
      type: "rewrite" as const,
      pathname: `/zh${segments.length > 1 ? `/${segments.slice(1).join("/")}` : ""}`,
    };
  }

  if (INTERNAL_LOCALES.includes(first as (typeof INTERNAL_LOCALES)[number])) {
    return { type: "block" as const };
  }

  return {
    type: "rewrite" as const,
    pathname: `/en${pathname === "/" ? "" : pathname}`,
  };
}

function resolveRequestLocale(pathname: string) {
  return pathname === "/cn" || pathname.startsWith("/cn/") ? "zh" : "en";
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const normalized = normalizeLocalePath(pathname);
  const locale = resolveRequestLocale(pathname);
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-egs-locale", locale);
  requestHeaders.set("x-egs-html-lang", locale === "zh" ? "zh-CN" : "en");

  if (normalized.type === "block") {
    return new NextResponse("Not Found", { status: 404 });
  }

  if (normalized.pathname !== pathname) {
    const url = request.nextUrl.clone();
    url.pathname = normalized.pathname;
    return NextResponse.rewrite(url, {
      request: {
        headers: requestHeaders,
      },
    });
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    "/((?!api|_next|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)",
  ],
};
