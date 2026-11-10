import { Suspense } from 'react';
import { connection } from 'next/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { 
  AgentsViewWithErrorBoundary,  // <-- Yahan import badla
  AgentViewLoading, 
} from '../../modules/ui/views/agents-view';
import { getQueryClient, trpc } from '@/trpc/server';

const page = async () => {
  await connection();

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<AgentViewLoading />}>
        <AgentsViewWithErrorBoundary />  {/* <-- Yahan lagaya */}
      </Suspense>
    </HydrationBoundary>
  );
};

export default page;