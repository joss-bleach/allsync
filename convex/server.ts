import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { mustGetCurrentUser } from "./users";

export const create = mutation({
  args: {
    name: v.string(),
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    const user = await mustGetCurrentUser(ctx);
    if (!user) {
      throw new Error("Can't get current user.");
    }

    const server = await ctx.db.insert("servers", {
      creatorId: user._id,
      name: args.name,
      imageId: args.storageId,
    });
    if (!server) {
      throw new Error("Error creating server");
    }

    const membership = await ctx.db.insert("memberships", {
      userId: user._id,
      serverId: server,
      memberRole: "admin",
    });
    if (!membership) {
      throw new Error("Error creating server membership");
    }

    const channel = await ctx.db.insert("channels", {
      serverId: server,
      name: "general",
      channelType: "text",
    });
    if (!channel) {
      throw new Error("Error creating general channel");
    }

    return server;
  },
});
