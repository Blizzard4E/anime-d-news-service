import './globals.css';
import type { Metadata } from 'next';
import LayoutProvider from '@/components/layout';
import { getServerSession } from 'next-auth';
import { OPTIONS } from './api/auth/[...nextauth]/route';

export const metadata: Metadata = {
  title: 'Anime D Verse',
  description: 'Swag Dashboard',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(OPTIONS);

  return (
    <html lang='en'>
      <body>
        <LayoutProvider session={session}>{children}</LayoutProvider>
      </body>
    </html>
  );
}
