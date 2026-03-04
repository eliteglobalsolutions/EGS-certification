<<<<<<< HEAD
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
=======
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function unauthorizedResponse() {
  return new NextResponse('Authentication required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="admin"' },
  });
}

export function proxy(req: NextRequest) {
  const auth = req.headers.get('authorization');
  if (!auth?.startsWith('Basic ')) return unauthorizedResponse();

  const raw = atob(auth.replace('Basic ', ''));
  const [username, password] = raw.split(':');

  if (username !== 'admin' || password !== process.env.ADMIN_PASSWORD) {
    return unauthorizedResponse();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
>>>>>>> sync-export
