import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const adminRouter = createTRPCRouter({
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
          )
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
          index: 1,
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
        answerChoices
      };
    }),
});
