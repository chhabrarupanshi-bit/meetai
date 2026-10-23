import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../config/db";
import * as schema from "../config/schema"; // 👈 1. Schema import karein

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      ...schema, // 👈 2. Yahan schema pass karein
    },
  }),
});