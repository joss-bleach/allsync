import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { mustGetCurrentUser } from "./users";

export const create = mutation({
  args: {
    channelId: v.id("channels"),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await mustGetCurrentUser(ctx);
    if (!user) {
      throw new Error("Can't get current user.");
    }

    const message = await ctx.db.insert("messages", {
      channelId: args.channelId,
      content: args.content,
      userId: user._id,
    });
    return message;
  },
});

export const remove = mutation({
  args: {
    id: v.id("messages"),
  },
  handler: async (ctx, args) => {
    const user = await mustGetCurrentUser(ctx);
    if (!user) {
      throw new Error("Can't get current user.");
    }

    const message = await ctx.db.get(args.id);
    if (!message) {
      throw new Error("Not found");
    }

    if (message.userId !== user._id) {
      throw new Error("Unauthorised");
    }

    await ctx.db.delete(args.id);
  },
});
