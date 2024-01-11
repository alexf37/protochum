import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const surveyRouter = createTRPCRouter({
  example: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  getQuestions: publicProcedure.query(async ({ ctx }) => {
    const questions = await ctx.db.question.findMany();
    return questions;
  }),
});
