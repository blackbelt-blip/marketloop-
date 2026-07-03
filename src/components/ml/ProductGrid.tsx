import { SEASON_CONFIG } from "@/config/season";

export type Product = { id: string; name: string; price: number; image_url: string | null };

export function ProductGrid({ products }: { products: Product[] }) {
  const { theme } = SEASON_CONFIG;
  if (!products.length) {
    return <div style={{ padding: "2rem", textAlign: "center", color: theme.muted }}>No products yet</div>;
  }
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: ".5rem", padding: "1rem" }}>
      {products.map((p) => (
        <div key={p.id} style={{ background: theme.surface, borderRadius: 12, overflow: "hidden" }}>
          <div style={{ aspectRatio: "1", background: theme.dark }}>
            {p.image_url && <img src={p.image_url} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
          </div>
          <div style={{ padding: ".5rem" }}>
            <div style={{ fontSize: ".875rem", fontWeight: 600 }}>{p.name}</div>
            <div style={{ fontSize: ".75rem", color: theme.primary }}>₦{p.price}</div>
          </div>
        </div>
      ))}
    </div>
  );
}