import type { ReactNode } from "react";

export default function Layout(props: { children: ReactNode }) {
  console.log("rendering about layout");
  return (
    <main>
      <header>
        <nav>
          <a href="/">Go back home</a>
        </nav>
      </header>

      {props.children}
    </main>
  );
}
