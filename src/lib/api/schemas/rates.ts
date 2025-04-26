import { z } from "zod";

export const FundingRates = z.object({
  coin: z.string(),
  hyperliquid: z.string().nullable(),
  binance: z.string().nullable(),
  bybit: z.string().nullable(),
  lighter: z.string().nullable(),
});

export const FundingRatesResponse = z.object({
  rates: z.array(FundingRates),
});