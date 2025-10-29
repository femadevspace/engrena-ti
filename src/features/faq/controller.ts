import { asc } from "drizzle-orm";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const faqRouter = createTRPCRouter({
  list: publicProcedure.query(async ({ ctx }) => {
    const faqs = await ctx.db.query.frequentlyAskedQuestions.findMany({
      orderBy: (faq) => [asc(faq.order), asc(faq.updatedAt)],
    });

    // Omite campos desnecessários para o cliente
    return faqs.map(({ question, answer }) => ({
      question,
      answer,
    }));
  }),
});
