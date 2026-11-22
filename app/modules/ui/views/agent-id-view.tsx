"use client";
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';
import { LoadingState } from '@/components/ui/loading-state';
import { ErrorState } from '@/components/ui/error-state';


import React from 'react'
import AgentIdViewHeader from '../components/agent-id-view-header';
import { GeneratedAvatar } from '@/components/ui/generated-avatar';
import { Badge, VideoIcon } from 'lucide-react';

interface props {
    agentId: string
}


const AgentIdView = ({ agentId }: props) => {
    const trpc = useTRPC();

    const { data } = useSuspenseQuery(
        trpc.agents.getOne.queryOptions({
            id: agentId,
        })
    )
    return (
        <div className="flex flex-col gap-4" >
            {/* {JSON.stringify(data)} */}
            <AgentIdViewHeader
                agentId={agentId}
                agentName={data.name}
                onEdit={() => { }}
                onRemove={() => { }}
            />

<div className="mt-5 rounded-2xl border border-emerald-400/30 bg-[#f8fafc] px-5 py-5  shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
  <div className="flex flex-col gap-3">
    {/* Header Row */}
    <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
      <div className="flex items-center gap-3">
        <div className="rounded-full p-0.5 bg-gradient-to-tr from-emerald-500 to-teal-400 shadow-sm shadow-emerald-500/25">
          <GeneratedAvatar
            variant="botttsNeutral"
            seed={data.name}
            className="size-10 rounded-full bg-white"
          />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-900 leading-tight tracking-tight">
            {data.name}
          </h2>
          <p className="text-xs font-semibold text-emerald-700">
            AI Meeting Agent
          </p>
        </div>
      </div>

      <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300 bg-emerald-100/80 px-3.5 py-1 text-xs font-bold text-emerald-900">
        <VideoIcon className="size-3.5 text-emerald-700" />
        <span>
          {data.meetingCount ?? 0}{" "}
          {data.meetingCount === 1 ? "meeting" : "meetings"}
        </span>
      </div>
    </div>

    {/* Instructions Section */}
    <div className="flex flex-col gap-1.5">
      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
        Instructions
      </p>
      <div className="rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm leading-snug text-slate-800 whitespace-pre-wrap shadow-xs">
        {data.instructions}
      </div>
    </div>
  </div>
</div>
        </div>
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