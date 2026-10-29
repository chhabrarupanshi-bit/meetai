"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import DashboardUserButton from "./dashboard-user-button";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Video, Bot, Star, ChevronRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardSidebarProps {
  session?: any;
}

interface NavItem {
  icon: LucideIcon;
  label: string;
  href: string;
  badge?: string;
}

const mainSection: NavItem[] = [
  {
    icon: Video,
    label: "Meetings",
    href: "/meetings",
  },
  {
    icon: Bot,
    label: "Agents",
    href: "/agents",
  },
];

const accountSection: NavItem[] = [
  {
    icon: Star,
    label: "Upgrade",
    href: "/upgrades",
    badge: "PRO",
  },
];

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="px-3 pb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#00e599]">
    {children}
  </p>
);

export const DashboardSidebar = ({ session }: DashboardSidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const renderItems = (items: NavItem[]) => (
    <SidebarMenu className="gap-2">
      {items.map((item) => {
        const isActive = pathname === item.href;

        return (
          <SidebarMenuItem key={item.href}>
            <SidebarMenuButton
              onClick={() => router.push(item.href)}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "group relative flex h-12 w-full cursor-pointer items-center gap-3.5 rounded-xl px-4 text-sm font-semibold transition-all duration-200",
                isActive
                  ? "border border-[#00d084]/40 bg-[#004d34] text-white shadow-[0_0_18px_rgba(0,208,132,0.18)]"
                  : "border border-transparent text-emerald-100/80 hover:border-[#00d084]/25 hover:bg-[#003825]/60 hover:text-white"
              )}
            >
              <item.icon
                className={cn(
                  "size-5 shrink-0 transition-colors",
                  isActive
                    ? "text-[#00e599]"
                    : "text-emerald-300/80 group-hover:text-[#00e599]"
                )}
              />

              <span className="flex-1 truncate text-left text-sm font-medium">
                {item.label}
              </span>

              {item.badge && (
                <span className="mr-1 rounded-full bg-[#f59e0b] px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-black shadow-sm">
                  {item.badge}
                </span>
              )}

              <ChevronRight
                className={cn(
                  "size-4 shrink-0 transition-transform group-hover:translate-x-0.5",
                  isActive ? "text-[#00e599]" : "text-emerald-400/50"
                )}
              />
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );

  return (
    <Sidebar
      style={
        {
          "--sidebar": "#021c14",
          "--sidebar-foreground": "#ecfdf5",
          "--sidebar-border": "rgba(0, 208, 132, 0.15)",
        } as React.CSSProperties
      }
      className="w-72 border-r border-[#00d084]/20 bg-[#021811] text-emerald-50 [&_[data-sidebar=sidebar]]:bg-[#021811]"
    >
      {/* Brand Logo Header - Improved Logo Styling */}
      {/* Brand Logo Header - Rich Dark Luxury Styling */}
      <SidebarHeader className="px-5 pt-6 pb-4">
        <Link
          href="/"
          className="group flex items-center gap-3.5 transition-transform duration-200 hover:scale-[1.02]"
          suppressHydrationWarning
        >
          {/* Dark Forest Green Logo Box with Neon Accent */}
          <div className="relative flex size-12 shrink-0 items-center justify-center rounded-2xl border border-[#00d084]/30 bg-gradient-to-b from-[#012b1d] to-[#01140e] p-2 shadow-[0_4px_20px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(0,229,153,0.2)] transition-all duration-300 group-hover:border-[#00e599]/60 group-hover:shadow-[0_0_25px_rgba(0,229,153,0.35)]">
            {/* Subtle glow layer behind logo */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[#00e599]/10 opacity-40 blur-[4px] group-hover:opacity-75 transition-opacity" />
            
            <Image
              src="/logo.png"
              alt="Logo"
              width={28}
              height={28}
              className="relative z-10 size-7 object-contain drop-shadow-[0_0_10px_rgba(0,229,153,0.5)] transition-transform duration-300 group-hover:scale-105"
              priority
            />
          </div>

          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight text-white drop-shadow-sm">
              Meet.AI
            </span>
            <span className="text-[10px] font-bold tracking-[0.16em] text-emerald-300/60 uppercase">
              AI MEETINGS. SIMPLIFIED.
            </span>
          </div>
        </Link>
      </SidebarHeader>

      {/* Main Navigation */}
      <SidebarContent className="px-3.5 pt-2">
        <SidebarGroup className="p-0">
          <SectionLabel>MAIN</SectionLabel>
          <SidebarGroupContent className="pt-1">
            {renderItems(mainSection)}
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Subtle Grid Divider before Account */}
        <div className="my-5 px-1">
          <div className="relative h-px w-full bg-gradient-to-r from-transparent via-[#00e599]/30 to-transparent">
            {/* Center neon glow node */}
            <span className="absolute left-1/2 top-1/2 size-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00e599] shadow-[0_0_8px_#00e599]" />
          </div>
        </div>

        {/* Account Section */}
        <SidebarGroup className="p-0">
          <SectionLabel>ACCOUNT</SectionLabel>
          <SidebarGroupContent className="pt-1">
            {renderItems(accountSection)}
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Upgrade to Pro Card */}
        <div className="mt-6 rounded-2xl border border-[#00d084]/35 bg-[#002d20]/80 p-4 shadow-[0_0_24px_rgba(0,208,132,0.12)]">
          <div className="flex items-center gap-2.5 mb-2">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#00a368] text-white shadow-sm">
              <Star className="size-4 fill-white text-white" />
            </span>
            <span className="text-sm font-bold text-white">Upgrade to Pro</span>
          </div>

          <p className="text-[12px] leading-relaxed text-emerald-200/75 mb-4">
            Unlock more AI agents, meetings, priority support and more.
          </p>

          <button
            onClick={() => router.push("/upgrades")}
            className="flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-[#00e599] py-2.5 text-xs font-bold text-[#01261a] transition-all hover:bg-[#00f5a4] hover:shadow-[0_0_18px_rgba(0,229,153,0.45)] active:scale-[0.98]"
          >
            <span>Explore Plans</span>
            <ChevronRight className="size-4 stroke-[2.5]" />
          </button>
        </div>
      </SidebarContent>

      {/* Bottom Profile Footer */}
      <SidebarFooter className="border-t border-[#00d084]/15 bg-[#01140e] p-3.5">
        <DashboardUserButton initialSession={session} />
      </SidebarFooter>
    </Sidebar>
  );
};