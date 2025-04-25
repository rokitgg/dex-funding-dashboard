import type { InferRouterOutputs } from "@orpc/server";
import type { router } from "../routers/root";

export type Outputs = InferRouterOutputs<typeof router>;