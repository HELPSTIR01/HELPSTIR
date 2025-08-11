import { NextResponse, userAgent } from "next/server";
import type { NextRequest } from "next/server";

// Set pathname were middleware will be executed
export const config = {
  matcher: "/",
};

export default function middleware(request: NextRequest) {
  // Parse user agent
  const { device } = userAgent(request);
  const viewport = device.type === "mobile" ? "mobile" : "desktop";
  const headers = new Headers(request.headers);
  headers.set("viewport", viewport);

  return NextResponse.next({
    request: {
      headers,
    },
  });
}
