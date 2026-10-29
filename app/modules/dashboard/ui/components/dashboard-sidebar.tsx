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
import { Separator } from "@/components/ui/separator";
import { Bot, Sparkles, Video, ChevronRight, Zap } from "lucide-react";
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

const firstSection: NavItem[] = [
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

const secondSection: NavItem[] = [
  {
    icon: Sparkles,
    label: "Upgrades",
    href: "/upgrades",
    badge: "PRO",
  },
];

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400/50">
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
        const isUpgrade = Boolean(item.badge);

        return (
          <SidebarMenuItem key={item.href}>
            <SidebarMenuButton
              onClick={() => router.push(item.href)}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "group/item relative flex h-11 w-full cursor-pointer items-center gap-3 overflow-hidden rounded-xl px-3 text-sm font-medium transition-all duration-300",
                isActive
                  ? "bg-gradient-to-r from-emerald-500/25 via-emerald-500/10 to-transparent text-white ring-1 ring-emerald-400/40 shadow-[0_0_24px_-4px_rgba(16,185,129,0.35)] font-semibold"
                  : "text-emerald-100/70 hover:translate-x-1.5 hover:bg-emerald-500/15 hover:text-white hover:ring-1 hover:ring-emerald-400/30 active:scale-[0.98]"
              )}
            >
              {/* Neon Glow Left Indicator */}
              <span
                className={cn(
                  "absolute left-0 top-1/2 -translate-y-1/2 w-1 rounded-r-full bg-emerald-400 transition-all duration-300",
                  isActive
                    ? "h-7 opacity-100 shadow-[0_0_12px_#34d399]"
                    : "h-0 opacity-0 group-hover/item:h-4 group-hover/item:opacity-80"
                )}
              />

              {/* Shimmer sweep animation on hover */}
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-emerald-200/10 to-transparent transition-transform duration-700 ease-out group-hover/item:translate-x-full" />

              {/* Glowing Icon Tile */}
              <div
                className={cn(
                  "relative flex size-8 shrink-0 items-center justify-center rounded-lg border transition-all duration-300",
                  isActive
                    ? "border-emerald-400/50 bg-emerald-500/20 text-emerald-300 shadow-[0_0_14px_rgba(52,211,153,0.35)]"
                    : isUpgrade
                    ? "border-amber-400/40 bg-amber-500/10 text-amber-300 group-hover/item:scale-110 group-hover/item:border-amber-400 group-hover/item:shadow-[0_0_12px_rgba(251,191,36,0.35)]"
                    : "border-emerald-500/20 bg-emerald-950/60 text-emerald-300/80 group-hover/item:scale-110 group-hover/item:border-emerald-400/50 group-hover/item:bg-emerald-500/20 group-hover/item:text-emerald-200 group-hover/item:shadow-[0_0_12px_rgba(16,185,129,0.25)]"
                )}
              >
                <item.icon className="size-4.5 stroke-[2.2]" />
              </div>

              {/* Label */}
              <span className="flex-1 truncate tracking-tight">{item.label}</span>

              {/* Pro Badge */}
              {item.badge && (
                <span className="ml-auto inline-flex items-center rounded-full bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-black shadow-[0_0_12px_rgba(251,191,36,0.4)] transition-transform duration-300 group-hover/item:scale-105">
                  {item.badge}
                </span>
              )}

              {/* Active Pulse Pill */}
              {isActive && !item.badge && (
                <span className="relative ml-auto flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                </span>
              )}
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
          "--sidebar": "#03140d",
          "--sidebar-foreground": "#ecfdf5",
          "--sidebar-border": "rgba(16, 185, 129, 0.18)",
        } as React.CSSProperties
      }
      className="border-r border-emerald-500/20 bg-gradient-to-b from-[#03160e] via-[#02100a] to-[#010805] text-emerald-100 shadow-2xl [&_[data-sidebar=sidebar]]:bg-transparent"
    >
      {/* Dynamic Ambient Background Glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-emerald-500/20 blur-[75px]" />
        <div className="absolute -bottom-20 -right-16 h-60 w-60 rounded-full bg-teal-500/15 blur-[85px]" />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #34d399 1px, transparent 0)",
            backgroundSize: "22px 22px",
          }}
        />
      </div>

      {/* Brand Header */}
      <SidebarHeader className="relative z-10 px-4 py-4">
        <Link
          href="/"
          className="group flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-950/30 p-2 transition-all duration-300 hover:border-emerald-400/40 hover:bg-emerald-900/30 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] active:scale-95"
          suppressHydrationWarning
        >
          <div className="relative flex size-10 shrink-0 items-center justify-center rounded-xl border border-emerald-400/40 bg-gradient-to-br from-emerald-400/30 via-emerald-900/40 to-transparent p-1.5 shadow-[0_0_15px_rgba(16,185,129,0.35)] transition-all duration-300 group-hover:scale-105 group-hover:border-emerald-400/70 group-hover:shadow-[0_0_22px_rgba(52,211,153,0.5)]">
            <Image
              src="/logo.png"
              alt="Logo"
              width={26}
              height={26}
              className="h-auto w-auto drop-shadow-[0_0_6px_rgba(52,211,153,0.5)]"
              priority
            />
          </div>

          <div className="flex flex-col">
            <span className="bg-gradient-to-r from-white via-emerald-100 to-emerald-300 bg-clip-text text-base font-bold tracking-tight text-transparent transition-all group-hover:from-emerald-200 group-hover:to-teal-300">
              Meet.AI
            </span>
            <span className="mt-0.5 inline-flex w-fit items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2 py-0.5 text-[9px] font-bold tracking-wider text-emerald-300 uppercase">
              <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#34d399]" />
              Workspace
            </span>
          </div>
        </Link>
      </SidebarHeader>

      <div className="relative z-10 px-4 py-1">
        <Separator className="bg-gradient-to-r from-transparent via-emerald-500/25 to-transparent" />
      </div>

      {/* Main Navigation */}
      <SidebarContent className="relative z-10 px-3 pt-3">
        <SidebarGroup className="p-0">
          <SectionLabel>Menu</SectionLabel>
          <SidebarGroupContent className="pt-0.5">
            {renderItems(firstSection)}
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="my-3 px-2">
          <Separator className="bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
        </div>

        {/* Secondary Section */}
        <SidebarGroup className="p-0">
          <SectionLabel>Account</SectionLabel>
          <SidebarGroupContent className="pt-0.5">
            {renderItems(secondSection)}
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Interactive Upgrade Glow Card */}
        <div className="mt-6 mx-1 rounded-2xl border border-emerald-500/25 bg-gradient-to-b from-emerald-950/40 to-[#02140c]/60 p-3.5 shadow-[0_4px_24px_-4px_rgba(16,185,129,0.15)] relative overflow-hidden group">
          <div className="pointer-events-none absolute -right-6 -top-6 size-20 rounded-full bg-emerald-500/15 blur-xl group-hover:bg-emerald-400/25 transition-all duration-500" />
          <div className="flex items-center gap-2 mb-1.5">
            <span className="flex size-6 items-center justify-center rounded-lg bg-emerald-400/20 text-emerald-300">
              <Zap className="size-3.5 fill-emerald-300" />
            </span>
            <span className="text-xs font-bold text-white">Upgrade to Pro</span>
          </div>
          <p className="text-[11px] text-emerald-200/60 leading-relaxed mb-3">
            Unlimited AI agent meetings, priority insights & analytics.
          </p>
          <button
            onClick={() => router.push("/upgrades")}
            className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 py-1.5 text-xs font-bold text-black shadow-[0_0_16px_rgba(52,211,153,0.35)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_22px_rgba(52,211,153,0.5)] active:scale-95 cursor-pointer"
          >
            <span>Explore Plans</span>
            <ChevronRight className="size-3.5" />
          </button>
        </div>
      </SidebarContent>

      {/* User Footer Profile */}
      <SidebarFooter className="relative z-10 border-t border-emerald-500/20 bg-[#020e08]/90 p-3 backdrop-blur-xl">
        <DashboardUserButton initialSession={session} />
      </SidebarFooter>
    </Sidebar>
  );
};