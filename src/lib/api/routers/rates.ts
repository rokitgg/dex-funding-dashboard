import { router as lighter } from "@/lib/api/routers/lighter";
import { router as hyperliquid } from "@/lib/api/routers/hyperliquid";
import { pub } from "../orpc";
import { HYPERLIQUID_UI_API_URL } from "@/lib/api/contstants/hyperliquid";
import { HyperliquidFundingRatesSchema } from "@/lib/api/schemas/hyperliquid";
import { LIGHTER_MARKET_IDS } from "@/lib/api/contstants/lighter";
import { LighterResponse } from "../schemas/lighter";

const getStartTimestamp = () => {
    const now = new Date();
    now.setHours(now.getHours() - 1);
    return now.getTime();
}

export const getAggregatedFundingRates = pub.rates.getAggregatedFundingRates.handler(
    async ({ errors }) => {
      try {
        // 1. Fetch all funding rates from Hyperliquid
        const response = await fetch(HYPERLIQUID_UI_API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "predictedFundings" }),
        });
        if (!response.ok) throw new Error("Failed to fetch from Hyperliquid API");
        const data = await response.json();
        // console.log("Hyperliquid API raw response:", data);
        const filteredData = data.filter(([_, marketData]: [any, any]) => marketData !== null);
  
        // Prepare coins list and map for quick lookup
        const coins = filteredData.map(([coin]: [any, any]) => coin);
        const coinMarketMap = Object.fromEntries(filteredData);
  
        // 3. For each coin, fetch Lighter funding rate if available
        const lighterResults = await Promise.all(
          coins.map(async (coin: any) => {
            const marketId = LIGHTER_MARKET_IDS[coin as keyof typeof LIGHTER_MARKET_IDS];
            if (marketId === undefined) {
            //   console.log(`[Lighter] No marketId for coin: ${coin}`);
              return { coin, lighter: null };
            }
            try {
              const lighterRes = await fetch(
                `https://mainnet.zklighter.elliot.ai/api/v1/fundings?market_id=${marketId}&resolution=1h&start_timestamp=${getStartTimestamp()}&end_timestamp=${new Date().getTime()}&count_back=0`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
                    },
                }
              );
              if (!lighterRes.ok) {
                // console.log(`[Lighter] Bad response for coin: ${coin}, status: ${lighterRes.status}`);
                return { coin, lighter: null };
              }
              const lighterData = await lighterRes.json();
            //   console.log(`[Lighter] Raw data for coin ${coin}:`, lighterData);
              const parsedLighter = LighterResponse.safeParse(lighterData);
              if (!parsedLighter.success || !parsedLighter.data.fundings.length) {
                // console.log(`[Lighter] Parse failed or no fundings for coin: ${coin}`, parsedLighter.error);
                return { coin, lighter: null };
              }
              // Use the latest funding rate
              return { coin, lighter: parsedLighter.data.fundings[0].rate };
            } catch (e) {
            //   console.log(`[Lighter] Exception for coin: ${coin}`, e);
              return { coin, lighter: null };
            }
          })
        );
        const lighterMap = Object.fromEntries(
          lighterResults.map(({ coin, lighter }) => [coin, lighter])
        );
  
        // 4. Aggregate results
        const rates = coins.map((coin: any) => {
          const markets = coinMarketMap[coin] || [];
          const getAnnualized = (marketName: string) => {
            const found = markets.find(([m]: [any, any]) => m === marketName);
            if (
              !found ||
              !found[1] ||
              found[1].fundingRate === undefined ||
              found[1].fundingIntervalHours === undefined
            ) {
              return null;
            }
            const rate = Number(found[1].fundingRate);
            const interval = Number(found[1].fundingIntervalHours);
            if (!interval || isNaN(interval)) return null;
            const annualized = rate * (24 * 365) / interval * 100;
            return annualized.toString();
          };

          // Lighter: always 1h interval if present
          const lighterRate = lighterMap[coin];
          const lighterAnnualized = lighterRate !== null
            ? (Number(lighterRate) * 24 * 365).toString()
            : null;

          return {
            coin,
            hyperliquid: getAnnualized("HlPerp"),
            binance: getAnnualized("BinPerp"),
            bybit: getAnnualized("BybitPerp"),
            lighter: lighterAnnualized,
          };
        });
  
        return { rates };
      } catch (err) {
        console.error(err);
        throw errors.INTERNAL_SERVER_ERROR();
      }
    }
  );
  
export const router = {
    lighter,
    hyperliquid,
    getAggregatedFundingRates,
}