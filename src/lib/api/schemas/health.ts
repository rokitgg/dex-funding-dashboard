import { z } from "zod";

export const HealthCheckResponse = z.object({
  status: z.enum(["ok", "fail", "warn"]),
  version: z.string().default("1.0.0"),
  description: z.string().optional(),
  notes: z.array(z.string()).optional().default([]),
  checks: z
    .record(
      z.array(
        z.object({
          componentId: z.string().optional(),
          componentType: z
            .enum(["component", "datastore", "system"])
            .optional(),
          observedValue: z.any().optional(),
          observedUnit: z.string().optional(),
          status: z.enum(["ok", "fail", "warn"]).optional(),
          time: z.string().optional(),
          output: z.string().optional(),
        }),
      ),
    )
    .optional(),
  links: z.record(z.string()).optional(),
});