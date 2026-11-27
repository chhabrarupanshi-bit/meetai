import {
  CircleCheckIcon,
  CircleXIcon,
  ClockArrowUpIcon,
  LoaderIcon,
  VideoIcon,
} from "lucide-react";

import { CommandSelect } from "@/components/ui/command-select";
import { useMeetingsFilters } from "../../hooks/use-meetings-filter";
import { MeetingStatus } from "../../type";

const options = [
  {
    id: MeetingStatus.Upcoming,
    value: MeetingStatus.Upcoming,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <ClockArrowUpIcon className="size-4 text-amber-600" />
        <span>{MeetingStatus.Upcoming}</span>
      </div>
    ),
  },
  {
    id: MeetingStatus.Active,
    value: MeetingStatus.Active,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <VideoIcon className="size-4 text-emerald-600" />
        <span>{MeetingStatus.Active}</span>
      </div>
    ),
  },
  {
    id: MeetingStatus.Processing,
    value: MeetingStatus.Processing,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <LoaderIcon className="size-4 text-blue-600" />
        <span>{MeetingStatus.Processing}</span>
      </div>
    ),
  },
  {
    id: MeetingStatus.Completed,
    value: MeetingStatus.Completed,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <CircleCheckIcon className="size-4 text-emerald-600" />
        <span>{MeetingStatus.Completed}</span>
      </div>
    ),
  },
  {
    id: MeetingStatus.Cancelled,
    value: MeetingStatus.Cancelled,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <CircleXIcon className="size-4 text-rose-600" />
        <span>{MeetingStatus.Cancelled}</span>
      </div>
    ),
  },
];

export const StatusFilter = () => {
  const [filters, setFilters] = useMeetingsFilters();

 return (
    <CommandSelect
      placeholder="Status"
      className="h-9 w-[140px] rounded-lg border-emerald-400/60 bg-white px-3 text-sm font-medium text-slate-700 shadow-xs hover:bg-slate-50 hover:text-slate-900"
      options={options}
      onSelect={(value) => setFilters({ status: value as MeetingStatus })}
      value={filters.status ?? ""}
    />
  );
};