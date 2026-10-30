"use client";

import React from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { CreditCard, LogOut, ChevronRight, Star } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarImage } from "@/components/ui/avatar";

interface DashboardUserButtonProps {
  initialSession?: any;
}

const DashboardUserButton = ({ initialSession }: DashboardUserButtonProps) => {
  const { data: clientSession } = authClient.useSession();
  const session = clientSession || initialSession;
  const router = useRouter();
  const { isMobile } = useSidebar();

  const onLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/auth/sign-in");
          router.refresh();
        },
      },
    });
  };

  if (!session?.user) {
    return null;
  }

  const userName = session.user.name || "User";
  const userEmail = session.user.email || "";

  // User ke initials extract karne ke liye
  const initials = userName
    .split(" ")
    .map((part: string) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="group flex w-full cursor-pointer items-center gap-3 rounded-xl p-1.5 outline-none transition-all hover:bg-[#002d20] focus:outline-none">
        {/* Solid Bright Green Circle Avatar */}
        <div className="relative shrink-0">
          {session.user.image ? (
            <Avatar className="size-11 rounded-full border-2 border-[#00e599]">
              <AvatarImage src={session.user.image} alt={userName} />
            </Avatar>
          ) : (
            <div className="flex size-11 items-center justify-center rounded-full bg-gradient-to-tr from-[#00b06b] to-[#00e599] text-base font-bold text-black shadow-[0_0_14px_rgba(0,229,153,0.3)]">
              {initials}
            </div>
          )}
        </div>

        {/* User Info */}
        <div className="flex min-w-0 flex-1 flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span className="truncate text-sm font-bold text-white group-hover:text-emerald-200">
              {userName}
            </span>
            {/* Neon Green Active Dot */}
            <span className="size-2 rounded-full bg-[#00e599] shadow-[0_0_6px_#00e599]" />
          </div>
          <span className="truncate text-[11px] text-emerald-300/70">
            {userEmail}
          </span>
        </div>

        {/* Right Arrow */}
        <ChevronRight className="size-4 shrink-0 text-emerald-400/70 transition-transform group-hover:translate-x-0.5 group-hover:text-[#00e599]" />
      </DropdownMenuTrigger>

      {/* Popover Dropdown: Mobile par TOP, Desktop par RIGHT */}
      <DropdownMenuContent
        className="z-50 w-64 rounded-2xl border border-[#00d084]/30 bg-[#021e14] p-2 text-emerald-100 shadow-[0_12px_40px_rgba(0,0,0,0.8)] backdrop-blur-xl"
        align={isMobile ? "center" : "end"}
        side={isMobile ? "top" : "right"}
        sideOffset={isMobile ? 12 : 10}
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className="rounded-xl border border-emerald-500/20 bg-[#003826] p-2.5 font-normal">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-[#00e599]" />
              <p className="truncate text-xs font-bold text-white">{userName}</p>
            </div>
            <p className="mt-0.5 truncate text-[11px] text-emerald-300/70 pl-4">
              {userEmail}
            </p>
          </DropdownMenuLabel>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="my-1.5 bg-emerald-900/40" />

        <DropdownMenuItem
          onClick={() => router.push("/upgrades")}
          className="flex cursor-pointer items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold text-emerald-200 transition-colors hover:bg-[#00422d] hover:text-white"
        >
          <div className="flex items-center gap-2.5">
            <CreditCard className="size-4 text-[#00e599]" />
            <span>Billing & Subscription</span>
          </div>
          <Star className="size-3.5 fill-[#f59e0b] text-[#f59e0b]" />
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-1.5 bg-emerald-900/40" />

        <DropdownMenuItem
          onClick={onLogout}
          className="flex cursor-pointer items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold text-rose-300 transition-colors hover:bg-rose-500/20 hover:text-rose-200"
        >
          <div className="flex items-center gap-2.5">
            <LogOut className="size-4" />
            <span>Sign out</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DashboardUserButton;