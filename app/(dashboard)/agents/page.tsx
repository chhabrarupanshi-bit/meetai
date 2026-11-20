import { Suspense } from 'react';
import { connection } from 'next/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { 
  AgentsViewWithErrorBoundary,  // <-- Yahan import badla
  AgentViewLoading, 
} from '../../modules/ui/views/agents-view';
import { getQueryClient, trpc } from '@/trpc/server';
import { AgentsListHeader } from '../../modules/ui/components/agent-list-header';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { SearchParams } from 'nuqs';
import { loadSearchParams } from '@/app/modules/ui/params';

export const instant = false;

interface Props{
  searchParams : Promise<SearchParams>
}

const page = async ({searchParams} : Props) => {
  const filters = await loadSearchParams(searchParams);
  const session = await auth.api.getSession({
      headers: await headers(),
    });
  
    if (!session) {
      redirect('/auth/sign-in');
    }
  await connection();

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions({
    ...filters,
  }));

  return (
    <>
    <AgentsListHeader/>
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<AgentViewLoading />}>
        <AgentsViewWithErrorBoundary />  {/* <-- Yahan lagaya */}
      </Suspense>
    </HydrationBoundary>
    </>
  );
};

export default page;