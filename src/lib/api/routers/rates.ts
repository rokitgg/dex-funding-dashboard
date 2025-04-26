import { router as lighter } from "@/lib/api/routers/lighter";
import { router as hyperliquid } from "@/lib/api/routers/hyperliquid";
import { pub } from "../orpc";
import { HYPERLIQUID_UI_API_URL } from "@/lib/api/constants/hyperliquid";
import { HyperliquidFundingRatesSchema } from "@/lib/api/schemas/hyperliquid";
import { LIGHTER_MARKET_IDS } from "@/lib/api/constants/lighter";
import { LighterResponse } from "../schemas/lighter";

const getStartTimestamp = () => {
    const now = new Date();
    now.setHours(now.getHours() - 1);
    return now.getTime();
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithRetry(url: string, options: RequestInit, retries = 0, delayMs = 100): Promise<Response> {
  for (let i = 0; i <= retries; i++) {
    const res = await fetch(url, options);
    if (res.status !== 429) return res;
    if (i < retries) await delay(delayMs);
  }
  throw new Error("Rate limited after retries");
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
        const lighterResults: { coin: string, lighter: number | null }[] = [];
        for (const coin of coins) {
          const marketId = LIGHTER_MARKET_IDS[coin as keyof typeof LIGHTER_MARKET_IDS];
          if (marketId === undefined) {
            lighterResults.push({ coin, lighter: null });
            continue;
          }
          try {
            const url = `https://mainnet.zklighter.elliot.ai/api/v1/fundings?market_id=${marketId}&resolution=1h&start_timestamp=${getStartTimestamp()}&end_timestamp=${new Date().getTime()}&count_back=0`;
            const lighterRes = await fetchWithRetry(
              url,
              {
                headers: {
                  "Content-Type": "application/json",
                  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
                },
              },
              1, // retries: 0 means only one attempt
              100 // delay in ms between retries (not used if retries=0)
            );
            if (!lighterRes.ok) {
              lighterResults.push({ coin, lighter: null });
              continue;
            }
            const lighterData = await lighterRes.json();
            const parsedLighter = LighterResponse.safeParse(lighterData);
            if (!parsedLighter.success || !parsedLighter.data.fundings.length) {
              lighterResults.push({ coin, lighter: null });
              continue;
            }
            lighterResults.push({ coin, lighter: Number(parsedLighter.data.fundings[0].rate) });
          } catch (e) {
            lighterResults.push({ coin, lighter: null });
          }
          // Add a delay between each request to avoid rate limiting
          await delay(100); // 100ms between requests
        }
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