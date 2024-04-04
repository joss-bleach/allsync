import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { mustGetCurrentUser } from "./users";

export const create = mutation({
  args: {
    serverId: v.id("servers"),
    name: v.string(),
    channelType: v.union(
      v.literal("text"),
      v.literal("audio"),
      v.literal("video"),
    ),
  },
  handler: async (ctx, args) => {
    const user = await mustGetCurrentUser(ctx);
    if (!user) {
      throw new Error("Can't get current user.");
    }
    const checkUserIsServerMemberAndHasPermission = await ctx.db
      .query("memberships")
      .withIndex("by_user_server_role", (q) =>
        q
          .eq("userId", user._id)
          .eq("serverId", args.serverId)
          .eq("memberRole", "admin" || "moderator"),
      );
    if (!checkUserIsServerMemberAndHasPermission) {
      throw new Error("Unauthorised");
    }

    if (args.name === "general") {
      throw new Error("Cannot create a general channel");
    }

    const channel = await ctx.db.insert("channels", {
      serverId: args.serverId,
      name: args.name,
      channelType: args.channelType,
    });
    if (!channel) {
      throw new Error("Error creating channel");
    }

    return channel;
  },
});
