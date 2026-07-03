import { useEffect, useState } from "react";
import { SEASON_CONFIG } from "@/config/season";

type BIPEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };

export function InstallPrompt() {
  const [evt, setEvt] = useState<BIPEvent | null>(null);
  const { theme, features } = SEASON_CONFIG;

  useEffect(() => {
    if (!features.installPrompt) return;
    const handler = (e: Event) => { e.preventDefault(); setEvt(e as BIPEvent); };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, [features.installPrompt]);

  if (!evt) return null;
  return (
    <button onClick={async () => { await evt.prompt(); await evt.userChoice; setEvt(null); }}
      style={{
        position: "fixed", bottom: 16, left: 16, right: 16, background: theme.primary, color: "#000",
        padding: ".75rem", borderRadius: 999, border: 0, fontWeight: 700, zIndex: 40,
      }}>
      Install MarketLoop
    </button>
  );
}
