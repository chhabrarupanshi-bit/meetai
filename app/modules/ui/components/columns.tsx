"use client"

import { createColumnHelper } from "@tanstack/react-table"
import { CornerDownRightIcon, VideoIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { GeneratedAvatar } from "../../../../components/ui/generated-avatar"
import { AgentGetOne } from "../type"
import { type DataTableFeatures } from "./data-table-features"

const columnHelper = createColumnHelper<DataTableFeatures, AgentGetOne>()

export const columns = columnHelper.columns([
  columnHelper.accessor("name", {
    header: "Agent Name",
    cell: ({ row }) => (
      <div className="flex flex-col gap-y-1">
        <div className="flex items-center gap-x-3">
          <GeneratedAvatar
            variant="botttsNeutral"
            seed={row.original.name}
            className="size-8 ring-1 ring-emerald-950/20"
          />
          <span className="text-base font-bold tracking-tight text-zinc-900 capitalize">
            {row.original.name}
          </span>
        </div>
        <div className="flex items-center gap-x-1.5 pl-1">
          <CornerDownRightIcon className="size-3.5 text-emerald-800" />
          <span className="max-w-[260px] truncate text-sm font-medium text-zinc-700 capitalize">
            {row.original.instructions}
          </span>
        </div>
      </div>
    ),
  }),
    columnHelper.accessor("meetingCount", {
        header: "Meetings",
        cell: () => (
            <div className="flex justify-end">
                <Badge
                   variant="outline"
          className="flex items-center gap-x-2 rounded-full border-emerald-800/25 bg-emerald-950/10 px-3 py-1 text-xs font-semibold text-emerald-950 [&>svg]:size-3.5"
                >
                    <VideoIcon className="text-emerald-800" />
                    5 meetings
                </Badge>
            </div>
        ),
    }),
])