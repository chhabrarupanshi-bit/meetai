"use client";

import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NewAgentsDialog } from "./new-agents-dailog";

import { useState } from "react";

export const AgentsListHeader = () => {
    const[DialogOpen, setDialogOpen] = useState(false);
  return (
  <>
  <NewAgentsDialog open={DialogOpen} onOpenChange={setDialogOpen}/>
    <div className="py-4 px-4 md:px-8">
      <div className="flex items-center justify-between gap-x-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            My Agents
          </h2>
        </div>

        <Button  
          size="sm" 
          className="gap-2 font-medium bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-colors"
          onClick={() => {
            // Next step: open agent creation dialog
            setDialogOpen(true);
          }}
        >
          <PlusIcon className="size-4" />
          <span>New Agent</span>
        </Button>
      </div>
    </div>
    </>
  );
};