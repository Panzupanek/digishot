export interface ProductVariant {
  id: "sage" | "blush" | "classic";
  nameKey: "sageName" | "blushName" | "classicName";
  descKey: "sageDesc" | "blushDesc" | "classicDesc";
  priceCZK: number;
  priceEUR: number;
  badge: string;
  badgeColor: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    gradient: string;
    strapColor: string;
  };
  stockCount: number;
  popular?: boolean;
}

export interface AddOnItem {
  id: "strap" | "stickers" | "pouch";
  nameKey: "strapAddon" | "stickersAddon" | "pouchAddon";
  descKey: "strapDesc" | "stickersDesc" | "pouchDesc";
  priceCZK: number;
  priceEUR: number;
  icon: string;
  badge?: string;
}

export const PRODUCT_VARIANTS: ProductVariant[] = [
  {
    id: "sage",
    nameKey: "sageName",
    descKey: "sageDesc",
    priceCZK: 1290,
    priceEUR: 49,
    badge: "★ BESTSELLER • SAGE EDITION",
    badgeColor: "bg-emerald-500/20 text-[#A2B997] border-[#A2B997]/40",
    colors: {
      primary: "#A2B997",
      secondary: "#F4F7F2",
      accent: "#768E6B",
      gradient: "from-[#A2B997] via-[#8FA885] to-[#F4F7F2]",
      strapColor: "#8A9A86",
    },
    stockCount: 12,
    popular: true,
  },
  {
    id: "blush",
    nameKey: "blushName",
    descKey: "blushDesc",
    priceCZK: 1290,
    priceEUR: 49,
    badge: "TIKTOK BLUSH",
    badgeColor: "bg-pink-500/20 text-pink-300 border-pink-500/30",
    colors: {
      primary: "#FF9EBB",
      secondary: "#FFF5F7",
      accent: "#FF4D88",
      gradient: "from-[#FF9EBB] via-[#FF6F99] to-[#FFF0F4]",
      strapColor: "#FF70A6",
    },
    stockCount: 16,
  },
  {
    id: "classic",
    nameKey: "classicName",
    descKey: "classicDesc",
    priceCZK: 1290,
    priceEUR: 49,
    badge: "VINTAGE COGNAC",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    colors: {
      primary: "#8D4F28",
      secondary: "#1A1A1E",
      accent: "#D4AF37",
      gradient: "from-[#8D4F28] via-[#5A3219] to-[#1A1A1E]",
      strapColor: "#C2854A",
    },
    stockCount: 10,
  },
];

export const ADD_ONS: AddOnItem[] = [
  {
    id: "strap",
    nameKey: "strapAddon",
    descKey: "strapDesc",
    priceCZK: 190,
    priceEUR: 8,
    icon: "Sparkles",
    badge: "MATCHES SAGE",
  },
  {
    id: "stickers",
    nameKey: "stickersAddon",
    descKey: "stickersDesc",
    priceCZK: 140,
    priceEUR: 6,
    icon: "Layers",
  },
  {
    id: "pouch",
    nameKey: "pouchAddon",
    descKey: "pouchDesc",
    priceCZK: 240,
    priceEUR: 9,
    icon: "ShieldCheck",
    badge: "PARTY PROOF",
  },
];