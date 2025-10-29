import { relations } from "drizzle-orm";
import { appSchema, baseSchema } from "~/server/db/base";
import { adminUsers } from "../admin/models";

export const frequentlyAskedQuestions = appSchema.table("faq", (d) => ({
  ...baseSchema,
  order: d.integer("order").notNull().default(0),
  question: d.text("question").notNull(),
  answer: d.text("answer").notNull(),

  createdByAdminId: d
    .uuid()
    .references(() => adminUsers.id, { onDelete: "set null" }),
  updatedByAdminId: d
    .uuid()
    .references(() => adminUsers.id, { onDelete: "set null" }),
}));

export type FrequentlyAskedQuestion =
  typeof frequentlyAskedQuestions.$inferSelect;

export const frequentlyAskedQuestionsRelations = relations(
  frequentlyAskedQuestions,
  ({ one }) => ({
    createdByAdmin: one(adminUsers, {
      fields: [frequentlyAskedQuestions.createdByAdminId],
      references: [adminUsers.id],
    }),
    updatedByAdmin: one(adminUsers, {
      fields: [frequentlyAskedQuestions.updatedByAdminId],
      references: [adminUsers.id],
    }),
  }),
);
