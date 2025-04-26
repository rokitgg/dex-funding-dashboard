import { HYPERLIQUID_UI_API_URL } from "@/lib/api/contstants/hyperliquid";
import { pub } from "@/lib/api/orpc";
import { HyperliquidFundingRatesSchema } from "@/lib/api/schemas/hyperliquid";


export const getFundingRateByTicker = pub.rates.hyperliquid.getFundingRateByTicker
  .handler(async ({ input, errors }) => {
    try {
      // Fetch funding data from Hyperliquid
      const response = await fetch(HYPERLIQUID_UI_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "predictedFundings" }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch from Hyperliquid API");
      }

      const data = await response.json();

      // Validate the response structure
      const parsed = HyperliquidFundingRatesSchema.safeParse(data);
      if (!parsed.success) {
        throw new Error("Invalid response from Hyperliquid API");
      }

      // Find the entry for the requested ticker
      const [ticker, markets] = parsed.data.find(
        ([symbol]) => symbol.toUpperCase() === input.ticker.toUpperCase()
      ) || [];

      if (!ticker || !markets) {
        // Not found
        throw errors.NOT_FOUND();
      }

      // Format the output as per contract
      return {
        ticker,
        markets: markets.map(([market, funding]) => ({
          market,
          funding,
        })),
      };
    } catch (err: any) {
      if (err?.code === "NOT_FOUND") throw err;
      throw errors.INTERNAL_SERVER_ERROR();
    }
  });


export const router = {
    getFundingRateByTicker,
};
