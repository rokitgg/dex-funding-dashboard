import { z } from "zod";

export const FundingDataSchema = z.object({
  fundingRate: z.string(),
  nextFundingTime: z.number(),
  fundingIntervalHours: z.number().optional(),
});

export const MarketFundingSchema = z.tuple([
  z.string(), // e.g., "BinPerp", "HlPerp", "BybitPerp"
  FundingDataSchema
]);

export const SymbolFundingSchema = z.tuple([
  z.string(), // e.g., "AAVE"
  z.array(MarketFundingSchema),
]);

export const HyperliquidFundingRatesSchema = z.array(SymbolFundingSchema);

// TypeScript type for convenience
export type HyperliquidFundingRates = z.infer<typeof HyperliquidFundingRatesSchema>;
