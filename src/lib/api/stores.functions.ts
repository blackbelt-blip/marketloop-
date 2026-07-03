// removed serverFn;
import { supabase } from "@/lib/supabase";
import { getUser } from "@/lib/auth";

export const getMyStore = ((fn) => fn)({ method: "GET" })
  .handler(async () => {
    const user = await getUser();
    const userId = user.id;

    const { data: store } = await supabase
      .from("stores")
      .select("*")
      .eq("owner_id", userId)
      .maybeSingle();

    if (!store) {
      return {
        store: { id: "", name: "Your store", location: "" },
        products: [],
        stats: { views: 0, clicks: 0, orders: 0 },
        analytics: [],
      };
    }

    const [{ data: products }, { data: events }] = await Promise.all([
      supabase.from("products").select("*").eq("store_id", store.id).order("created_at", { ascending: false }),
      supabase.from("store_events").select("kind, created_at").eq("store_id", store.id)
        .gte("created_at", new Date(Date.now() - 7 * 86400000).toISOString()),
    ]);

    const stats = { views: 0, clicks: 0, orders: 0 };
    const byDay = new Map<string, { views: number; clicks: number }>();
    (events ?? []).forEach((e) => {
      if (e.kind === "view") stats.views++;
      if (e.kind === "click") stats.clicks++;
      if (e.kind === "order") stats.orders++;
      const day = new Date(e.created_at).toISOString().slice(5, 10);
      const cur = byDay.get(day) ?? { views: 0, clicks: 0 };
      if (e.kind === "view") cur.views++;
      if (e.kind === "click") cur.clicks++;
      byDay.set(day, cur);
    });

    return {
      store,
      products: products ?? [],
      stats,
      analytics: Array.from(byDay.entries()).map(([day, v]) => ({ day, ...v })),
    };
  });

export const createStore = ((fn) => fn)({ method: "POST" })
  .validator((data: { name: string; phone: string; category: string; location: string }) => data)
  .handler(async ({ data }) => {
    const user = await getUser();
    
    const { error } = await supabase.from("stores").insert({
      owner_id: user.id,
      name: data.name,
      phone: data.phone,
      category: data.category,
      location: data.location,
      verified: false,
    });
    
    if (error) throw new Error(error.message);
    return { ok: true };
  });
