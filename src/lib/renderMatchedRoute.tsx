import path from "node:path";
import type { MatchedRoute } from "bun";
import { renderToString } from "react-dom/server";
import type { ReactNode, ComponentType } from "react";

const FS_ROUTER_ROOT = path.resolve(import.meta.dir, "..", "pages");

async function loadLayoutsRecursively(
  layoutDir: string,
): Promise<ComponentType<{ children: ReactNode }>[]> {
  if (!layoutDir.includes(FS_ROUTER_ROOT)) {
    return [];
  }

  const upDir = path.resolve(layoutDir, "..");

  const upstreamLayouts = await loadLayoutsRecursively(upDir);

  const layoutPath = path.resolve(layoutDir, "_layout.tsx");

  if (!(await Bun.file(layoutPath).exists())) {
    return upstreamLayouts;
  }

  const { default: Layout } = await import(layoutPath);

  return [...upstreamLayouts, Layout];
}

function renderComponentWithLayouts(
  layouts: ComponentType<{ children: ReactNode }>[],
  Component: ComponentType,
) {
  let rendered = <Component />;

  for (const Layout of layouts.toReversed()) {
    rendered = <Layout>{rendered}</Layout>;
  }

  return rendered;
}

async function renderPageAndNestedLayouts(componentPath: string) {
  if (!componentPath.includes(FS_ROUTER_ROOT)) {
    return null;
  }

  const { default: Component } = await import(componentPath);

  if (typeof Component !== "function") {
    return null;
  }

  const layouts = await loadLayoutsRecursively(path.dirname(componentPath));

  return renderComponentWithLayouts(layouts, Component);
}

export async function renderMatchedRoute(matchedRoute: MatchedRoute) {
  const pageNode = await renderPageAndNestedLayouts(matchedRoute.filePath);

  return renderToString(pageNode);
}
