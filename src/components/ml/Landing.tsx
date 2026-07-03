import { Link } from "@tanstack/react-router";
import { SEASON_CONFIG } from "@/config/season";
import { InstallPrompt } from "./InstallPrompt";

export function Landing() {
  const { theme, texts, categories } = SEASON_CONFIG;
  return (
    <main style={{ background: theme.bg, color: theme.text, minHeight: "100vh", padding: "1rem" }}>
      <header style={{ padding: "2rem 0", textAlign: "center" }}>
        <h1 style={{ color: theme.primary, fontSize: "2rem", margin: 0 }}>{texts.appName}</h1>
        <p style={{ color: theme.muted, marginTop: ".5rem" }}>{texts.tagline}</p>
      </header>
      <section style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: ".75rem", marginBottom: "1.5rem" }}>
        {categories.map((c) => (
          <div key={c.id} style={{ background: theme.surface, padding: "1rem", borderRadius: 12, textAlign: "center" }}>
            <div style={{ fontSize: "1.5rem" }}>{c.emoji}</div>
            <div style={{ fontSize: ".75rem", color: theme.muted }}>{c.label}</div>
          </div>
        ))}
      </section>
      <Link to="/register" style={{
        display: "block", background: theme.primary, color: "#000",
        padding: "1rem", borderRadius: 999, textAlign: "center", fontWeight: 700, textDecoration: "none",
      }}>{texts.ctaRegister}</Link>
      <InstallPrompt />
    </main>
  );
}
