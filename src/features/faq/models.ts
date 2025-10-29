import { appSchema, baseSchema } from "~/server/db/base";

export const frequentlyAskedQuestions = appSchema.table("faq", (d) => ({
  ...baseSchema,
  order: d.integer("order").notNull().default(0),
  question: d.text("question").notNull(),
  answer: d.text("answer").notNull(),
}));

export type FrequentlyAskedQuestion =
  typeof frequentlyAskedQuestions.$inferSelect;
