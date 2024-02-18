
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from "jwt-decode";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    
    if (pathname.startsWith('/login') || pathname.startsWith('/register') ) {
        return NextResponse.next();
    }
    
    let token = request.cookies.get('token');

    if(!token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    const decoded = jwtDecode(token.value);
    console.log(decoded);
    
    const expiration = decoded?.exp ?? 0;

    if (expiration < Date.now()) {
        request.cookies.delete('token');
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (decoded?.issuer !== process.env.APP_NAME) {
        request.cookies.delete('token');
        return NextResponse.redirect(new URL('/login', request.url));
    }


    return NextResponse.next();
}

export const config = {
    matcher: [
      {
        source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
        missing: [
          { type: 'header', key: 'next-router-prefetch' },
          { type: 'header', key: 'purpose', value: 'prefetch' },
        ],
      },
    ],
  }