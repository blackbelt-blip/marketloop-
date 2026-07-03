export const SEASON_CONFIG = {
  version: "v1.3-seasonal",
  theme: {
    primary: "#25D366",
    dark: "#075E54",
    bg: "#0B141A",
    surface: "#111B21",
    text: "#E9EDEF",
    muted: "#8696A0",
  },
  features: {
    statusGen: true,
    analytics: true,
    photoUpload: true,
    installPrompt: true,
  },
  texts: {
    appName: "MarketLoop",
    tagline: "Your WhatsApp store, ready in 60 seconds",
    greeting: "Welcome back",
    ctaRegister: "Open my store",
    ctaShare: "Share on WhatsApp",
    verified: "Verified Seller",
  },
  categories: [
    { id: "food", label: "Food", emoji: "🍱" },
    { id: "fashion", label: "Fashion", emoji: "👗" },
    { id: "beauty", label: "Beauty", emoji: "💄" },
    { id: "electronics", label: "Electronics", emoji: "📱" },
    { id: "home", label: "Home", emoji: "🏠" },
    { id: "services", label: "Services", emoji: "🛠" },
  ],
  bottomNav: [
    { id: "home", label: "Home", icon: "Home", to: "/dashboard" },
    { id: "orders", label: "Orders", icon: "ShoppingBag", to: "/dashboard?tab=orders" },
    { id: "status", label: "Status", icon: "Image", to: "/dashboard?tab=status" },
    { id: "more", label: "More", icon: "MoreHorizontal", to: "/dashboard?tab=more" },
  ],
  status: { width: 1080, height: 1920 },
} as const;

export type SeasonConfig = typeof SEASON_CONFIG;
