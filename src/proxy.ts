import { type NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE = "nextpay_session";
const PUBLIC_PATHS = ["/login", "/onboarding", "/api/health"];

/** Quick check only: no cookie means sign in. Pages still verify the session. */
export function proxy(request: NextRequest) {
  const isPublic = PUBLIC_PATHS.some((path) =>
    request.nextUrl.pathname.startsWith(path),
  );
  if (isPublic || request.cookies.has(SESSION_COOKIE))
    return NextResponse.next();
  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|manifest.webmanifest|icons/).*)",
  ],
};
