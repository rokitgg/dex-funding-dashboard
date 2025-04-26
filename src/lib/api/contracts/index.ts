import { contract as health } from "@/lib/api/contracts/health";
import { contract as lighter } from "@/lib/api/contracts/lighter";
import { contract as hyperliquid } from "@/lib/api/contracts/hyperliquid";
import { getAggregatedFundingRates } from "@/lib/api/contracts/rates";
/**
 * Root contract for the API.
 * This contract is used to group all other contracts together into one single object.
 *
 * @see https://orpc.unnoq.com/docs/contract
 */
export const contract = {
  health,
  rates: {
    lighter,
    hyperliquid,
    getAggregatedFundingRates,
  },
};