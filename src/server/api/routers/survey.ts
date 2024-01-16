import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const surveyRouter = createTRPCRouter({
  example: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  getQuestions: protectedProcedure.query(async ({ ctx }) => {
    const questions = await ctx.db.question.findMany();
    return questions;
  }),
  getQuestionByNumber: publicProcedure
    .input(z.number())
    .query(async ({ input, ctx }) => {
      const question = await ctx.db.question.findMany({
        where: {
          index: input,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      });
      return question[0];
    }),
  getQuestionById: publicProcedure
    .input(
      z.object({
        id: z.string(),
        email: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const question = await ctx.db.question.findUnique({
        where: {
          id: input.id,
        },
        include: {
          answerChoices: {
            select: {
              id: true,
              content: true,
              index: true,
              requireElaboration: true,
            },
            orderBy: {
              index: "asc",
            },
          },
          responses: {
            where: {
              user: {
                email: input.email,
              },
            },
            select: {
              answerChoice: true,
              textContent: true,
            },
            orderBy: {
              createdAt: "desc",
            },
            take: 1,
          },
        },
      });
      return {
        ...question,
        response: question ? question.responses[0] : undefined,
      };
    }),
  beginSurvey: publicProcedure
    .input(
      z.object({
        name: z.string().min(1, {
          message: "Name must be at least 1 character.",
        }),
        email: z.string().email({
          message: "Please enter a valid email address.",
        }),
      }),
    )
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.user.upsert({
        where: {
          email: input.email,
        },
        update: {
          name: input.name,
        },
        create: {
          email: input.email,
          name: input.name,
        },
      });
      return {
        name: user.name,
        email: user.email,
      };
    }),
});
