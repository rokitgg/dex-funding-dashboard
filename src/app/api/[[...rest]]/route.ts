import { router } from "@/lib/api/routers/root";
import { OpenAPIHandler } from "@orpc/openapi/fetch";
import { onError } from "@orpc/server";
import { ZodSmartCoercionPlugin } from "@orpc/zod";
import type { NextRequest } from "next/server";

const handler = new OpenAPIHandler(router, {
  interceptors: [
    onError((error) => {
      console.error(error);
    }),
  ],
  plugins: [new ZodSmartCoercionPlugin()],
});

async function handleRequest(request: NextRequest) {
  const { response } = await handler.handle(request, {
    prefix: "/api",
    context: {},
  });

  return response ?? new Response("Not found", { status: 404 });
}

export const GET = handleRequest;
export const POST = handleRequest;
export const PUT = handleRequest;
export const PATCH = handleRequest;
export const DELETE = handleRequest;