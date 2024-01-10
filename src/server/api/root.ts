import { surveyRouter } from "@/server/api/routers/survey";
import { createTRPCRouter } from "@/server/api/trpc";

export const appRouter = createTRPCRouter({
  survey: surveyRouter,
});

export type AppRouter = typeof appRouter;
