import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const surveyRouter = createTRPCRouter({
  getQuestions: protectedProcedure.query(async ({ ctx }) => {
    const questions = await ctx.db.question.findMany();
    return questions;
  }),
  getFirstQuestion: publicProcedure.query(async ({ ctx }) => {
    const question = await ctx.db.question.findFirst({
      where: {
        previousQuestion: null,
      },
    });
    return question;
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
          nextQuestion: {
            select: {
              id: true,
            },
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
