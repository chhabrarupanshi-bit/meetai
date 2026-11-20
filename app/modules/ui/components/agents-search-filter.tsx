"use client";

import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAgentsFilters } from "../../agents/hooks/use-agents-filters";
import { DEFAULT_PAGE } from "@/app/constants";

export const AgentsSearchFilter = () => {
  const [filters, setFilters] = useAgentsFilters();

  return (
    <div className="relative group">
      <Input
        placeholder="Filter by name..."
        className="h-9 w-[250px] pl-9 pr-3 rounded-xl bg-[#e6f4ee] border-2 border-emerald-400/70 text-sm font-medium text-[#042f1e] placeholder:text-[#042f1e]/55 shadow-[0_0_20px_rgba(16,185,129,0.18)] transition-all duration-200 hover:bg-white hover:border-emerald-400 focus-visible:bg-white focus-visible:border-emerald-400 focus-visible:ring-4 focus-visible:ring-emerald-400/25"
        value={filters.search}
        onChange={(e) =>
          setFilters({
            search: e.target.value,
            page: DEFAULT_PAGE,
          })
        }
      />

      <SearchIcon className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-emerald-700 group-focus-within:text-emerald-600 transition-colors pointer-events-none" />
    </div>
  );
};