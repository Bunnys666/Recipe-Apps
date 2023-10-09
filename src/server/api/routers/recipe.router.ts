import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

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

  deleted: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const res = await ctx.db.recipes.findMany({
        where: {
          id: input.id,
          userId: ctx.auth.userId,
        },
      });
      return res;
    }),

  // get all the recipes
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.recipes.findMany({});
  }),

  // get all the recipes for a specific user
  getUser: protectedProcedure.query(({ ctx }) => {
    return ctx.db.recipes.findMany({
      where: {
        userId: ctx.auth.userId,
      },
    });
  }),
});
