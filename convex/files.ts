import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { mustGetCurrentUser } from "./users";

export const generateUploadUrl = mutation(async (ctx) => {
  const user = await mustGetCurrentUser(ctx);
  if (!user) {
    throw new Error("Can't get current user.");
  }

  return await ctx.storage.generateUploadUrl();
});
