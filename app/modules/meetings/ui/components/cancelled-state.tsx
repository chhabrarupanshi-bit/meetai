import React from "react";
import Link from "next/link";
import { BanIcon, ArrowLeft, CalendarX2 } from "lucide-react";

import { Button } from "@/components/ui/button";

const CancelledState = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-gradient-to-b from-[#071612] via-[#03130c] to-[#020b07] px-6 py-14 min-h-[430px] flex flex-col items-center justify-center text-center shadow-2xl shadow-black/40">
      {/* Subtle Top Radial Glow */}
      <div className="pointer-events-none absolute -top-24 h-56 w-56 rounded-full bg-rose-500/10 blur-3xl" />

      {/* Status Pill */}
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-rose-500/25 bg-rose-500/10 px-3.5 py-1 text-xs font-medium text-rose-300">
        <span className="size-1.5 rounded-full bg-rose-400" />
        <span>Session Cancelled</span>
      </div>

      {/* Custom Dark-Mode Cancelled Icon Card */}
      <div className="relative mb-6 flex items-center justify-center">
        <div className="absolute -inset-2 rounded-2xl bg-rose-500/15 blur-lg" />
        <div className="relative flex size-16 items-center justify-center rounded-2xl border border-rose-500/25 bg-[#0a1614] shadow-inner">
          <CalendarX2 className="size-8 text-rose-400 stroke-[1.8]" />
          <div className="absolute -right-1.5 -bottom-1.5 flex size-6 items-center justify-center rounded-lg border border-rose-400/40 bg-rose-500 text-white shadow-md">
            <BanIcon className="size-3.5 stroke-[2.5]" />
          </div>
        </div>
      </div>

      {/* Heading & Description */}
      <div className="max-w-md space-y-2">
        <h3 className="text-xl font-semibold text-white tracking-tight">
          Meeting is cancelled
        </h3>
        <p className="text-sm text-slate-400 leading-relaxed">
          This meeting was cancelled and can no longer be started or joined. You can schedule a new session anytime from your meetings dashboard.
        </p>
      </div>

      {/* Action Button */}
      <div className="mt-8 flex items-center justify-center w-full">
        <Button
          render={<Link href="/meeting" />}
          variant="outline"
          className="w-full sm:w-auto h-10 px-5 gap-2 rounded-xl border-emerald-800/50 bg-emerald-950/40 text-slate-200 hover:bg-emerald-900/50 hover:text-white hover:border-emerald-700/60 font-medium transition-all duration-200 cursor-pointer"
        >
          <ArrowLeft className="size-4 stroke-[2.2]" />
          <span>Back to Meetings</span>
        </Button>
      </div>
    </div>
  );
};

export default CancelledState;