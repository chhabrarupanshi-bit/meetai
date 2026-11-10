import { db } from "../../../../config/db"; // aapka drizzle/prisma db path
import { agents } from "../../../../config/schema"; // aapka agents table schema
import { baseProcedure, createTRPCRouter } from "@/trpc/init";

import {TRPCError} from "@trpc/server";

export const agentsRouter = createTRPCRouter({
  getMany: baseProcedure.query(async () => {
    const data = await db.select().from(agents);

    // Simulate a delay of 5 seconds
    await new Promise((resolve) => setTimeout(resolve, 5000)); // Simulate a delay of 5 seconds

  //  throw new TRPCError({
    //  code: "INTERNAL_SERVER_ERROR",
      //message: "Simulated error for testing purposes"
    //}); // Simulate an error

    return data;
  }),
});