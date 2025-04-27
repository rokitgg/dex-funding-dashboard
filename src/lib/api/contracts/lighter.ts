import { HealthCheckResponse } from "@/lib/api/schemas/health";
import type { HealthCheck } from "@/lib/api/types/health";
import { oc } from "@orpc/contract";
import  { z } from "zod";
import { LighterResponse } from "../schemas/lighter";



export const getFundingRateByTicker = oc
  .route({
    summary: "Funding Rate by Ticker",
    method: "GET",
    description: "Get Lighter's funding rate by ticker",
    deprecated: false,
    tags: ["Lighter"],
  })
  .input(z.object({
    // ticker of the coin
    ticker: z.string().describe("Ticker of the coin")
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
  getFundingRateByTicker,
}