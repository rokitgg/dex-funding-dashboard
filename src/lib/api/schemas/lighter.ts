import { z } from "zod";

export const LighterResponse = z.object({
    code: z.number(),
    resolution: z.literal("1h"),
    fundings: z.array(z.object({
        timestamp: z.number(),
        value: z.string(),
        rate: z.string(),
        direction: z.enum(["long", "short"]),
    })),
});


