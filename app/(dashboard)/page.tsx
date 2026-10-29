import React from "react";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export const instant = false;

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">
        Welcome, {session?.user?.name || "User"}
      </h1>
      <button className="mt-4 rounded bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700">
        Sign out
      </button>
    </div>
  );
}