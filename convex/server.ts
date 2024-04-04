import { v } from "convex/values";
import ShortUniqueId from "short-unique-id";
import { mutation, query } from "./_generated/server";
import { mustGetCurrentUser } from "./users";

const uid = new ShortUniqueId({ length: 10 });

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
      inviteCode: uid.rnd(),
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

export const generateInviteCode = mutation({
  args: { serverId: v.id("servers") },
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

    const server = await ctx.db.patch(args.serverId, {
      inviteCode: uid.rnd(),
    });
    return server;
  },
});

export const get = query({
  args: { serverId: v.id("servers") },
  handler: async (ctx, args) => {
    const user = await mustGetCurrentUser(ctx);
    if (!user) {
      throw new Error("Can't get current user.");
    }

    const userHasMembershipAndIsAllowed = await ctx.db
      .query("memberships")
      .withIndex("by_user_server_role", (q) =>
        q
          .eq("userId", user._id)
          .eq("serverId", args.serverId)
          .eq("memberRole", "admin" || "moderator"),
      )
      .unique();

    if (!userHasMembershipAndIsAllowed) {
      throw new Error("Unauthorised");
    }

    const server = await ctx.db.get(args.serverId);
    if (!server) {
      throw new Error("Server not found");
    }

    return {
      ...server,
      imageUrl: await ctx.storage.getUrl(server.imageId),
    };
  },
});
