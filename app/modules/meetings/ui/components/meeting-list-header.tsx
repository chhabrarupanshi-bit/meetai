"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon, RotateCcwIcon } from "lucide-react";
import { NewMeetingDialog } from "./new-meeting-dialog";
import { useState } from "react";
import { MeetingsSearchFilter } from "./meetings-search-filter";
import { StatusFilter } from "./status-filter";
import { AgentIdFilter } from "./agent-id-filter";
import { useMeetingsFilters } from "../../hooks/use-meetings-filter";
import {XCircleIcon} from "lucide-react";
import { ScrollArea , ScrollBar} from "../../../../../components/ui/scroll-area";


export const MeetingsListHeader = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filters, setFilters] = useMeetingsFilters();

  const isAnyFilterModified = !!filters.search || !!filters.status || !!filters.agentId;

  const onClearFilters = () => {
    setFilters({
      search: "",
      status: null,
      agentId: "",
      page: 1,
    });
  };

  return (
    <>
      <NewMeetingDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />

      <div className="py-5 px-4 md:px-8 flex flex-col gap-y-4">
        <div className="flex items-center justify-between gap-x-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-white">
              My Meetings
            </h2>
          </div>

          <Button
            size="sm"
            className="h-9 px-4 gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-semibold shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all duration-200 cursor-pointer"
            onClick={() => {
              setIsDialogOpen(true);
            }}
          >
            <PlusIcon className="size-4 stroke-[2.5]" />
            <span>New Meeting</span>
          </Button>
        </div>
<ScrollArea>
        <div className="flex items-center gap-x-2.5">
          
          <MeetingsSearchFilter />
          <StatusFilter />
          <AgentIdFilter />
          {
            isAnyFilterModified && (
              <Button
                size="sm"
                variant="outline"
                className="h-9 px-3 gap-2 rounded-xl bg-white text-zinc-900 font-semibold shadow-[0_0_20px_rgba(16,185,129,0.18)] transition-all duration-200 cursor-pointer hover:bg-zinc-50 hover:text-zinc-950"
                onClick={onClearFilters}
              >
                <XCircleIcon className="size-4 stroke-[2.5]" />
                <span>Clear Filters</span>
              </Button>
            )
          }
        </div>
        <ScrollBar orientation="horizontal"/>
        </ScrollArea>
      </div>
    </>
  );
};