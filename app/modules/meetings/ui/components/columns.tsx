"use client";

import { format } from "date-fns";
import humanizeDuration from "humanize-duration";
import { type ColumnDef } from "@tanstack/react-table";
import {
  CircleCheckIcon,
  CircleXIcon,
  ClockArrowUpIcon,
  ClockFadingIcon,
  CornerDownRightIcon,
  LoaderIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { GeneratedAvatar } from "@/components/ui/generated-avatar";

import { type DataTableFeatures } from "./data-table-features";
import { MeetingGetMany } from "../../type";

function formatDuration(seconds: number) {
  return humanizeDuration(seconds * 1000, {
    largest: 1,
    round: true,
    units: ["h", "m", "s"],
  });
}

const statusIconMap = {
  upcoming: ClockArrowUpIcon,
  active: LoaderIcon,
  completed: CircleCheckIcon,
  processing: LoaderIcon,
  cancelled: CircleXIcon,
};

const statusColorMap = {
  upcoming: "bg-amber-500/15 text-amber-900 border-amber-600/30",
  active: "bg-blue-500/15 text-blue-900 border-blue-600/30",
  completed: "bg-emerald-600/15 text-emerald-950 border-emerald-700/30",
  cancelled: "bg-rose-500/15 text-rose-900 border-rose-600/30",
  processing: "bg-zinc-500/15 text-zinc-800 border-zinc-600/30",
};

export const columns: ColumnDef<DataTableFeatures, MeetingGetMany[number]>[] = [
  {
    accessorKey: "name",
    header: "Meeting Name",
    cell: ({ row }) => (
      <div className="flex flex-col gap-y-1.5">
        <span className="font-semibold text-[15px] text-zinc-950 capitalize">
          {row.original.name}
        </span>
        <div className="flex items-center gap-x-2">
          <div className="flex items-center gap-x-1">
            <CornerDownRightIcon className="size-3.5 text-emerald-800" />
            <span className="text-sm font-medium text-zinc-700 max-w-[200px] truncate capitalize">
              {row.original.agent.name}
            </span>
          </div>
          <GeneratedAvatar
            variant="botttsNeutral"
            seed={row.original.agent.name}
            className="size-4 ring-1 ring-emerald-900/20"
          />
          {row.original.startedAt && (
            <span className="text-xs font-medium text-zinc-500">
              • {format(row.original.startedAt, "MMM d")}
            </span>
          )}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const Icon =
        statusIconMap[row.original.status as keyof typeof statusIconMap];

      return (
        <div
          className={cn(
            "inline-flex items-center gap-x-2 rounded-lg border px-3 py-1.5 text-xs font-semibold capitalize w-fit shadow-2xs",
            statusColorMap[row.original.status as keyof typeof statusColorMap]
          )}
        >
          <Icon
            className={cn(
              "size-4 shrink-0",
              row.original.status === "processing" && "animate-spin"
            )}
          />
          <span>{row.original.status}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }) => (
      <div className="inline-flex items-center gap-x-2 rounded-lg border border-emerald-950/15 bg-white/80 px-3 py-1.5 text-xs font-semibold text-zinc-800 w-fit shadow-2xs">
        <ClockFadingIcon className="size-4 shrink-0 text-emerald-700" />
        <span>
          {row.original.duration
            ? formatDuration(row.original.duration)
            : "No duration"}
        </span>
      </div>
    ),
  },
];