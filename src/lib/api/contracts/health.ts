import { HealthCheckResponse } from "@/lib/api/schemas/health";
import type { HealthCheck } from "@/lib/api/types/health";
import { oc } from "@orpc/contract";
import type { z } from "zod";

// Base contract, defines common errors for health contract
const base = oc.errors({
  INTERNAL_SERVER_ERROR: {
    message: "Something went wrong. Please try again later.",
  },
});

export const health = oc
  .route({
    summary: "Health Check",
    method: "GET",
    description: "Check if the API is operational and in good health.",
    deprecated: false,
    tags: ["Health"],
  })
  .output(HealthCheckResponse satisfies z.ZodType<HealthCheck>);

export const contract = health;