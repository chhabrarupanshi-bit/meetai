
import React from "react";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

import {
    SidebarProvider,
    SidebarInset,
} from "@/components/ui/sidebar";

import { DashboardSidebar } from "../modules/dashboard/ui/components/dashboard-sidebar";
import DashboardNavbar from "../modules/dashboard/ui/components/dashboard-navbar";

interface Props {
    children: React.ReactNode;
}

const Layout = async ({ children }: Props) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    return (

        <SidebarProvider>
            <DashboardSidebar session={session} />

            <SidebarInset className="!m-0 flex min-h-svh min-w-0 flex-1 flex-col overflow-x-clip bg-[#020b07] text-white">
                <DashboardNavbar />

                <main className="relative min-h-0 min-w-0 flex-1 px-4 py-6 sm:px-6 sm:py-8">
                    <div className="relative z-10 mx-auto w-full max-w-7xl min-w-0">
                        {children}
                    </div>
                </main>
            </SidebarInset>
        </SidebarProvider>

    );
};

export default Layout;
