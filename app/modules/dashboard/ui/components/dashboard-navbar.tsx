"use client";

import React, { useEffect, useState } from "react";
import { useSidebar } from "@/components/ui/sidebar";
import { PanelLeft, PanelLeftClose, Search } from "lucide-react";
import { DashboardCommand } from "./dashboard-command";

const DashboardNavbar = () => {
  const { state, toggleSidebar, isMobile } = useSidebar();
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.ctrlKey || e.metaKey)) {
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
      <DashboardCommand open={commandOpen} setOpen={setCommandOpen} />

      <header className="sticky top-0 z-20 flex h-16 w-full min-w-0 shrink-0 items-center border-b border-emerald-500/20 bg-[#041B11] px-4 shadow-sm sm:px-6">
        <div className="flex w-full min-w-0 items-center justify-between gap-4">
          {/* Sidebar Toggle Button */}
          <button
            type="button"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
            aria-expanded={isMobile ? undefined : state === "expanded"}
            className="flex size-9.5 shrink-0 items-center justify-center rounded-xl border border-emerald-400/25 bg-[#082B1C] text-emerald-300 shadow-sm transition-all duration-200 hover:border-emerald-400/60 hover:bg-emerald-500/20 hover:text-white active:scale-95"
          >
            {state === "collapsed" || isMobile ? (
              <PanelLeft className="size-5" />
            ) : (
              <PanelLeftClose className="size-5" />
            )}
          </button>

          {/* Search Bar */}
          <button
            type="button"
            onClick={() => setCommandOpen((open) => !open)}
            aria-label="Search anything"
            className="group flex h-10 w-full max-w-64 min-w-0 items-center gap-2.5 rounded-xl border border-emerald-400/25 bg-[#082B1C] px-3.5 transition-all duration-200 hover:border-emerald-400/60 hover:bg-[#0B3624] sm:max-w-72"
          >
            <Search className="size-4 shrink-0 text-emerald-400 transition-transform duration-200 group-hover:scale-110" />

            <span className="min-w-0 flex-1 truncate text-left text-xs font-medium text-emerald-100/75 group-hover:text-white">
              Search anything...
            </span>

            <kbd className="hidden shrink-0 items-center gap-1 rounded-md border border-emerald-400/30 bg-[#03140D] px-1.5 py-0.5 text-[10px] font-semibold text-emerald-300 sm:flex">
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