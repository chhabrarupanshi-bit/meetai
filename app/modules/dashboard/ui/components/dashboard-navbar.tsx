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

      <header className="sticky top-0 z-20 flex h-16 w-full min-w-0 shrink-0 items-center border-b border-[#00d084]/20 bg-[#020b07]/95 px-4 backdrop-blur-md sm:px-6">
        <div className="flex w-full min-w-0 items-center justify-between gap-4">
          
          {/* Sidebar Toggle Button */}
          <button
            type="button"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
            aria-expanded={isMobile ? undefined : state === "expanded"}
            className="flex size-9.5 shrink-0 items-center justify-center rounded-xl border border-emerald-500/25 bg-[#061c14] text-emerald-300 shadow-sm transition-all duration-200 hover:border-emerald-400/60 hover:bg-emerald-500/15 hover:text-emerald-100 active:scale-95"
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
            className="group flex h-10 w-full max-w-64 min-w-0 items-center gap-2.5 rounded-xl border border-emerald-500/25 bg-[#061c14]/90 px-3.5 transition-all duration-200 hover:border-emerald-400/50 hover:bg-[#082419] sm:max-w-72"
          >
            <Search className="size-4 shrink-0 text-emerald-400 transition-transform duration-200 group-hover:scale-110" />

            <span className="min-w-0 flex-1 truncate text-left text-xs font-medium text-emerald-100/65 group-hover:text-emerald-100/90">
              Search anything...
            </span>

            <kbd className="hidden shrink-0 items-center gap-1 rounded-md border border-emerald-500/30 bg-[#020d09] px-1.5 py-0.5 text-[10px] font-semibold text-emerald-300/80 sm:flex">
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