import { v } from "convex/values";
import { query } from "./_generated/server";
import { mustGetCurrentUser } from "./users";

export const getGeneral = query({
  args: {
    serverId: v.id("servers"),
  },
  handler: async (ctx, args) => {
    const user = await mustGetCurrentUser(ctx);
    if (!user) {
      throw new Error("Can't get current user.");
    }
    const checkUserIsServerMember = await ctx.db
      .query("memberships")
      .withIndex("by_user_server", (q) =>
        q.eq("userId", user._id).eq("serverId", args.serverId),
      )
      .unique();

    if (!checkUserIsServerMember) {
      throw new Error("Unauthorised");
    }

    const channel = await ctx.db
      .query("channels")
      .withSearchIndex("by_name", (q) => q.search("name", "general"))
      .unique();
    return channel;
  },
});

export const getByServer = query({
  args: {
    serverId: v.id("servers"),
  },
  handler: async (ctx, args) => {
    const user = await mustGetCurrentUser(ctx);
    if (!user) {
      throw new Error("Can't get current user.");
    }
    const checkUserIsServerMember = await ctx.db
      .query("memberships")
      .withIndex("by_user_server", (q) =>
        q.eq("userId", user._id).eq("serverId", args.serverId),
      )
      .unique();

    if (!checkUserIsServerMember) {
      throw new Error("Unauthorised");
    }

    const channels = await ctx.db
      .query("channels")
      .withIndex("by_server", (q) => q.eq("serverId", args.serverId))
      .collect();
    return channels;
  },
});
