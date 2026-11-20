"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const DataPagination = ({
  page,
  totalPages,
  onPageChange,
}: Props) => {
  return (
    <div className="flex justify-center pt-4 pb-2">
      {/* Floating Capsule Dock (Table se bilkul alag look) */}
      <div className="inline-flex items-center gap-4 px-4 py-2 rounded-full bg-[#042f1e] border border-emerald-400/35 shadow-[0_10px_28px_rgba(4,47,30,0.25),0_0_16px_rgba(16,185,129,0.18)]">
        {/* Left: Page Counter */}
        <div className="text-xs font-medium text-emerald-100/80 pl-1.5">
          Page{" "}
          <span className="inline-flex items-center justify-center px-2 py-0.5 mx-0.5 rounded-full bg-emerald-500 text-[#021f14] font-bold shadow-[0_0_10px_rgba(16,185,129,0.6)]">
            {page}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-white">{totalPages || 1}</span>
        </div>

        {/* Vertical Divider */}
        <div className="h-4 w-px bg-emerald-400/20" />

        {/* Right: Same Previous & Next Buttons */}
        <div className="flex items-center gap-2">
          <Button
            disabled={page === 1}
            variant="outline"
            size="sm"
            onClick={() => onPageChange(Math.max(1, page - 1))}
            className="h-8 px-3 rounded-full bg-white/10 border-emerald-400/25 text-emerald-100 text-xs font-medium transition-all hover:bg-emerald-500/25 hover:border-emerald-400/50 hover:text-white disabled:opacity-35 disabled:pointer-events-none cursor-pointer gap-1"
          >
            <ChevronLeftIcon className="size-3.5" />
            Previous
          </Button>
          <Button
            disabled={page === totalPages || totalPages === 0}
            variant="outline"
            size="sm"
            onClick={() => onPageChange(Math.min(totalPages, page + 1))}
            className="h-8 px-3.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 border-0 text-[#021f14] text-xs font-bold shadow-[0_0_14px_rgba(16,185,129,0.45)] transition-all hover:brightness-110 disabled:opacity-40 disabled:shadow-none disabled:pointer-events-none cursor-pointer gap-1"
          >
            Next
            <ChevronRightIcon className="size-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
};