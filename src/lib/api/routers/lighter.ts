import { pub } from "../orpc";
import { BASE_API_URL, LIGHTER_RESOLUTION_TIMEFRAME, USER_AGENT, LIGHTER_MARKET_IDS  } from "../constants/lighter";
import { LighterResponse } from "../schemas/lighter";
import { z } from "zod";
// Timestamp of 1 hour ago
const getStartTimestamp = () => {
    const now = new Date();
    now.setHours(now.getHours() - 1);
    return now.getTime();
}

const getRateByCoin = pub.rates.lighter.getRateByCoin.handler(async ({ input, errors }) => {
        const url = `${BASE_API_URL}/fundings?market_id=${input.marketId}&resolution=${LIGHTER_RESOLUTION_TIMEFRAME}&start_timestamp=${getStartTimestamp()}&end_timestamp=${new Date().getTime()}&count_back=0`;
        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
            },
        });

        if (!response.ok) {
            throw errors.INTERNAL_SERVER_ERROR()
        }

        const data = await response.json();

        const parsedResponse = LighterResponse.safeParse(data);

        if (!parsedResponse.success) {
            throw errors.UNPROCESSABLE_CONTENT()
        }

        return parsedResponse.data;
    })

export const router = {
    getRateByCoin,
}

