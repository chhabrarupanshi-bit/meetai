"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { LoadingState } from "@/components/ui/loading-state";
import { ErrorState } from "@/components/ui/error-state";
import { EmptyState } from "@/components/ui/empty-state";
import { DataTable } from "../components/data-table";
import { columns } from "../components/columns";
import { useAgentsFilters } from "../../agents/hooks/use-agents-filters";
import { DataPagination } from "../components/data-pagination";
import { useRouter } from "next/navigation";

export const AgentsView = () => {

    const router = useRouter();

    const trpc = useTRPC();

    const [filters, setFilters] = useAgentsFilters();

    const { data } = useSuspenseQuery(
        trpc.agents.getMany.queryOptions({
            ...filters,

        })
    );

    return (
        <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-4">
            {data.items.length === 0 ? (
                <EmptyState
                    title="Create your first agent"
                    description="Create an agent to join your meetings. Each agent will follow your instructions and interact with participants during the call."
                />
            ) : (
                <>
                    <DataTable
                        data={data.items}
                        columns={columns}
                        onRowClick={(row) => router.push(`/agents/${row.id}`)}
                    />
                    <DataPagination
                        page={filters.page}
                        totalPages={data.totalPages}
                        onPageChange={(page) => setFilters({ page })}
                    />
                </>

            )}
        </div>
    );
};

export const AgentViewLoading = () => {
    return (
        <LoadingState
            title="Loading Agents"
            description="Create an agent to join your meetings. Each agent will follow your instructions and can interact with participants during the call.."
        />
    );
};

export const AgentViewError = () => {
    return (
        <ErrorState
            title="Error Loading Agents"
            description="Something went wrong"
        />
    );
};

export const AgentsViewWithErrorBoundary = () => {
    return (
        <ErrorBoundary fallback={<AgentViewError />}>
            <AgentsView />
        </ErrorBoundary>
    );
};