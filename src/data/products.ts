export type CameraVariantId =
  | "sage"
  | "blush"
  | "purple"
  | "black"
  | "blue"
  | "brown"
  | "red"
  | "white"
  | "classic"
  | "green";

export interface CameraColorOption {
  id: CameraVariantId;
  name: string;
  image: string;
  badgeText: string;
  colorDot: string;
  glowColor: string;
  borderActive: string;
  bgActive: string;
}

export const CAMERA_COLOR_OPTIONS: CameraColorOption[] = [
  {
    id: "sage",
    name: "DigiShot Sage",
    image: "camera-green.png",
    badgeText: "SAGE GREEN EDITION",
    colorDot: "#98A886",
    glowColor: "rgba(152, 168, 134, 0.45)",
    borderActive: "border-[#98A886]",
    bgActive: "bg-[#98A886]/20 text-[#405338] dark:text-[#C4D8BC]",
  },
  {
    id: "blush",
    name: "DigiShot Blush",
    image: "camera-pink.png",
    badgeText: "BLUSH PINK EDITION",
    colorDot: "#FFB7C5",
    glowColor: "rgba(255, 112, 166, 0.45)",
    borderActive: "border-pink-400",
    bgActive: "bg-pink-500/20 text-pink-700 dark:text-pink-300",
  },
  {
    id: "purple",
    name: "DigiShot Purple",
    image: "camera-purple.png",
    badgeText: "DEEP PURPLE EDITION",
    colorDot: "#9333EA",
    glowColor: "rgba(147, 51, 234, 0.45)",
    borderActive: "border-purple-400",
    bgActive: "bg-purple-500/20 text-purple-700 dark:text-purple-300",
  },
  {
    id: "black",
    name: "DigiShot Noir",
    image: "camera-black.png",
    badgeText: "CLASSIC NOIR EDITION",
    colorDot: "#27272A",
    glowColor: "rgba(39, 39, 42, 0.5)",
    borderActive: "border-slate-500",
    bgActive: "bg-slate-500/20 text-slate-800 dark:text-slate-200",
  },
  {
    id: "blue",
    name: "DigiShot Ocean",
    image: "camera-blue.png",
    badgeText: "OCEAN BLUE EDITION",
    colorDot: "#38BDF8",
    glowColor: "rgba(56, 189, 248, 0.45)",
    borderActive: "border-sky-400",
    bgActive: "bg-sky-500/20 text-sky-700 dark:text-sky-300",
  },
  {
    id: "brown",
    name: "DigiShot Classic",
    image: "camera-brown.png",
    badgeText: "VINTAGE CLASSIC EDITION",
    colorDot: "#8D4F28",
    glowColor: "rgba(141, 79, 40, 0.45)",
    borderActive: "border-amber-600",
    bgActive: "bg-amber-600/20 text-amber-800 dark:text-amber-300",
  },
  {
    id: "red",
    name: "DigiShot Crimson",
    image: "camera-red.png",
    badgeText: "CRIMSON RED EDITION",
    colorDot: "#DC2626",
    glowColor: "rgba(220, 38, 38, 0.45)",
    borderActive: "border-red-500",
    bgActive: "bg-red-500/20 text-red-700 dark:text-red-300",
  },
  {
    id: "white",
    name: "DigiShot Retro White",
    image: "camera-white.png",
    badgeText: "RETRO WHITE EDITION",
    colorDot: "#E2E8F0",
    glowColor: "rgba(255, 255, 255, 0.4)",
    borderActive: "border-slate-300 dark:border-white/80",
    bgActive: "bg-white/40 dark:bg-white/20 text-slate-900 dark:text-white",
  },
];

