import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkUser: v.any(),
  }).index("by_clerk_id", ["clerkUser.id"]),
  memberships: defineTable({
    userId: v.id("users"),
    serverId: v.id("servers"),
    memberRole: v.union(
      v.literal("admin"),
      v.literal("moderator"),
      v.literal("guest"),
    ),
  })
    .index("by_user", ["userId"])
    .index("by_server", ["serverId"])
    .index("by_user_server", ["userId", "serverId"])
    .index("by_user_server_role", ["userId", "serverId", "memberRole"]),
  servers: defineTable({
    creatorId: v.id("users"),
    name: v.string(),
    inviteCode: v.string(),
    imageId: v.id("_storage"),
  }),
  channels: defineTable({
    serverId: v.id("servers"),
    name: v.string(),
    channelType: v.union(
      v.literal("text"),
      v.literal("audio"),
      v.literal("video"),
    ),
  })
    .index("by_server", ["serverId"])
    .index("by_channel_type", ["channelType"])
    .index("by_server_channel_type", ["serverId", "channelType"])
    .searchIndex("by_name", {
      searchField: "name",
      filterFields: ["serverId"],
    }),
});
