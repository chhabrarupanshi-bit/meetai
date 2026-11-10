"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { LoadingState } from "@/components/ui/loading-state";
import { ErrorState } from "@/components/ui/error-state";

export const AgentsView = () => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(
        trpc.agents.getMany.queryOptions()
    );

    return (
        <div>
            {JSON.stringify(data, null, 2)}
        </div>
    );
};

export const AgentViewLoading = () => {
    return (
        <LoadingState
            title="Loading Agents"
            description="This may take a few seconds."
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