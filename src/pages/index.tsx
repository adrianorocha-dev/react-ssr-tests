export default function HomePage() {
  console.log("rendering home page");

  return (
    <div>
      <h1>HI MOM!</h1>

      <div style={{ display: "flex", gap: 16 }}>
        <a href="/about">About</a>
        <a href="/blog">Blog</a>
      </div>
    </div>
  );
}
