import { db } from "../../../../config/db"; // aapka drizzle/prisma db path
import { agents } from "../../../../config/schema"; // aapka agents table schema
import { baseProcedure, createTRPCRouter , protectedProcedure} from "@/trpc/init";
import {eq} from "drizzle-orm";
import { z } from "zod";

import {TRPCError} from "@trpc/server";
import { agentsInsertSchema } from "../schema";

export const agentsRouter = createTRPCRouter({
  // TODO: Change 'getOne' to use 'protectedProcedure'


  getOne:protectedProcedure.input(z.object({id:z.string()})).query(async({input}) => {
    const [existingAgent] = await db.select().from(agents).where(eq(agents.id, input.id));

    return existingAgent;

  })
  ,     

  getMany: protectedProcedure.query(async () => {
    const data = await db.select().from(agents);

    // Simulate a delay of 5 seconds
    await new Promise((resolve) => setTimeout(resolve, 5000)); // Simulate a delay of 5 seconds

  //  throw new TRPCError({
    //  code: "INTERNAL_SERVER_ERROR",
      //message: "Simulated error for testing purposes"
    //}); // Simulate an error

    return data;
  }),

  create: protectedProcedure.input(agentsInsertSchema).mutation(async({input,ctx}) => {
   const [createdAgent] =  await db.insert(agents).values({
    ...input,
    userId: ctx.auth.user.id, // Assuming the user ID is available in the context
   }).returning();
   
   return createdAgent;

  }),
});