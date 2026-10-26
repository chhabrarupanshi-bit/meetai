import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../config/db";
import * as schema from "../config/schema"; // 👈 1. Schema import karein

export const auth = betterAuth({
    socialProviders: {
        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        },
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },


    emailAndPassword: {
        enabled: true,
    },

    // 👇 Yeh part add karo
    account: {
        accountLinking: {
            enabled: true,
            trustedProviders: ["google", "github"], // Dono social providers ko allow karo
        },
    },

    database: drizzleAdapter(db, {
        provider: "pg",
        schema: {
            ...schema, // 👈 2. Yahan schema pass karein
        },
    }),
});