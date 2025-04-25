import type { InferRouterInputs } from "@orpc/server";
import type { router } from "../routers/root";

export type Inputs = InferRouterInputs<typeof router>;