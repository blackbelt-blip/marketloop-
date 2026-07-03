import { useEffect, useRef } from "react";
import { SEASON_CONFIG } from "@/config/season";

export function StatusGenerator({ storeName, tagline }: { storeName: string; tagline: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { status, theme } = SEASON_CONFIG;

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const g = ctx.createLinearGradient(0, 0, 0, status.height);
    g.addColorStop(0, theme.dark);
    g.addColorStop(1, theme.primary);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, status.width, status.height);
    ctx.fillStyle = "#fff";
    ctx.font = "bold 120px system-ui";
    ctx.textAlign = "center";
    ctx.fillText(storeName, status.width / 2, status.height / 2 - 60);
    ctx.font = "60px system-ui";
    ctx.fillText(tagline, status.width / 2, status.height / 2 + 60);
  }, [storeName, tagline, status, theme]);

  const download = () => {
    const c = canvasRef.current;
    if (!c) return;
    const a = document.createElement("a");
    a.href = c.toDataURL("image/png");
    a.download = `${storeName}-status.png`;
    a.click();
  };

  return (
    <div style={{ padding: "1rem" }}>
      <canvas ref={canvasRef} width={status.width} height={status.height}
        style={{ width: "100%", maxWidth: 240, borderRadius: 12, display: "block", margin: "0 auto" }} />
      <button onClick={download} style={{
        marginTop: "1rem", width: "100%", background: theme.primary, color: "#000",
        padding: ".75rem", borderRadius: 999, border: 0, fontWeight: 700,
      }}>Download status</button>
    </div>
  );
}
