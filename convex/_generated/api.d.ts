/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * Generated by convex@1.10.0.
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as channel from "../channel.js";
import type * as channels from "../channels.js";
import type * as files from "../files.js";
import type * as http from "../http.js";
import type * as membership from "../membership.js";
import type * as memberships from "../memberships.js";
import type * as message from "../message.js";
import type * as messages from "../messages.js";
import type * as server from "../server.js";
import type * as servers from "../servers.js";
import type * as users from "../users.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  channel: typeof channel;
  channels: typeof channels;
  files: typeof files;
  http: typeof http;
  membership: typeof membership;
  memberships: typeof memberships;
  message: typeof message;
  messages: typeof messages;
  server: typeof server;
  servers: typeof servers;
  users: typeof users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
