import { v } from "convex/values";
import { query } from "./_generated/server";
import { mustGetCurrentUser } from "./users";

export const getByChannel = query({
  args: {
    channelId: v.id("channels"),
  },
  handler: async (ctx, args) => {
    const user = await mustGetCurrentUser(ctx);
    if (!user) {
      throw new Error("Can't get current user.");
    }

    const messages = await ctx.db
      .query("messages")
      .withIndex("by_channel", (q) => q.eq("channelId", args.channelId))
      .order("asc")
      .collect();
    return messages;
  },
});
