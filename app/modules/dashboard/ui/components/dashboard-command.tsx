"use client";

import React from "react";
import {
  CommandResponsiveDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command";

interface DashboardCommandProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DashboardCommand = ({ open, setOpen }: DashboardCommandProps) => {
  return (
    <CommandResponsiveDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      
      <CommandList className="max-h-[340px] overflow-y-auto p-2">
        <CommandEmpty className="py-6 text-center text-xs text-neutral-500">
          No results found.
        </CommandEmpty>

        <CommandGroup heading="Navigation">
          <CommandItem className="cursor-pointer rounded-lg hover:bg-neutral-100 data-selected:bg-neutral-100 px-3 py-2 text-sm text-neutral-800">
            Agents
          </CommandItem>
          <CommandItem className="cursor-pointer rounded-lg hover:bg-neutral-100 data-selected:bg-neutral-100 px-3 py-2 text-sm text-neutral-800">
            Meetings
          </CommandItem>
        </CommandGroup>

        <CommandSeparator className="my-1 border-neutral-100" />

        <CommandGroup heading="Quick Actions">
          <CommandItem className="cursor-pointer rounded-lg hover:bg-neutral-100 data-selected:bg-neutral-100 px-3 py-2 text-sm text-neutral-800">
            Create Agent
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandResponsiveDialog>
  );
};