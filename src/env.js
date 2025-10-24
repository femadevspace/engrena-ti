import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    DATABASE_SCHEMA: z.string().default(""),
    AUTH_SECRET:
      process.env.NODE_ENV === "production"
        ? z.string()
        : z.string().optional(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
  },

  experimental__runtimeEnv: process.env,

  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: false,
});
