import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const token = request.cookies.get('nexus_auth_token')?.value;
  const role = request.cookies.get('nexus_user_role')?.value;
  const { pathname } = request.nextUrl;

  // Protect Admin Dashboard (/admin)
  if (pathname.startsWith('/admin')) {
    if (!token || role !== 'admin') {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', '/admin');
      loginUrl.searchParams.set('error', 'admin_access_required');
      return NextResponse.redirect(loginUrl);
    }
  }

  // Protect Account Profile (/account)
  if (pathname.startsWith('/account')) {
    if (!token) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', '/account');
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/account/:path*']
};
