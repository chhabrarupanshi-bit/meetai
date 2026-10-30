"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

// Session prop receive karo
export const HomeView = () => {
  const trpc = useTRPC();
  const {data} = useQuery(trpc.hello.queryOptions({text: "Hello from TRPC!"}));

  
  
  return (
    <div className="p-4">
      {data ? (
        <h1 className="text-xl font-bold">{data.greeting}</h1>
      ) : (
        <p className="text-gray-500">Loading...</p>
      )}
    </div>
  );
}
