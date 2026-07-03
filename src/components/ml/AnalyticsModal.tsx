import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { SEASON_CONFIG } from "@/config/season";

export function AnalyticsModal({
  open, onClose, data,
}: {
  open: boolean;
  onClose: () => void;
  data: { day: string; views: number; clicks: number }[];
}) {
  const { theme } = SEASON_CONFIG;
  if (!open) return null;
  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,.7)", display: "flex",
      alignItems: "flex-end", zIndex: 50,
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: theme.surface, width: "100%", padding: "1rem", borderTopLeftRadius: 16, borderTopRightRadius: 16,
      }}>
        <h3 style={{ margin: "0 0 1rem", color: theme.text }}>Last 7 days</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data}>
            <XAxis dataKey="day" stroke={theme.muted} />
            <YAxis stroke={theme.muted} />
            <Tooltip contentStyle={{ background: theme.dark, border: 0, color: theme.text }} />
            <Bar dataKey="views" fill={theme.primary} />
            <Bar dataKey="clicks" fill={theme.dark} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
