import { pub } from "@/lib/api/orpc";
import { router as rates } from "@/lib/api/routers/rates";
/**
 * Root router for the API.
 *
 * This router is used to group all the routers together.
 *
 * @see https://orpc.unnoq.com/docs/router
 */

export const router = pub.router({
  health: pub.health.handler(() => {
    return {
      status: "ok",
      version: "1.0.0",
      description: "API is running",
      checks: {
        uptime: [
          {
            componentType: "system",
            observedValue: process.uptime(),
            observedUnit: "s",
            status: "ok",
            time: new Date().toISOString(),
          },
        ],
      },
      links: {
        documentation: "https://funding-rates-dashboard.vercel.app/api/docs",
        specification: "https://funding-rates-dashboard.vercel.app/api/spec",
      },
    };
  }),
  rates,
});