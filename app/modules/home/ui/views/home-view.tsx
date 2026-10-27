"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

// Session prop receive karo
export const HomeView = ({ session }: { session: any }) => {
  const router = useRouter();

  return (
    <div className="p-4">
      <div>
        <p>Welcome, {session.user.name}</p>
        <button
          onClick={async () => {
            await authClient.signOut({
              fetchOptions: {
                onSuccess: () => {
                  router.push("/auth/sign-in");
                  router.refresh();
                },
              },
            });
          }}
          className="mt-2 rounded bg-red-600 px-3 py-1.5 text-white"
        >
          Sign out
        </button>
      </div>
    </div>
  );
};