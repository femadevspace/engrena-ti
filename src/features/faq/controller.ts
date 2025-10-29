import { asc, eq, inArray, sql, type SQL } from "drizzle-orm";
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
      columns: {
        question: true,
        answer: true,
      },
    });

    return faqs;
  }),

  reorder: adminProcedure
    .input(z.array(z.string().uuid()).nonempty())
    .mutation(async ({ input, ctx }) => {
      const adminId = ctx.session.user.id;

      const sqlChunks: SQL[] = [sql`(case`];
      input.forEach((faqId, index) =>
        sqlChunks.push(
          sql`when ${frequentlyAskedQuestions.id} = ${faqId} then ${index}`,
        ),
      );
      sqlChunks.push(sql`end)`);

      await ctx.db
        .update(frequentlyAskedQuestions)
        .set({
          /**
           * Atualiza a ordem das FAQs utilizando uma única request ao banco de dados.
           * @see https://orm.drizzle.team/docs/guides/update-many-with-different-value
           */
          order: sql.join(sqlChunks, sql.raw(" ")),
          updatedByAdminId: adminId,
        })
        .where(inArray(frequentlyAskedQuestions.id, input));

      return { success: true, message: "Ordem atualizada com sucesso!" };
    }),

  update: adminProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        question: z.string().nonempty(),
        answer: z.string().nonempty(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const adminId = ctx.session.user.id;

      await ctx.db
        .update(frequentlyAskedQuestions)
        .set({
          question: input.question,
          answer: input.answer,
          updatedByAdminId: adminId,
        })
        .where(eq(frequentlyAskedQuestions.id, input.id));

      return { success: true, message: "FAQ atualizada com sucesso!" };
    }),

  delete: adminProcedure
    .input(z.string().uuid())
    .mutation(async ({ input, ctx }) => {
      await ctx.db
        .delete(frequentlyAskedQuestions)
        .where(eq(frequentlyAskedQuestions.id, input));

      return { success: true, message: "FAQ deletada com sucesso!" };
    }),
});
