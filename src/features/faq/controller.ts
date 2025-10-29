import { asc } from "drizzle-orm";
import z from "zod";
import {
  adminProcedure,
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import { frequentlyAskedQuestions } from "./models";

export const faqRouter = createTRPCRouter({
  create: adminProcedure
    .input(
      z.object({
        question: z.string().nonempty(),
        answer: z.string().nonempty(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const adminId = ctx.session.user.id;

      await ctx.db.insert(frequentlyAskedQuestions).values({
        question: input.question,
        answer: input.answer,
        createdByAdminId: adminId,
        updatedByAdminId: adminId,
      });

      return { success: true, message: "FAQ registrada com sucesso!" };
    }),

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
