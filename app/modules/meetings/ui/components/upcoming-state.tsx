import React from "react";
import Link from "next/link";
import { VideoIcon, BanIcon, Sparkles, Clock } from "lucide-react";

import { Button } from "@/components/ui/button";

interface Props {
  meetingId: string;
  onCancelMeeting: () => void;
  isCancelling: boolean;
}

const UpcomingState = ({
  meetingId,
  onCancelMeeting,
  isCancelling,
}: Props) => {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-emerald-900/50 bg-gradient-to-b from-[#061c14] via-[#03130c] to-[#020b07] px-6 py-14 min-h-[430px] flex flex-col items-center justify-center text-center shadow-2xl shadow-black/40">
      {/* Subtle Top Radial Glow */}
      <div className="pointer-events-none absolute -top-24 h-56 w-56 rounded-full bg-emerald-500/15 blur-3xl" />

      {/* Status Pill */}
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3.5 py-1 text-xs font-medium text-emerald-300">
        <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span>Upcoming Session</span>
      </div>

      {/* Custom Dark-Mode Video Icon Card */}
      <div className="relative mb-6 flex items-center justify-center">
        <div className="absolute -inset-2 rounded-2xl bg-emerald-500/20 blur-lg" />
        <div className="relative flex size-16 items-center justify-center rounded-2xl border border-emerald-500/30 bg-[#061c14] shadow-inner">
          <VideoIcon className="size-8 text-emerald-400 stroke-[1.8]" />
          <div className="absolute -right-1.5 -bottom-1.5 flex size-6 items-center justify-center rounded-lg border border-emerald-400/40 bg-emerald-500 text-emerald-950 shadow-md">
            <Sparkles className="size-3.5 stroke-[2.5]" />
          </div>
        </div>
      </div>

      {/* Heading & Description */}
      <div className="max-w-md space-y-2">
        <h3 className="text-xl font-semibold text-white tracking-tight">
          Ready when you are
        </h3>
        <p className="text-sm text-slate-400 leading-relaxed">
          This meeting hasn&apos;t started yet. Launch the live session to interact with your AI agent—your summary and transcript will appear here afterward.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-col-reverse sm:flex-row items-center justify-center gap-3 w-full">
        <Button
          variant="outline"
          disabled={isCancelling}
          onClick={onCancelMeeting}
          className="w-full sm:w-auto h-10 px-5 gap-2 rounded-xl border-slate-800 bg-slate-950/60 text-slate-300 hover:bg-red-950/50 hover:text-red-400 hover:border-red-900/60 font-medium transition-all duration-200 cursor-pointer"
        >
          <BanIcon className="size-4 stroke-[2.2]" />
          <span>Cancel Meeting</span>
        </Button>

        <Button
          render={<Link href={`/call/${meetingId}`} />}
          variant="default"
          disabled={isCancelling}
          className="w-full sm:w-auto h-10 px-6 gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-semibold shadow-[0_0_25px_rgba(16,185,129,0.35)] transition-all duration-200 cursor-pointer"
        >
          <VideoIcon className="size-4 stroke-[2.5]" />
          <span>Start Meeting</span>
        </Button>
      </div>

      {/* Subtle Footer Hint */}
      <div className="mt-6 flex items-center gap-1.5 text-xs text-slate-500">
        <Clock className="size-3.5 text-emerald-500/70" />
        <span>Auto-generates summary &amp; recording once ended</span>
      </div>
    </div>
  );
};

export default UpcomingState;