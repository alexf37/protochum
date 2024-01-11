import { surveyRouter } from "@/server/api/routers/survey";
import { createTRPCRouter } from "@/server/api/trpc";
import { adminRouter } from "@/server/api/routers/admin";

export const appRouter = createTRPCRouter({
  survey: surveyRouter,
  admin: adminRouter,
});

export type AppRouter = typeof appRouter;
