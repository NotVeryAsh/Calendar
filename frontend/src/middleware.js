import { NextResponse } from 'next/server';

export function middleware(request) {

    const isLoggedIn = request.cookies.get('token')?.value;
    const isLoginPages = request.nextUrl.pathname === '/' || request.nextUrl.pathname === '/login'
 
    if (isLoggedIn && isLoginPages) {
        return NextResponse.redirect(new URL('/calendar', request.url));
    }

    if (!isLoggedIn && !isLoginPages) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: "/((?!api|static|.*\\..*|_next).*)",
};