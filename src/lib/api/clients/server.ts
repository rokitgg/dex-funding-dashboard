/**
 * Creates a server-side oRPC client.
 * @see https://orpc.unnoq.com/docs/client/server-side#router-client
 */

import { createRouterClient } from "@orpc/server";

import { router } from "@/lib/api/routers/root";

// Server-side API caller
export const api = createRouterClient(router, {
  context: {}, // Provide initial context if needed
});