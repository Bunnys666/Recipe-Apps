import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const recipeRouter = createTRPCRouter({
  created: protectedProcedure
    .input(
      z.object({
        name: z.string().min(3).max(20).nonempty(),
        ingredient: z.string().min(3).nonempty(),
        description: z.string().min(3).max(20).nonempty(),
        type: z.string().min(3).max(20).nonempty(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.recipes.create({
        data: {
          ...input,
          userId: ctx.auth.userId,
        },
      });
    }),
});
