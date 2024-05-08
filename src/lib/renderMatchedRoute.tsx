import path from "node:path";
import type { MatchedRoute } from "bun";
import { renderToString } from "react-dom/server";

const FS_ROUTER_ROOT = path.resolve(import.meta.dir, "..", "pages");

async function renderPageAndNestedLayoutsRecursively(componentPath: string) {
  if (!componentPath.includes(FS_ROUTER_ROOT)) {
    return null;
  }

  const componentDir = path.dirname(componentPath);
  const layoutPath = path.resolve(componentDir, "_layout.tsx");

  const { default: Layout } = await import(layoutPath);
  const { default: Component } = await import(componentPath);

  if (typeof Component !== "function") {
    return null;
  }

  if (typeof Layout !== "function") {
    return <Component />;
  }

  return (
    <Layout>
      <Component />
    </Layout>
  );
}

export async function renderMatchedRoute(matchedRoute: MatchedRoute) {
  const pageNode = await renderPageAndNestedLayoutsRecursively(
    matchedRoute.filePath,
  );

  return renderToString(pageNode);
}
