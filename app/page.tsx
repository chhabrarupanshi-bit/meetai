import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import  {HomeView}  from "./modules/home/ui/views/home-view";

export const instant = false;

const Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/sign-in");
  }

  // Session ko as a prop pass kar do
  return <HomeView session={session} />;
};

export default Page;