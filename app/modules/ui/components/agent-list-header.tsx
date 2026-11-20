"use client";

import { PlusIcon, RotateCcwIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NewAgentsDialog } from "./new-agents-dailog";

import { useState } from "react";
import { useAgentsFilters } from "../../agents/hooks/use-agents-filters";
import { AgentsSearchFilter } from "./agents-search-filter";
import { DEFAULT_PAGE } from "@/app/constants";

export const AgentsListHeader = () => {
  const [filters, setFilters] = useAgentsFilters();
  const [DialogOpen, setDialogOpen] = useState(false);

  const isAnyFilterModified = !!filters.search;

  const onClearFilters = () => {
    setFilters({
      search: "",
      page: DEFAULT_PAGE,
    });
  };

  return (
    <>
      <NewAgentsDialog open={DialogOpen} onOpenChange={setDialogOpen} />
      <div className="py-5 px-4 md:px-8 flex flex-col gap-y-4">
        <div className="flex items-center justify-between gap-x-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-white">
              My Agents
            </h2>
          </div>

          <Button
            size="sm"
            className="h-9 px-4 gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-semibold shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all duration-200 cursor-pointer"
            onClick={() => {
              setDialogOpen(true);
            }}
          >
            <PlusIcon className="size-4 stroke-[2.5]" />
            <span>New Agent</span>
          </Button>
        </div>

        <div className="flex items-center gap-x-2.5">
          <AgentsSearchFilter />

          {isAnyFilterModified && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="h-9 px-3.5 gap-1.5 rounded-xl border border-amber-400/50 bg-amber-400/15 text-amber-300 font-medium shadow-[0_0_15px_rgba(251,191,36,0.15)] hover:bg-amber-400 hover:text-zinc-950 hover:border-amber-300 transition-all duration-200 cursor-pointer"
            >
              <RotateCcwIcon className="size-3.5 stroke-[2.2]" />
              <span className="text-xs font-semibold tracking-wide">Reset</span>
            </Button>
          )}
        </div>
      </div>
    </>
  );
};