import { createRootRouteWithContext, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import type { QueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { registerServiceWorker } from "@/pwa/register-sw";
import appCss from "@/styles.css?url";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width,initial-scale=1,viewport-fit=cover" },
      { name: "theme-color", content: "#25D366" },
      { title: "MarketLoop — Your WhatsApp Store" },
      { name: "description", content: "Build a WhatsApp store in 60 seconds. 50M+ sellers." },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "icon", href: "/icons/icon-192.png" },
    ],
  }),
  component: RootComponent,
  notFoundComponent: () => (
    <div style={{ padding: 24, color: "#E9EDEF", background: "#0B141A", minHeight: "100vh" }}>
      <h1>Not found</h1>
      <a href="/" style={{ color: "#25D366" }}>Go home</a>
    </div>
  ),
  shellComponent: RootShell,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  useEffect(() => { registerServiceWorker(); }, []);
  return <Outlet />;
}
