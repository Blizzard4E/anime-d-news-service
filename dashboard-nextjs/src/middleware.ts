import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function middleware(req) {
    // You can add custom logic here if needed
    return NextResponse.next();
  },
  {
    callbacks: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      authorized: ({ req, token }) => {
        if (token) return true; // If there's a token, user is authorized
        return false; // If no token, user is not authorized
      },
    },
  },
);

// Specify which routes to protect
export const config = {
  matcher: ['/dashboard/:path*'],
};
