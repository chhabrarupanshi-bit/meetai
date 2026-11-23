"use client";
import { useTRPC } from '@/trpc/client';
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { LoadingState } from '@/components/ui/loading-state';
import { ErrorState } from '@/components/ui/error-state';


import React from 'react'
import AgentIdViewHeader from '../components/agent-id-view-header';
import { GeneratedAvatar } from '@/components/ui/generated-avatar';
import { useState } from 'react';
import { Badge, VideoIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useConfirm } from '../../agents/hooks/use-confirm';
import { UpdateAgentDialog } from '../components/update-agent-dialog';

interface props {
    agentId: string
}


const AgentIdView = ({ agentId }: props) => {
    const router = useRouter();
    const trpc = useTRPC();
    const QueryClient = useQueryClient();

    const [updateAgentDialogOpen , setUpdateAgentDialogOpen] = useState(false)

    const { data } = useSuspenseQuery(
        trpc.agents.getOne.queryOptions({
            id: agentId,
        })
    )

    const removeAgent = useMutation(
        trpc.agents.remove.mutationOptions({

            onSuccess: async () => {
                await QueryClient.invalidateQueries(trpc.agents.getMany.queryOptions({}));
                // TODO: Invalidate free tier usage
                router.push("/agents");
            },

            onError: (error) => {
                toast.error(error.message);
            },
        }),
    );

    const [RemoveConfirmation , confirmRemove] = useConfirm(
        "Are you sure?",
        ` The Following action will remove ${data.meetingCount} associted meeting`
    );

    const handleRemoveAgent = async () => {
        const ok = await confirmRemove();

        if(!ok) return;

        await removeAgent.mutateAsync({ id: agentId });
    }


    return (
        <>
        <RemoveConfirmation />
        {removeAgent.isPending && (
            <LoadingState
                title="Deleting Agent"
                description="Please wait while we remove this agent and its associated meetings..."
            />
        )}
        <UpdateAgentDialog open={updateAgentDialogOpen} onOpenChange={setUpdateAgentDialogOpen} initialValues={data} />
        <div className="flex flex-col gap-4" >
            {/* {JSON.stringify(data)} */}
            <AgentIdViewHeader
                agentId={agentId}
                agentName={data.name}
                onEdit={() => {setUpdateAgentDialogOpen(true)}} 
                onRemove={handleRemoveAgent}
            />

            <div className=" mt-4 rounded-2xl border border-emerald-400/30 bg-[#f8fafc] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
                <div className="flex flex-col gap-6">
                    {/* Header Row */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-200">
                        <div className="flex items-center gap-4">
                            {/* Highlight Circle around Avatar */}
                            <div className="rounded-full p-1 bg-gradient-to-tr from-emerald-500 to-teal-400 shadow-md shadow-emerald-500/25">
                                <GeneratedAvatar
                                    variant="botttsNeutral"
                                    seed={data.name}
                                    className="size-12 rounded-full bg-white"
                                />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                                    {data.name}
                                </h2>
                                <p className="text-xs font-semibold text-emerald-700 mt-0.5">
                                    AI Meeting Agent
                                </p>
                            </div>
                        </div>

                        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-100/80 px-4 py-1.5 text-xs font-bold text-emerald-900">
                            <VideoIcon className="size-3.5 text-emerald-700" />
                            <span>
                                {data.meetingCount ?? 0}{" "}
                                {data.meetingCount === 1 ? "meeting" : "meetings"}
                            </span>
                        </div>
                    </div>

                    {/* Instructions Section */}
                    <div className="flex flex-col gap-2">
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                            Instructions
                        </p>
                        <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm leading-relaxed text-slate-800 whitespace-pre-wrap shadow-xs">
                            {data.instructions}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export const AgentIdViewLoading = () => {
    return (
        <LoadingState
            title="Loading Agents"
            description="Create an agent to join your meetings. Each agent will follow your instructions and can interact with participants during the call.."
        />
    );
};

export const AgentIdViewError = () => {
    return (
        <ErrorState
            title="Error Loading Agents"
            description="Something went wrong"
        />
    );
};


export default AgentIdView