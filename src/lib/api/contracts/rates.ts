// ... existing imports ...
import { oc } from "@orpc/contract";
import { z } from "zod";
import { FundingRatesResponse } from "../schemas/rates";

export const getAggregatedFundingRates = oc
  .route({
    summary: "Aggregated Funding Rates",
    method: "GET",
    description: "Get aggregated, annualized funding rates for all coins.",
    deprecated: false,
    tags: ["Dashboard"],
  })
  .output(FundingRatesResponse)
  .errors({
    INTERNAL_SERVER_ERROR: {
      message: "Something went wrong. Please try again later.",
    },
  });
