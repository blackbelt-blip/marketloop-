import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
// removed server fn
import { z } from "zod";
import { SEASON_CONFIG } from "@/config/season";
import { createStore } from "@/lib/api/stores.functions";

const schema = z.object({
  name: z.string().min(2),
  phone: z.string().regex(/^\+?[0-9]{10,15}$/),
  category: z.string().min(1),
  location: z.string().min(2),
});

export function Register() {
  const { theme, categories } = SEASON_CONFIG;
  const navigate = useNavigate();
  const [err, setErr] = useState<string | null>(null);
  const create = ((fn) => fn)(createStore);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErr(null);
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse(Object.fromEntries(fd));
    if (!parsed.success) { 
      setErr("Please fill all fields correctly."); 
      return; 
    }
    
    try {
      // this saves to Supabase → stores table with anonymous user ID
      await create({ data: parsed.data });
      navigate({ to: "/dashboard" });
    } catch (error: any) {
      setErr(error.message || "Failed to create store");
    }
  };

  return (
    <main style={{ background: theme.bg, color: theme.text, minHeight: "100vh", padding: "1rem" }}>
      <h1 style={{ color: theme.primary }}>Create your store</h1>
      <form onSubmit={onSubmit} style={{ display: "grid", gap: ".75rem" }}>
        <input name="name" placeholder="Store name" style={input(theme)} required />
        <input name="phone" placeholder="WhatsApp number (+234...)" style={input(theme)} required />
        <select name="category" style={input(theme)} required>
          {categories.map((c) => <option key={c.id} value={c.id}>{c.emoji} {c.label}</option>)}
        </select>
        <input name="location" placeholder="City" style={input(theme)} required />
        {err && <div style={{ color: "#ef4444", fontSize: ".75rem" }}>{err}</div>}
        <button type="submit" style={{
          background: theme.primary, color: "#000", padding: "1rem", borderRadius: 999, border: 0, fontWeight: 700,
        }}>Create store</button>
      </form>
    </main>
  );
}

function input(theme: typeof SEASON_CONFIG.theme): React.CSSProperties {
  return {
    background: theme.surface, color: theme.text, padding: ".875rem",
    borderRadius: 12, border: `1px solid ${theme.dark}`, fontSize: "1rem",
  };
}