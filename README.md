# MarketLoop PWA — Code Bundle

Drop these files into a TanStack Start project.

## Install
```
bun add recharts workbox-window zod
bun add -D vite-plugin-pwa
```

## Setup
1. Enable Lovable Cloud (Supabase) in your project.
2. Apply `supabase/migrations/20260616000000_marketloop_init.sql`.
3. Drop PWA icons into `public/icons/` (192, 512, maskable).
4. Week-2 reskin = edit only `src/config/season.ts` and bump `version` to bust SW caches.
