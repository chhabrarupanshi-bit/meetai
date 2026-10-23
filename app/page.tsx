"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => {
    authClient.signUp.email(
      {
        name: name,
        email: email,
        password: password,
      },
      {
        onError: (ctx) => {
          window.alert(ctx.error.message || "Error creating user. Please try again.");
        },
        onSuccess: () => {
          window.alert("User created successfully!");
          router.refresh();
        },
      }
    );
  };

  const onLogin = () => {
    authClient.signIn.email(
      {
        email: email,
        password: password,
      },
      {
        onError: (ctx) => {
          window.alert(ctx.error.message || "Error creating user. Please try again.");
        },
        onSuccess: () => {
          window.alert("User created successfully!");
          router.refresh();
        },
      }
    );
  };

  if (isPending) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  if (session) {
    return (
      <div className="py-4 flex flex-col gap-4 max-w-sm mx-auto items-center">
        <p className="text-lg font-medium">Logged in User: {session.user.name}</p>
        <Button
          variant="destructive"
          onClick={async () => {
            await authClient.signOut();
            router.refresh();
          }}
        >
          Sign Out
        </Button>
      </div>
    );
  }

  return (
    <div className="py-4 flex flex-col gap-4 max-w-sm mx-auto">
      <div className="py-4 flex flex-col gap-4 max-w-sm mx-auto">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="custom" onClick={onSubmit}>
          Create Account
        </Button>
      </div>

      <div className="py-4 flex flex-col gap-4 max-w-sm mx-auto">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="custom" onClick={onLogin}>
          Login
        </Button>
      </div>
    </div>
  );
}