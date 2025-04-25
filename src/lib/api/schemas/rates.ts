import { z } from "zod";


export const FundingRates = z.object({
    coin: z.string(),
    // Funding rate number, can be positive or negative
    hyperliquid: z.string(),
    lighter: z.string(),
    // pyth: z.number(),
});

export const FundingRatesResponse = z.object({
    rates: z.array(FundingRates),
});
