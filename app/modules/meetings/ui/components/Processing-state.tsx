import React from "react";
import { Loader2, Sparkles, FileText, CheckCircle2 } from "lucide-react";

const ProcessingState = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-emerald-900/50 bg-gradient-to-b from-[#061c14] via-[#03130c] to-[#020b07] px-6 py-14 min-h-[430px] flex flex-col items-center justify-center text-center shadow-2xl shadow-black/40">
      {/* Subtle Top Radial Glow */}
      <div className="pointer-events-none absolute -top-24 h-56 w-56 rounded-full bg-amber-500/10 blur-3xl" />

      {/* Status Pill */}
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/25 bg-amber-500/10 px-3.5 py-1 text-xs font-medium text-amber-300">
        <Loader2 className="size-3.5 animate-spin text-amber-400" />
        <span>Generating AI Summary</span>
      </div>

      {/* Custom Dark-Mode Processing Icon Card */}
      <div className="relative mb-6 flex items-center justify-center">
        <div className="absolute -inset-2.5 rounded-2xl bg-emerald-500/20 blur-lg animate-pulse" />
        <div className="relative flex size-16 items-center justify-center rounded-2xl border border-emerald-500/30 bg-[#061c14] shadow-inner">
          <FileText className="size-8 text-emerald-400 stroke-[1.8]" />
          <div className="absolute -right-1.5 -bottom-1.5 flex size-6 items-center justify-center rounded-lg border border-amber-400/40 bg-amber-500 text-slate-950 shadow-md">
            <Sparkles className="size-3.5 stroke-[2.5] animate-pulse" />
          </div>
        </div>
      </div>

      {/* Heading & Description */}
      <div className="max-w-md space-y-2">
        <h3 className="text-xl font-semibold text-white tracking-tight">
          Meeting completed
        </h3>
        <p className="text-sm text-slate-400 leading-relaxed">
          This meeting was completed. Our AI is currently processing the recording, transcript, and key takeaways—they will appear here shortly.
        </p>
      </div>

      {/* Processing Steps Indicator */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs">
        <div className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-800/50 bg-emerald-950/40 px-3 py-1.5 text-emerald-300">
          <CheckCircle2 className="size-3.5 text-emerald-400" />
          <span>Call Ended</span>
        </div>

        <div className="inline-flex items-center gap-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-amber-300">
          <Loader2 className="size-3.5 animate-spin text-amber-400" />
          <span>Transcribing &amp; Summarizing</span>
        </div>
      </div>
    </div>
  );
};

export default ProcessingState;