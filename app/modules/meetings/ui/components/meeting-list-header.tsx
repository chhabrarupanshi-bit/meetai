"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon, RotateCcwIcon } from "lucide-react";
import { NewMeetingDialog } from "./new-meeting-dialog";
import { useState } from "react";

export const MeetingsListHeader = () => {
    const [isDialogOpen , setIsDialogOpen] = useState(false);
  

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

        <div className="flex items-center gap-x-2.5">
          TODO: Filter
        </div>
      </div>
    </>
  );
};