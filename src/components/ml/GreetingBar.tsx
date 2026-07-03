import { MapPin } from "lucide-react";
import { SEASON_CONFIG } from "@/config/season";

export function GreetingBar({ name, location }: { name: string; location: string }) {
  const { theme, texts } = SEASON_CONFIG;
  return (
    <div style={{ padding: "1rem", background: theme.dark, color: theme.text }}>
      <div style={{ fontSize: ".75rem", color: theme.muted }}>{texts.greeting}</div>
      <div style={{ fontWeight: 700, fontSize: "1.125rem" }}>{name}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: ".75rem", color: theme.muted }}>
        <MapPin size={12} /> {location}
      </div>
    </div>
  );
}
