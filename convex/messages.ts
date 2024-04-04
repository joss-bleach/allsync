import { v } from "convex/values";
import { query } from "./_generated/server";
import { mustGetCurrentUser } from "./users";
import { getAllOrThrow } from "convex-helpers/server/relationships";

export const getByChannel = query({
  args: {
    channelId: v.id("channels"),
  },
  handler: async (ctx, args) => {
    const user = await mustGetCurrentUser(ctx);
    if (!user) {
      throw new Error("Can't get current user.");
    }
    const channel = await ctx.db.get(args.channelId);
    if (!channel) {
      throw new Error("Channel not found");
    }

    const messages = await ctx.db
      .query("messages")
      .withIndex("by_channel", (q) => q.eq("channelId", args.channelId))
      .order("asc")
      .collect();

    const userIds = messages.map((message) => message.userId);
    const users = await getAllOrThrow(ctx.db, userIds);

    const userMap = new Map(users.map((user) => [user._id, user]));

    return messages.map((message) => {
      const user = userMap.get(message.userId);
      return {
        ...message,
        user,
      };
    });
  },
});
