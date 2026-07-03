import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
// removed server fn
import { GreetingBar } from "./GreetingBar";
import { VerifiedBadge } from "./VerifiedBadge";
import { StatsGrid } from "./StatsGrid";
import { ProductGrid } from "./ProductGrid";
import { BottomNav } from "./BottomNav";
import { StatusGenerator } from "./StatusGenerator";
import { AnalyticsModal } from "./AnalyticsModal";
import { SEASON_CONFIG } from "@/config/season";
import { getMyStore } from "@/lib/api/stores.functions";

export function Dashboard() {
  const { theme } = SEASON_CONFIG;
  const fetchStore = ((fn) => fn)(getMyStore);
  const { data, isLoading } = useQuery({ queryKey: ["my-store"], queryFn: () => fetchStore({}) });
  const [showAnalytics, setShowAnalytics] = useState(false);

  const stats = useMemo(() => ([
    { label: "Views", value: data?.stats.views ?? 0 },
    { label: "Clicks", value: data?.stats.clicks ?? 0 },
    { label: "Orders", value: data?.stats.orders ?? 0 },
  ]), [data]);

  if (isLoading) return <div style={{ padding: 24, background: theme.bg, color: theme.text, minHeight: "100vh" }}>Loading…</div>;

  return (
    <main style={{ background: theme.bg, color: theme.text, minHeight: "100vh", paddingBottom: 72 }}>
      <GreetingBar name={data?.store.name ?? "Seller"} location={data?.store.location ?? ""} />
      <div style={{ padding: "0 1rem" }}><VerifiedBadge /></div>
      <StatsGrid stats={stats} />
      <button onClick={() => setShowAnalytics(true)} style={{
        margin: "0 1rem", background: theme.surface, color: theme.text,
        border: 0, padding: ".75rem", borderRadius: 12, width: "calc(100% - 2rem)",
      }}>View analytics</button>
      <ProductGrid products={data?.products ?? []} />
      <StatusGenerator storeName={data?.store.name ?? ""} tagline="Open on WhatsApp" />
      <AnalyticsModal open={showAnalytics} onClose={() => setShowAnalytics(false)} data={data?.analytics ?? []} />
      <BottomNav />
    </main>
  );
}
