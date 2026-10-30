
"use client";

import React, { useEffect, useState } from "react";
import { useSidebar } from "@/components/ui/sidebar";
import {
  PanelLeft,
  PanelLeftClose,
  Search,
} from "lucide-react";

import { DashboardCommand } from "./dashboard-command";

const DashboardNavbar = () => {
  const { state, toggleSidebar, isMobile } = useSidebar();
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key.toLowerCase() === "k" &&
        (e.ctrlKey || e.metaKey)
      ) {
        e.preventDefault();
        setCommandOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <DashboardCommand
        open={commandOpen}
        setOpen={setCommandOpen}
      />

      <header
        className="
    sticky top-0 z-30
    flex h-16 w-full min-w-0 shrink-0
    items-center
    pl-6
    border-b border-emerald-500/15
    bg-[#03130c]
        "
      >
        <div className="flex w-full min-w-0 items-center justify-between gap-4 px-4 sm:px-6">

          {/* Sidebar Toggle */}
          <button
            type="button"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
            aria-expanded={
              isMobile ? undefined : state === "expanded"
            }
            className="
              flex size-10 shrink-0 items-center justify-center
              rounded-xl
              border border-emerald-500/20
              bg-[#061c14]
              text-emerald-300
              transition-all duration-200
              hover:border-emerald-400/50
              hover:bg-emerald-500/10
              hover:text-emerald-100
              active:scale-95
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-emerald-400/40
            "
          >
            {state === "collapsed" || isMobile ? (
              <PanelLeft className="size-5" />
            ) : (
              <PanelLeftClose className="size-5" />
            )}
          </button>

          {/* Search */}
          <button
            type="button"
            onClick={() =>
              setCommandOpen((open) => !open)
            }
            aria-label="Search anything"
            className="
              flex h-10 w-full max-w-72 min-w-0
              items-center gap-3
              rounded-xl
              border border-emerald-500/20
              bg-[#061c14]
              px-3
              transition-all duration-200
              hover:border-emerald-400/40
              hover:bg-[#082419]
              sm:max-w-80
            "
          >
            <Search className="size-4 shrink-0 text-emerald-400" />

            <span className="min-w-0 flex-1 truncate text-left text-sm text-emerald-100/60">
              Search anything...
            </span>

            <kbd className="hidden shrink-0 items-center gap-1 rounded-md border border-emerald-500/20 bg-[#020d09] px-2 py-1 text-[10px] text-emerald-300/80 sm:flex">
              <span>Ctrl</span>
              <span>K</span>
            </kbd>
          </button>

        </div>
      </header>
    </>
  );
};

export default DashboardNavbar;
