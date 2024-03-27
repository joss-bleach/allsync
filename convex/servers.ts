import { v } from "convex/values";
import { query } from "./_generated/server";
import { mustGetCurrentUser } from "./users";

// Helpers
import { getAllOrThrow } from "convex-helpers/server/relationships";

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

    const serverIds = memberships.map((member) => member.serverId);
    const servers = getAllOrThrow(ctx.db, serverIds);
    return servers;
  },
});
