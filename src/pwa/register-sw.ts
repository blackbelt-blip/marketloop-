const BLOCKED_HOSTS = ["lovable.app", "lovable.dev", "lovableproject.com"];

export function registerServiceWorker() {
  if (typeof window === "undefined") return;
  if (!("serviceWorker" in navigator)) return;
  const host = window.location.hostname;
  if (BLOCKED_HOSTS.some((h) => host.includes(h))) return;
  if (new URLSearchParams(window.location.search).has("sw")) return;

  import("workbox-window").then(({ Workbox }) => {
    const wb = new Workbox("/sw.js");
    wb.addEventListener("waiting", () => wb.messageSkipWaiting());
    wb.register().catch(() => {});
  });
}
