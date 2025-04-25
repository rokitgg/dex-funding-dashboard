import { z } from "zod";

export const LighterResponse = z.object({
    code: z.number().default(200),
    resolution: z.string().default("1h"),
    fundings: z.array(z.object({
        timestamp: z.number(),
        value: z.string(),
        rate: z.string(),
        direction: z.string()
    })),
});


