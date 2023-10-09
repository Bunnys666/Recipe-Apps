import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import { getAuth } from "@clerk/nextjs/server";
import type {
  SignedInAuthObject,
  SignedOutAuthObject,
} from "@clerk/nextjs/api";
import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { db } from "../db";

interface AuthContext {
  auth: SignedInAuthObject | SignedOutAuthObject;
}

const createInnerTRPCContext = ({ auth }: AuthContext) => {
  return {
    auth,
    db,
  };
};

export const createTRPCContext = (opts: CreateNextContextOptions) => {
  return createInnerTRPCContext({ auth: getAuth(opts.req) });
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

const isAuthed = t.middleware(({ next, ctx }) => {
  if (!ctx.auth.userId) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: {
      auth: ctx.auth,
    },
  });
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);
