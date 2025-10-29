import { appSchema, baseSchema } from "~/server/db/base";

export const adminUsers = appSchema.table("admin_user", (d) => ({
  ...baseSchema,
  nickname: d.varchar("nickname", { length: 128 }).notNull().unique(),
  fullName: d.varchar("fullname", { length: 256 }).notNull(),
  passwordHash: d.varchar("password_hash", { length: 256 }).notNull(),
}));

export type AdminUser = typeof adminUsers.$inferSelect;
