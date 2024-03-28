import { v } from "convex/values";
import { query } from "./_generated/server";
import { mustGetCurrentUser, userById } from "./users";

export const get = query({
  args: {},
  handler: async (ctx, args) => {
    const user = await mustGetCurrentUser(ctx);
    if (!user) {
      throw new Error("Can't get current user.");
    }

    const memberships = await ctx.db
      .query("memberships")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .collect();
    return memberships;
  },
});

export const getByServer = query({
  args: { serverId: v.id("servers") },
  handler: async (ctx, args) => {
    const user = await mustGetCurrentUser(ctx);
    if (!user) {
      throw new Error("Can't get current user.");
    }

    const memberships = await ctx.db
      .query("memberships")
      .withIndex("by_server", (q) => q.eq("serverId", args.serverId))
      .collect();

    return Promise.all(
      memberships.map(async (member) => ({
        ...member,
        user: await userById(ctx, member.userId),
      })),
    );
  },
});
