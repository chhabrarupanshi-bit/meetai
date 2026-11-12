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
  iconColor: string;
  iconBg: string;
  glowColor: string;
  hoverGlow: string;
  activeStyle: string;
}

const mainSection: NavItem[] = [
  {
    icon: Video,
    label: "Meetings",
    href: "/meetings",
    iconColor: "text-cyan-300",
    iconBg: "bg-cyan-500/15 border-cyan-400/30",
    glowColor: "#22d3ee",
    hoverGlow: "hover:border-cyan-400/50 hover:bg-cyan-500/15 hover:shadow-[0_0_24px_rgba(34,211,238,0.25)]",
    activeStyle: "border-cyan-400/60 bg-gradient-to-r from-cyan-950/60 via-cyan-900/30 to-transparent text-white shadow-[0_0_24px_rgba(34,211,238,0.3)]",
  },
  {
    icon: Bot,
    label: "Agents",
    href: "/agents",
    iconColor: "text-violet-300",
    iconBg: "bg-violet-500/15 border-violet-400/30",
    glowColor: "#a855f7",
    hoverGlow: "hover:border-violet-400/50 hover:bg-violet-500/15 hover:shadow-[0_0_24px_rgba(168,85,247,0.25)]",
    activeStyle: "border-violet-400/60 bg-gradient-to-r from-violet-950/60 via-violet-900/30 to-transparent text-white shadow-[0_0_24px_rgba(168,85,247,0.3)]",
  },
];

