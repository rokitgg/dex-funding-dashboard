import { HealthCheckResponse } from "@/lib/api/schemas/health";
import type { HealthCheck } from "@/lib/api/types/health";
import { oc } from "@orpc/contract";
import  { z } from "zod";
import { LighterResponse } from "../schemas/lighter";



export const getRateByCoin = oc
  .route({
    summary: "Funding Rate by Coin",
    method: "GET",
    description: "Get Lighter's funding rate by Market ID",
    deprecated: false,
    tags: ["Lighter"],
  })
  .input(z.object({
    // market_id of the coin
    marketId: z.number(),
  }))
  .output(LighterResponse)
  .errors({
    INTERNAL_SERVER_ERROR: {
      message: "Something went wrong. Please try again later.",
    },
    UNPROCESSABLE_CONTENT: {
      message: "The request was valid but the server was unable to process it.",
    },
  });

export const contract = {
  getRateByCoin,
}