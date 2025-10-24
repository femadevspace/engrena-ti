import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
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
