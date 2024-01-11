import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const adminRouter = createTRPCRouter({
  addQuestion: publicProcedure
    .input(
      z.discriminatedUnion("type", [
        z.object({
          type: z.literal("mcq"),
          prompt: z.string(),
          options: z.array(z.string()),
          includeOther: z.boolean(),
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
      return createdQuestion;
    }),
});
