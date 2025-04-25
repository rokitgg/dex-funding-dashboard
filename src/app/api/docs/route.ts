const html = `
<!doctype html>
<html>
<head>
    <title>Starter Kit API</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/svg+xml" href="https://orpc.unnoq.com/icon.svg" />
</head>
<body>
    <script
      id="api-reference"
      data-url="/api/spec"
      data-configuration="${JSON.stringify({
        authentication: {
          preferredSecurityScheme: "bearerAuth",
          http: {
            bearer: {
              token: "default-token",
            },
          },
        },
      }).replaceAll('"', "&quot;")}"></script>
    <script src="https://cdn.jsdelivr.net/npm/@scalar/api-reference"></script>
</body>
</html>
`;

export function GET() {
  return new Response(html, {
    headers: {
      "Content-Type": "text/html",
    },
  });
}