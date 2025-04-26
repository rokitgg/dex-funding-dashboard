import { oc } from "@orpc/contract";
import { z } from "zod";
import { FundingDataSchema } from "@/lib/api/schemas/hyperliquid";

/**
 * Input: { ticker: string }
 * Output: FundingDataSchema (for the requested ticker/coin)
 */
export const getFundingRateByTicker = oc
  .route({
    summary: "Funding Rate by Ticker",
    method: "GET",
    description: "Get Hyperliquid's funding rate for a specific coin by ticker",
    deprecated: false,
    tags: ["Hyperliquid"],
  })
  .input(z.object({
    ticker: z.string().describe("Ticker symbol of the coin, e.g., 'ETH'"),
  }))
  .output(
    z.object({
      ticker: z.string(),
      markets: z.array(
        z.object({
          market: z.string(),
          funding: FundingDataSchema
        })
      ),
    })
  )
  .errors({
    INTERNAL_SERVER_ERROR: {
      message: "Something went wrong. Please try again later.",
    },
    NOT_FOUND: {
      message: "No funding data found for the specified ticker.",
    },
    UNPROCESSABLE_CONTENT: {
      message: "The request was valid but the server was unable to process it.",
    },
  });

export const contract = {
  getFundingRateByTicker,
};
