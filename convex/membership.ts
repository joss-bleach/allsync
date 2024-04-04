import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { mustGetCurrentUser, userById } from "./users";

export const create = mutation({
  args: { inviteCode: v.string() },
  handler: async (ctx, args) => {
    const user = await mustGetCurrentUser(ctx);
    if (!user) {
      throw new Error("Can't get current user.");
    }

    const getServerByInviteCode = await ctx.db
      .query("servers")
      .withIndex("by_invite_code", (q) => q.eq("inviteCode", args.inviteCode))
      .unique();
    if (!getServerByInviteCode) {
      throw new Error("Invalid invite code");
    }

    const membershipAlreadyExists = await ctx.db
      .query("memberships")
      .withIndex("by_user_server", (q) =>
        q.eq("userId", user._id).eq("serverId", getServerByInviteCode._id),
      )
      .unique();
    if (membershipAlreadyExists) {
      return membershipAlreadyExists.serverId;
    }

    const membership = await ctx.db.insert("memberships", {
      userId: user._id,
      serverId: getServerByInviteCode._id,
      memberRole: "guest",
    });
    if (!membership) {
      throw new Error("Error creating membership");
    }

    return getServerByInviteCode._id;
  },
});

export const getGuestRole = query({
  args: {
    serverId: v.id("servers"),
  },
  handler: async (ctx, args) => {
    const user = await mustGetCurrentUser(ctx);
    if (!user) {
      throw new Error("Can't get current user.");
    }

    const role = await ctx.db
      .query("memberships")
      .withIndex("by_user_server_role", (q) =>
        q
          .eq("userId", user._id)
          .eq("serverId", args.serverId)
          .eq("memberRole", "guest"),
      )
      .unique();
    if (role) {
      return true;
    } else {
      return false;
    }
  },
});

export const getRole = query({
  args: {
    channelId: v.id("channels"),
    userId: v.id("users"),
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

    const membership = await ctx.db
      .query("memberships")
      .withIndex("by_user_server", (q) =>
        q.eq("userId", args.userId).eq("serverId", channel.serverId),
      )
      .unique();

    return membership?.memberRole;
  },
});
