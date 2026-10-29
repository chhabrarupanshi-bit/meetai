import React from 'react';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { SidebarProvider } from '@/components/ui/sidebar';
import { DashboardSidebar } from '../modules/dashboard/ui/components/dashboard-sidebar';

interface Props {
  children: React.ReactNode;
}

const Layout = async ({ children }: Props) => {
  // Server-side session fetch
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <SidebarProvider>
      <DashboardSidebar session={session} />
      <main className="flex-1 min-h-screen bg-[#020b07] text-white p-8">
        {children}
      </main>
    </SidebarProvider>
  );
};

export default Layout;