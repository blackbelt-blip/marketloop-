import { SEASON_CONFIG } from "@/config/season";

export function StatsGrid({ stats }: { stats: { label: string; value: string | number }[] }) {
  const { theme } = SEASON_CONFIG;
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: ".5rem", padding: "1rem" }}>
      {stats.map((s) => (
        <div key={s.label} style={{ background: theme.surface, padding: ".75rem", borderRadius: 12, textAlign: "center" }}>
          <div style={{ fontSize: "1.25rem", fontWeight: 700, color: theme.primary }}>{s.value}</div>
          <div style={{ fontSize: ".625rem", color: theme.muted }}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}
