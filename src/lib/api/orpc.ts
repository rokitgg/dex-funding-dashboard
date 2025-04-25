import { contract } from "./contracts";
import { implement } from "@orpc/server";

export const pub = implement(contract);
