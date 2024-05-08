import { renderMatchedRoute } from "./lib/renderMatchedRoute";

const router = new Bun.FileSystemRouter({
  style: "nextjs",
  dir: "./src/pages",
  origin: "http://localhost:3000",
  assetPrefix: "_next/static/",
});

const server = Bun.serve({
  async fetch(req) {
    const route = router.match(req.url);

    if (!route) {
      return new Response(null, { status: 404 });
    }

    const renderedRoute = await renderMatchedRoute(route);

    const headers = new Headers();
    headers.append("Content-Type", "text/html");

    return new Response(renderedRoute, { headers });
  },
  port: 3000,
});

console.log(`Server running at ${server.url}`);
