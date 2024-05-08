import type { ReactNode } from "react";

export default function Layout(props: { children: ReactNode }) {
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
