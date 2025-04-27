import { OpenAPIGenerator } from "@orpc/openapi";
import { ZodToJsonSchemaConverter } from "@orpc/zod";
import { contract } from "@/lib/api/contracts";

const openAPIGenerator = new OpenAPIGenerator({
  schemaConverters: [new ZodToJsonSchemaConverter()],
});

export async function GET(request: Request) {
  const spec = await openAPIGenerator.generate(contract, {
    info: {
      title: "Funding Rates Dashboard",
      version: "1.0.0",
    },
    servers: [{ url: "/api" /** Should use absolute URLs in production */ }],
  });

  return new Response(JSON.stringify(spec), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}