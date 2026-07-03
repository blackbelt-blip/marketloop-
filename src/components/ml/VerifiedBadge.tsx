import { BadgeCheck } from "lucide-react";
import { SEASON_CONFIG } from "@/config/season";

export function VerifiedBadge() {
  const { theme, texts } = SEASON_CONFIG;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, color: theme.primary, fontSize: ".75rem" }}>
      <BadgeCheck size={14} /> {texts.verified}
    </span>
  );
}
