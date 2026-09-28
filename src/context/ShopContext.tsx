import React, { createContext, useContext, useState, useEffect } from "react";
import { translations, Language, Currency, TranslationData } from "../data/translations";
import { PRODUCT_VARIANTS, ADD_ONS, CameraVariantId } from "../data/products";
import { cameraSound } from "../lib/sound";

export type Theme = "dark" | "light";

interface ShopContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  theme: Theme;
  toggleTheme: () => void;
  t: TranslationData;
  formatPrice: (czk: number, eur: number) => string;
  selectedVariant: CameraVariantId;
  setSelectedVariant: (v: CameraVariantId) => void;
  selectedAddOns: string[];
  toggleAddOn: (id: string) => void;
  isCheckoutOpen: boolean;
  openCheckout: (variant?: CameraVariantId) => void;
  closeCheckout: () => void;
  isFlashActive: boolean;
  triggerFlash: () => void;
  cartCount: number;
  calculateTotal: () => { subtotal: number; total: number; isFreeShipping: boolean };
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>("cz");
  const [currency, setCurrencyState] = useState<Currency>("CZK");
  const [selectedVariant, setSelectedVariant] = useState<CameraVariantId>("blush");
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>(["strap"]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isFlashActive, setIsFlashActive] = useState<boolean>(false);
  
  // Theme state: default dark
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("digishot_theme") as Theme;
      if (saved === "light" || saved === "dark") return saved;
    }
    return "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
    localStorage.setItem("digishot_theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    cameraSound.playClick();
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    if (newLang === "cz") {
      setCurrencyState("CZK");
    } else {
      setCurrencyState("EUR");
    }
  };

  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency);
  };

  const t = translations[lang] || translations.cz;

  const formatPrice = (czk: number, eur: number): string => {
    if (currency === "CZK") {
      return `${czk.toLocaleString("cs-CZ")} Kč`;
    }
    return `€${eur}`;
  };

  const toggleAddOn = (id: string) => {
    cameraSound.playClick();
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const openCheckout = (variant?: CameraVariantId) => {
    if (variant) {
      setSelectedVariant(variant);
    }
    cameraSound.playClick();
    setIsCheckoutOpen(true);
  };

  const closeCheckout = () => {
    setIsCheckoutOpen(false);
  };

  const triggerFlash = () => {
    cameraSound.playShutter();
    cameraSound.playFlashCharge();
    setIsFlashActive(true);
    setTimeout(() => {
      setIsFlashActive(false);
    }, 650);
  };

  const calculateTotal = () => {
    const variantObj = PRODUCT_VARIANTS.find((v) => v.id === selectedVariant);
    let subtotalCZK = variantObj ? variantObj.priceCZK : 1490;
    let subtotalEUR = variantObj ? variantObj.priceEUR : 60;

    selectedAddOns.forEach((addonId) => {
      const addon = ADD_ONS.find((a) => a.id === addonId);
      if (addon) {
        subtotalCZK += addon.priceCZK;
        subtotalEUR += addon.priceEUR;
      }
    });

    const isFreeShipping = true;
    const subtotal = currency === "CZK" ? subtotalCZK : subtotalEUR;
    const total = subtotal;

    return { subtotal, total, isFreeShipping };
  };

  const cartCount = 1 + selectedAddOns.length;

  return (
    <ShopContext.Provider
      value={{
        lang,
        setLang,
        currency,
        setCurrency,
        theme,
        toggleTheme,
        t,
        formatPrice,
        selectedVariant,
        setSelectedVariant,
        selectedAddOns,
        toggleAddOn,
        isCheckoutOpen,
        openCheckout,
        closeCheckout,
        isFlashActive,
        triggerFlash,
        cartCount,
        calculateTotal,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = (): ShopContextType => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
};