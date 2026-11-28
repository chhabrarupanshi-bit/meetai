import React from "react";
import Link from "next/link";
import { VideoIcon, Radio, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

interface Props {
  meetingId: string;
}

const ActiveState = ({ meetingId }: Props) => {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-[#061c14] via-[#03130c] to-[#020b07] px-6 py-14 min-h-[430px] flex flex-col items-center justify-center text-center shadow-2xl shadow-black/40">
      {/* Subtle Top Radial Glow */}
      <div className="pointer-events-none absolute -top-24 h-56 w-56 rounded-full bg-emerald-500/20 blur-3xl" />

      {/* Live Status Pill */}
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-3.5 py-1 text-xs font-medium text-emerald-300 shadow-sm shadow-emerald-500/10">
        <span className="relative flex size-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
        </span>
        <span>Live in Progress</span>
      </div>

      {/* Custom Dark-Mode Live Video Icon Card */}
      <div className="relative mb-6 flex items-center justify-center">
        <div className="absolute -inset-2.5 rounded-2xl bg-emerald-500/25 blur-lg animate-pulse" />
        <div className="relative flex size-16 items-center justify-center rounded-2xl border border-emerald-400/40 bg-[#061c14] shadow-inner">
          <VideoIcon className="size-8 text-emerald-400 stroke-[1.8]" />
          <div className="absolute -right-1.5 -bottom-1.5 flex size-6 items-center justify-center rounded-lg border border-emerald-300/50 bg-emerald-500 text-emerald-950 shadow-md">
            <Radio className="size-3.5 stroke-[2.5]" />
          </div>
        </div>
      </div>

      {/* Heading & Description */}
      <div className="max-w-md space-y-2">
        <h3 className="text-xl font-semibold text-white tracking-tight">
          Meeting is active
        </h3>
        <p className="text-sm text-slate-400 leading-relaxed">
          Your AI agent is currently live in the session. Jump in now—the meeting will automatically wrap up once all participants leave.
        </p>
      </div>

      {/* Primary Join Action */}
      <div className="mt-8 flex items-center justify-center w-full">
        <Button
          render={<Link href={`/call/${meetingId}`} />}
          variant="default"
          className="w-full sm:w-auto h-10 px-6 gap-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-semibold shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all duration-200 cursor-pointer"
        >
          <VideoIcon className="size-4 stroke-[2.5]" />
          <span>Join Meeting</span>
          <ArrowRight className="size-4 stroke-[2.5]" />
        </Button>
      </div>

      {/* Subtle Footer Hint */}
      <div className="mt-6 flex items-center gap-1.5 text-xs text-slate-500">
        <span className="size-1.5 rounded-full bg-emerald-500/70" />
        <span>Summary &amp; transcript will generate right after the call ends</span>
      </div>
    </div>
  );
};

export default ActiveState;