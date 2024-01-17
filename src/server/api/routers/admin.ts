import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const adminRouter = createTRPCRouter({
  //not yet used??
  addQuestionWithAnswerChoices: publicProcedure
    .input(
      z.discriminatedUnion("type", [
        z.object({
          type: z.literal("mcq"),
          prompt: z.string(),
          options: z.array(z.string()),
          includeOther: z.boolean(),
          answerChoices: z.array(
            z.object({
              content: z.string(),
              requireElaboration: z.boolean(),
            }),
          ),
        }),
        z.object({
          type: z.literal("frq"),
          prompt: z.string(),
        }),
      ]),
    )
    .mutation(async ({ ctx, input }) => {
      const createdQuestion = await ctx.db.question.create({
        data: {
          type: input.type,
          content: input.prompt,
          createdAt: new Date().toISOString(),
        },
      });
      const questionId = createdQuestion.id;
      const answerChoices = await ctx.db.answerChoice.createMany({
        data: [
          {
            questionId,
            content: "Choice A",
          },
          {
            questionId,
            content: "Choice B",
          },
          {
            questionId,
            content: "Choice C",
          },
          {
            questionId,
            content: "Choice D",
          },
        ],
      });
      return {
        question: createdQuestion,
        answerChoices,
      };
    }),

  deleteQuestionById: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const deletedQuestion = await ctx.db.question.delete({
        where: {
          id: input,
        },
        select: {
          nextQuestionId: true,
          previousQuestion: {
            select: {
              id: true,
            },
          },
        },
      });
      if (!deletedQuestion.previousQuestion?.id) return "success";
      await ctx.db.question.update({
        where: {
          id: deletedQuestion.previousQuestion?.id,
        },
        data: {
          nextQuestionId: deletedQuestion.nextQuestionId,
        },
      });
      return "success";
    }),
});
