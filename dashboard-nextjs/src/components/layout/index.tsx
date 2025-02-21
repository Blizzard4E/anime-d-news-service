'use client';
import React from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import theme from '@/theme';
import { SessionProvider } from 'next-auth/react';
import type { Session } from 'next-auth';

interface LayoutProviderProps {
  children: React.ReactNode;
  session: Session | null;
}

const queryClient = new QueryClient();

const LayoutProvider = ({ children, session }: LayoutProviderProps) => {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <AppRouterCacheProvider options={{ key: 'css' }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default LayoutProvider;
