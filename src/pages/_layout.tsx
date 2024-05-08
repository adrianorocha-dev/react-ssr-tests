import type { ReactNode } from "react";

export default function Layout(props: { children: ReactNode }) {
  console.log("rendering home layout");
  return (
    <html lang="en">
      <head>
        <title>My react server side page</title>
      </head>

      <body>{props.children}</body>
    </html>
  );
}
