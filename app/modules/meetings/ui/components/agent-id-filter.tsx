import {useState} from "react";
import {useQuery} from "@tanstack/react-query";

import {useTRPC} from "@/trpc/client";
import {CommandSelect} from '@/components/ui/command-select';
import {GeneratedAvatar} from "@/components/ui/generated-avatar";

import {useMeetingsFilters} from "../../hooks/use-meetings-filter";

export const AgentIdFilter = () => {
    const [filters, setFilters] = useMeetingsFilters();
    const [agentSearch, setAgentSearch] = useState("");

    const trpc = useTRPC();

    const {data} = useQuery(
        trpc.agents.getMany.queryOptions({
            pageSize: 100,
            search: agentSearch,
        }),
    );
    return (
        <CommandSelect
        className="h-9 w-[200px] rounded-lg border-emerald-400/60 bg-white px-3 text-sm font-medium text-slate-700 shadow-xs hover:bg-slate-50 hover:text-slate-900"
        placeholder="Agent"
        options={(data?.items ?? []).map((agent) => ({
            value: agent.id,
            id : agent.name,
            children: (
                <div className="flex items-center gap-x-2">
                    <GeneratedAvatar
                        seed={agent.name}
                        variant="botttsNeutral"
                        className="border size-6"
                    />
                    <span>{agent.name}</span>
                </div>
            ),
        }))}
        onSelect={(value) => setFilters({ agentId: value as string })}
        onSearch={setAgentSearch}
        value={filters.agentId ?? ""}
    />
    )
}