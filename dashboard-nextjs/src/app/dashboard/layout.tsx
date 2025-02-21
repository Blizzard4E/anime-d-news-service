import DashboardDrawer from '@/components/Drawer';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Dashboard',
  description: 'Dashboard',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <DashboardDrawer>{children}</DashboardDrawer>;
}
