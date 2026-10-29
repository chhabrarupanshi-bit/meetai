"use client";

import React from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { CreditCard, LogOut, ChevronsUpDown, Sparkles, ShieldCheck } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import GeneratedAvatar from "@/components/ui/generated-avatar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

interface DashboardUserButtonProps {
  initialSession?: any;
}

const DashboardUserButton = ({ initialSession }: DashboardUserButtonProps) => {
  const { data: clientSession } = authClient.useSession();
  const session = clientSession || initialSession;
  const router = useRouter();

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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="group relative flex w-full cursor-pointer items-center gap-3 overflow-hidden rounded-2xl border border-emerald-500/25 bg-gradient-to-r from-emerald-950/60 via-[#032014]/70 to-emerald-950/40 p-2.5 text-sm outline-none transition-all duration-300 hover:border-emerald-400/50 hover:bg-emerald-900/40 hover:shadow-[0_4px_24px_-4px_rgba(16,185,129,0.35)] focus-visible:ring-2 focus-visible:ring-emerald-400/40 active:scale-[0.98]">
        {/* Shimmer sweep effect */}
        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-emerald-200/10 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />

        {/* 3D Glowing Avatar Ring */}
        <div className="relative shrink-0">
          <div className="rounded-xl bg-gradient-to-tr from-emerald-400 via-teal-400 to-emerald-600 p-[1.5px] shadow-[0_0_14px_rgba(52,211,153,0.45)] transition-transform duration-300 group-hover:scale-105">
            {session.user.image ? (
              <Avatar className="size-9 rounded-[10px]">
                <AvatarImage src={session.user.image} alt={userName} />
              </Avatar>
            ) : (
              <GeneratedAvatar
                seed={userName}
                variant="initials"
                className="size-9 rounded-[10px]"
              />
            )}
          </div>
          {/* Online neon beacon */}
          <span className="absolute -bottom-0.5 -right-0.5 flex size-3">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-3 rounded-full border-2 border-[#02100a] bg-emerald-400 shadow-[0_0_8px_#34d399]" />
          </span>
        </div>

        {/* User Identity */}
        <div className="flex min-w-0 flex-1 flex-col text-left">
          <div className="flex items-center gap-1.5">
            <p className="truncate text-xs font-bold text-white group-hover:text-emerald-200 transition-colors">
              {userName}
            </p>
            <ShieldCheck className="size-3 text-emerald-400 shrink-0" />
          </div>
          <p className="truncate text-[10px] text-emerald-300/60 font-mono tracking-tight">
            {userEmail}
          </p>
        </div>

        {/* Caret icon with active rotate */}
        <ChevronsUpDown className="size-4 shrink-0 text-emerald-400/60 transition-all duration-300 group-hover:text-emerald-300 group-hover:scale-110" />
      </DropdownMenuTrigger>

      {/* Floating Popover Dropdown */}
      <DropdownMenuContent
        className="w-64 rounded-2xl border border-emerald-500/30 bg-[#02140c]/95 p-2 text-emerald-100 shadow-[0_16px_40px_rgba(0,0,0,0.8),0_0_24px_rgba(16,185,129,0.2)] backdrop-blur-2xl"
        align="end"
        side="right"
        sideOffset={12}
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-2.5 font-normal">
            <div className="flex items-center gap-2">
              <span className="flex size-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
              <p className="truncate text-xs font-bold text-white">{userName}</p>
            </div>
            <p className="mt-0.5 truncate font-mono text-[10px] text-emerald-300/60 pl-4">
              {userEmail}
            </p>
          </DropdownMenuLabel>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="my-1.5 bg-emerald-500/20" />

        <DropdownMenuItem
          onClick={() => router.push("/upgrades")}
          className="group/item flex cursor-pointer items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold text-emerald-200 transition-all hover:bg-emerald-500/20 hover:text-white focus:bg-emerald-500/20"
        >
          <div className="flex items-center gap-2.5">
            <CreditCard className="size-4 text-emerald-400 group-hover/item:scale-110 transition-transform" />
            <span>Billing & Subscription</span>
          </div>
          <Sparkles className="size-3.5 text-amber-400" />
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-1.5 bg-emerald-500/20" />

        <DropdownMenuItem
          onClick={onLogout}
          className="group/item flex cursor-pointer items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold text-rose-300 transition-all hover:bg-rose-500/20 hover:text-rose-200 focus:bg-rose-500/20"
        >
          <div className="flex items-center gap-2.5">
            <LogOut className="size-4 group-hover/item:translate-x-0.5 transition-transform" />
            <span>Sign out</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DashboardUserButton;