import React from "react";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

import {
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar";

import { DashboardSidebar } from "../modules/dashboard/ui/components/dashboard-sidebar";
import DashboardNavbar from "../modules/dashboard/ui/components/dashboard-navbar";

export const instant = false;

interface Props {
  children: React.ReactNode;
}

const Layout = async ({ children }: Props) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "17.5rem",
        } as React.CSSProperties
      }
    >
      <DashboardSidebar session={session} />

      <SidebarInset className="flex min-h-svh min-w-0 flex-1 flex-col overflow-x-hidden bg-[#0F0E15] text-white">
        <DashboardNavbar />

        <main className="relative min-h-0 min-w-0 flex-1 bg-[radial-gradient(ellipse_75%_50%_at_15%_0%,rgba(139,92,246,0.10),transparent_60%),radial-gradient(ellipse_75%_50%_at_85%_0%,rgba(16,185,129,0.08),transparent_60%)] px-4 py-6 sm:px-6">
          <div className="relative z-10 mx-auto w-full max-w-7xl min-w-0">
            {children}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Layout;