export interface ProductVariant {
  id: CameraVariantId;
  nameKey?: string;
  name: string;
  descKey?: string;
  priceCZK: number;
  priceEUR: number;
  regularPriceCZK: number;
  regularPriceEUR: number;
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

export const PRODUCT_VARIANTS: ProductVariant[] = [
  {
    id: "sage",
    nameKey: "sageName",
    name: "DigiShot Sage",
    descKey: "sageDesc",
    priceCZK: 1490,
    priceEUR: 60,
    regularPriceCZK: 1890,
    regularPriceEUR: 75,
    badge: "★ BESTSELLER • SAGE EDITION",
    badgeColor: "bg-emerald-500/20 text-[#A2B997] border-[#A2B997]/40",
    colors: {
      primary: "#98A886",
      secondary: "#F4F7F2",
      accent: "#768E6B",
      gradient: "from-[#98A886] via-[#8FA885] to-[#F4F7F2]",
      strapColor: "#8A9A86",
    },
    stockCount: 12,
    popular: true,
  },
  {
    id: "blush",
    nameKey: "blushName",
    name: "DigiShot Blush",
    descKey: "blushDesc",
    priceCZK: 1490,
    priceEUR: 60,
    regularPriceCZK: 1890,
    regularPriceEUR: 75,
    badge: "TIKTOK BLUSH",
    badgeColor: "bg-pink-500/20 text-pink-300 border-pink-500/30",
    colors: {
      primary: "#FFB7C5",
      secondary: "#FFF5F7",
      accent: "#FF4D88",
      gradient: "from-[#FFB7C5] via-[#FF6F99] to-[#FFF0F4]",
      strapColor: "#FF70A6",
    },
    stockCount: 16,
  },
  {
    id: "purple",
    nameKey: "purpleName",
    name: "DigiShot Purple",
    descKey: "purpleDesc",
    priceCZK: 1490,
    priceEUR: 60,
    regularPriceCZK: 1890,
    regularPriceEUR: 75,
    badge: "DEEP PURPLE EDITION",
    badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    colors: {
      primary: "#9333EA",
      secondary: "#F3E8FF",
      accent: "#7E22CE",
      gradient: "from-[#9333EA] via-[#7E22CE] to-[#F3E8FF]",
      strapColor: "#A855F7",
    },
    stockCount: 14,
  },
  {
    id: "black",
    nameKey: "blackName",
    name: "DigiShot Noir",
    descKey: "blackDesc",
    priceCZK: 1490,
    priceEUR: 60,
    regularPriceCZK: 1890,
    regularPriceEUR: 75,
    badge: "CLASSIC NOIR EDITION",
    badgeColor: "bg-slate-500/20 text-slate-300 border-slate-500/30",
    colors: {
      primary: "#27272A",
      secondary: "#18181B",
      accent: "#3F3F46",
      gradient: "from-[#27272A] via-[#18181B] to-[#3F3F46]",
      strapColor: "#52525B",
    },
    stockCount: 8,
  },
  {
    id: "blue",
    nameKey: "blueName",
    name: "DigiShot Ocean",
    descKey: "blueDesc",
    priceCZK: 1490,
    priceEUR: 60,
    regularPriceCZK: 1890,
    regularPriceEUR: 75,
    badge: "OCEAN BLUE EDITION",
    badgeColor: "bg-sky-500/20 text-sky-300 border-sky-500/30",
    colors: {
      primary: "#38BDF8",
      secondary: "#E0F2FE",
      accent: "#0284C7",
      gradient: "from-[#38BDF8] via-[#0284C7] to-[#E0F2FE]",
      strapColor: "#0EA5E9",
    },
    stockCount: 11,
  },
  {
    id: "brown",
    nameKey: "classicName",
    name: "DigiShot Classic",
    descKey: "classicDesc",
    priceCZK: 1490,
    priceEUR: 60,
    regularPriceCZK: 1890,
    regularPriceEUR: 75,
    badge: "VINTAGE CLASSIC",
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
  {
    id: "red",
    nameKey: "redName",
    name: "DigiShot Crimson",
    descKey: "redDesc",
    priceCZK: 1490,
    priceEUR: 60,
    regularPriceCZK: 1890,
    regularPriceEUR: 75,
    badge: "CRIMSON RED EDITION",
    badgeColor: "bg-red-500/20 text-red-300 border-red-500/30",
    colors: {
      primary: "#DC2626",
      secondary: "#FEF2F2",
      accent: "#991B1B",
      gradient: "from-[#DC2626] via-[#991B1B] to-[#FEF2F2]",
      strapColor: "#EF4444",
    },
    stockCount: 9,
  },
  {
    id: "white",
    nameKey: "whiteName",
    name: "DigiShot Retro White",
    descKey: "whiteDesc",
    priceCZK: 1490,
    priceEUR: 60,
    regularPriceCZK: 1890,
    regularPriceEUR: 75,
    badge: "RETRO WHITE EDITION",
    badgeColor: "bg-slate-200/40 text-slate-800 dark:text-slate-100 border-slate-300/40",
    colors: {
      primary: "#E2E8F0",
      secondary: "#CBD5E1",
      accent: "#94A3B8",
      gradient: "from-[#F8FAFC] via-[#E2E8F0] to-[#CBD5E1]",
      strapColor: "#94A3B8",
    },
    stockCount: 15,
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