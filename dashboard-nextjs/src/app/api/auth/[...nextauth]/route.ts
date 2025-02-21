import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

declare module 'next-auth' {
  interface User {
    id?: number;
    username: string;
    access?: string;
    refresh?: string;
  }

  interface Session {
    user: User;
    access?: string;
    refresh?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    access?: string;
    refresh?: string;
    username?: string;
  }
}

const OPTIONS: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error('Username and password required');
        }

        try {
          const apiUrl = process.env.API_URL;
          if (!apiUrl) {
            throw new Error('API_URL not configured');
          }

          const res = await fetch(`${apiUrl}/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify({
              username: credentials.username,
              password: credentials.password,
            }),
            cache: 'no-store',
          });

          if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
          }

          const response = await res.json();

          if (!response.access || !response.refresh) {
            throw new Error('Invalid response format from server');
          }

          return {
            // id: credentials.username,
            username: credentials.username,
            access: response.access,
            refresh: response.refresh,
          };
        } catch (error) {
          console.error('Auth error:', error);
          throw new Error(error instanceof Error ? error.message : 'Authentication failed');
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.access = user.access;
        token.refresh = user.refresh;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.access = token.access;
        session.refresh = token.refresh;
        session.user.username = token.username as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(OPTIONS);

export { handler as GET, handler as POST, OPTIONS };
