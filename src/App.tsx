import React from "react";
import { ShopProvider } from "./context/ShopContext";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { ProductStudio } from "./components/ProductStudio";
import { HowItWorks } from "./components/HowItWorks";
import { ComparisonTable } from "./components/ComparisonTable";
import { BeforeAfterSlider } from "./components/BeforeAfterSlider";
import { Gallery } from "./components/Gallery";
import { FAQ } from "./components/FAQ";
import { Footer } from "./components/Footer";
import { CheckoutModal } from "./components/CheckoutModal";
import { FlashEffect } from "./components/FlashEffect";
import { StickyBottomBar } from "./components/StickyBottomBar";

export function App() {
  return (
    <ShopProvider>
      <div className="min-h-screen bg-[#F8FAF7] dark:bg-[#090A0E] text-slate-900 dark:text-slate-100 flex flex-col relative grain-overlay pb-16 md:pb-0 transition-colors duration-300">
        <FlashEffect />
        <Header />
        <main className="flex-grow">
          <Hero />
          <ProductStudio />
          <HowItWorks />
          <BeforeAfterSlider />
          <ComparisonTable />
          <Gallery />
          <FAQ />
        </main>
        <Footer />
        <CheckoutModal />
        <StickyBottomBar />
      </div>
    </ShopProvider>
  );
}

export default App;