"use client";

import React from "react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  ChevronRightIcon,
  TrashIcon,
  PencilIcon,
  MoreVerticalIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";

interface Props {
  meetingId: string;
  meetingName: string;
  onEdit: () => void;
  onRemove: () => void;
}

export const MeetingIdViewHeader = ({
  meetingId,
  meetingName,
  onEdit,
  onRemove,
}: Props) => {
  return (
    <div className="flex items-center justify-between w-full">
      <Breadcrumb>
        <BreadcrumbList className="gap-2 sm:gap-2.5">
          <BreadcrumbItem>
            <BreadcrumbLink
              render={<Link href="/meeting" />}
              className="text-lg font-medium text-zinc-400 hover:text-emerald-400 transition-colors"
            >
              My Meetings
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator>
            <ChevronRightIcon className="size-4 text-emerald-500/50" />
          </BreadcrumbSeparator>

          <BreadcrumbItem>
            <BreadcrumbLink className="text-lg font-semibold text-white tracking-tight"
            render={<Link href={`/meeting/${meetingId}`} />}
            >
              {meetingName}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className="inline-flex items-center justify-center size-9 rounded-xl border border-emerald-500/35 bg-emerald-950/70 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.18)] hover:bg-emerald-500/20 hover:border-emerald-400 hover:text-emerald-300 hover:shadow-[0_0_20px_rgba(16,185,129,0.35)] transition-all cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50">
          <MoreVerticalIcon className="size-4" />
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          sideOffset={8}
          className="min-w-[165px] rounded-xl border border-emerald-500/20 bg-[#071510] p-1.5 text-zinc-200 shadow-[0_10px_30px_rgba(0,0,0,0.6)] backdrop-blur-md"
        >
          <DropdownMenuItem
            onClick={onEdit}
            className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-zinc-200 hover:bg-emerald-500/15 hover:text-emerald-400 focus:bg-emerald-500/15 focus:text-emerald-400 cursor-pointer transition-colors"
          >
            <PencilIcon className="size-4 text-emerald-400" />
            Edit
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={onRemove}
            className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-red-400 hover:bg-red-500/15 hover:text-red-300 focus:bg-red-500/15 focus:text-red-300 cursor-pointer transition-colors mt-0.5"
          >
            <TrashIcon className="size-4 text-red-400" />
            Remove
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MeetingIdViewHeader;