const accountSection: NavItem[] = [
  {
    icon: Star,
    label: "Upgrade",
    href: "/upgrades",
    badge: "PRO",
    iconColor: "text-amber-300",
    iconBg: "bg-amber-500/15 border-amber-400/30",
    glowColor: "#f59e0b",
    hoverGlow: "hover:border-amber-400/50 hover:bg-amber-500/15 hover:shadow-[0_0_24px_rgba(245,158,11,0.25)]",
    activeStyle: "border-amber-400/60 bg-gradient-to-r from-amber-950/60 via-amber-900/30 to-transparent text-white shadow-[0_0_24px_rgba(245,158,11,0.3)]",
  },
];

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="px-3 pb-2 text-[10.5px] font-bold uppercase tracking-[0.18em] text-[#00e599]/70 font-mono">
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
                "group/item relative flex h-11 w-full cursor-pointer select-none items-center gap-3 overflow-hidden rounded-xl border px-3 text-sm font-semibold transition-all duration-300 ease-out",
                isActive
                  ? item.activeStyle
                  : cn(
                      "border-white/5 bg-white/[0.02] text-zinc-300 backdrop-blur-xs",
                      item.hoverGlow,
                      "hover:translate-x-1.5 hover:text-white",
                      "active:scale-95 active:bg-white/10"
                    )
              )}
            >
              {/* Left Accent Bar */}
              <span
                className={cn(
                  "absolute left-0 top-1/2 -translate-y-1/2 w-1 rounded-r-full transition-all duration-300",
                  isActive
                    ? "h-6 opacity-100"
                    : "h-0 opacity-0 group-hover/item:h-4 group-hover/item:opacity-90"
                )}
                style={{
                  backgroundColor: item.glowColor,
                  boxShadow: `0 0 12px ${item.glowColor}`,
                }}
              />

              {/* Shimmer sweep */}
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 ease-out group-hover/item:translate-x-full" />

              {/* Icon */}
              <div
                className={cn(
                  "relative flex size-8 shrink-0 items-center justify-center rounded-lg border transition-all duration-300 shadow-sm",
                  item.iconBg,
                  "group-hover/item:scale-105"
                )}
              >
                <item.icon
                  className={cn(
                    "size-4 stroke-[2.2] transition-transform duration-300 group-hover/item:rotate-3",
                    item.iconColor
                  )}
                />
              </div>

              {/* Label */}
              <span className="flex-1 truncate text-left text-[13px] font-semibold tracking-wide text-zinc-200 transition-colors group-hover/item:text-white">
                {item.label}
              </span>

              {/* PRO Badge */}
              {item.badge && (
                <span className="mr-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-black">
                  {item.badge}
                </span>
              )}

              {/* Chevron */}
              <ChevronRight
                className={cn(
                  "size-3.5 shrink-0 transition-all duration-300 group-hover/item:translate-x-1",
                  isActive ? "text-white" : "text-zinc-500 group-hover/item:text-white"
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
      collapsible="offcanvas"
      style={
        {
          "--sidebar": "#021811",
          "--sidebar-foreground": "#ecfdf5",
          "--sidebar-border": "rgba(0, 208, 132, 0.2)",
        } as React.CSSProperties
      }
      className="border-r border-[#00d084]/20 !bg-[#021811] text-emerald-50 h-screen"
    >
      {/* Brand Logo Header */}
      <SidebarHeader className="flex h-16 shrink-0 items-center border-b border-[#00d084]/20 !bg-[#021811] px-4 py-2">
        <Link
          href="/"
          className="group flex w-full items-center gap-3 transition-transform duration-200 hover:scale-[1.01]"
          suppressHydrationWarning
        >
          <div className="relative flex size-10 shrink-0 items-center justify-center rounded-xl border border-[#00d084]/35 bg-gradient-to-b from-[#012b1d] to-[#01140e] p-2 shadow-md transition-all group-hover:border-[#00e599]/70">
            <Image
              src="/logo.png"
              alt="Logo"
              width={22}
              height={22}
              className="relative z-10 size-5.5 object-contain drop-shadow-[0_0_8px_rgba(0,229,153,0.5)]"
              priority
            />
          </div>

          <div className="flex min-w-0 flex-col">
            <span className="truncate text-base font-extrabold tracking-tight text-white group-hover:text-emerald-200 leading-tight">
              Meet.AI
            </span>
            <span className="truncate text-[9.5px] font-bold tracking-[0.14em] text-emerald-300/65 uppercase mt-0.5">
              AI MEETINGS. SIMPLIFIED.
            </span>
          </div>
        </Link>
      </SidebarHeader>

      {/* Content - flex-1 ensure karta hai ki footer hamesha bottom me rahe */}
      <SidebarContent className="!bg-[#021811] px-3 pt-3 flex-1 overflow-y-auto">
        <SidebarGroup className="p-0">
          <SectionLabel>MAIN</SectionLabel>
          <SidebarGroupContent className="pt-1">
            {renderItems(mainSection)}
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="my-4 px-1">
          <div className="relative h-px w-full bg-gradient-to-r from-transparent via-[#00e599]/30 to-transparent">
            <span className="absolute left-1/2 top-1/2 size-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00e599]" />
          </div>
        </div>

        <SidebarGroup className="p-0">
          <SectionLabel>ACCOUNT</SectionLabel>
          <SidebarGroupContent className="pt-1">
            {renderItems(accountSection)}
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Upgrade Card */}
        <div className="group/card mt-4 rounded-xl border border-[#00d084]/35 bg-[#002d20]/80 p-3.5 shadow-sm transition-all hover:border-[#00e599]/60">
          <div className="mb-1.5 flex items-center gap-2">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#00a368] text-white">
              <Star className="size-3.5 fill-white text-white" />
            </span>
            <span className="text-xs font-bold text-white">Upgrade to Pro</span>
          </div>

          <p className="mb-3 text-[11px] leading-relaxed text-emerald-200/75">
            Unlock more AI agents, meetings and priority support.
          </p>

          <button
            onClick={() => router.push("/upgrades")}
            className="flex w-full cursor-pointer items-center justify-center gap-1 rounded-lg bg-[#00e599] py-2 text-[11px] font-bold text-[#01261a] transition-all hover:bg-[#00f5a4]"
          >
            <span>Explore Plans</span>
            <ChevronRight className="size-3.5 stroke-[2.5]" />
          </button>
        </div>
      </SidebarContent>

      {/* Footer - mt-auto se hamesha perfectly bottom pinned rahega */}
      <SidebarFooter className="mt-auto border-t border-[#00d084]/15 !bg-[#01140e] p-3">
        <DashboardUserButton initialSession={session} />
      </SidebarFooter>
    </Sidebar>
  );}