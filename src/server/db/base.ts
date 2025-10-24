import { pgSchema, timestamp, uuid } from "drizzle-orm/pg-core";
import { env } from "~/env";

export const appSchema =
  env.DATABASE_SCHEMA.length > 0 || env.DATABASE_SCHEMA !== "public"
    ? pgSchema(env.DATABASE_SCHEMA)
    : // @ts-expect-error: `pgSchema` requer 1 argumento, mas o Drizzle exige nenhum caso seja "public"
      pgSchema();

export const baseSchema = {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
} as const;
