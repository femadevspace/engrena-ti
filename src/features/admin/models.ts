import { appSchema, baseSchema } from "~/server/db/base";

export const adminUsers = appSchema.table("admin_user", (d) => ({
  ...baseSchema,
  name: d.varchar("name", { length: 256 }).notNull(),
  passwordHash: d.varchar("password_hash", { length: 256 }).notNull(),
}));

export type AdminUser = typeof adminUsers.$inferSelect;
