import { Link } from "@tanstack/react-router";
import { Home, ShoppingBag, Image, MoreHorizontal } from "lucide-react";
import { SEASON_CONFIG } from "@/config/season";

const ICONS = { Home, ShoppingBag, Image, MoreHorizontal } as const;

export function BottomNav() {
  const { theme, bottomNav } = SEASON_CONFIG;
  return (
    <nav style={{
      position: "fixed", bottom: 0, left: 0, right: 0, background: theme.dark,
      display: "flex", justifyContent: "space-around", padding: ".5rem 0",
      borderTop: `1px solid ${theme.surface}`,
    }}>
      {bottomNav.map((item) => {
        const Icon = ICONS[item.icon as keyof typeof ICONS];
        return (
          <Link key={item.id} to="/dashboard" style={{
            color: theme.text, textDecoration: "none", fontSize: ".625rem", textAlign: "center",
          }}>
            <Icon size={20} />
            <div>{item.label}</div>
          </Link>
        );
      })}
    </nav>
  );
}
