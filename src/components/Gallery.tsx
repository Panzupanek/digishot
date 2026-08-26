import React, { useState } from "react";
import { useShop } from "../context/ShopContext";
import { GALLERY_PHOTOS, GalleryPhoto } from "../data/photos";
import { Sparkles, X, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Gallery: React.FC = () => {
  const { t } = useShop();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

  const filters = [
    { id: "all", label: t.gallery.filterAll },
    { id: "festival", label: t.gallery.filterFestival },
    { id: "party", label: t.gallery.filterParty },
    { id: "afters", label: t.gallery.filterAfters },
    { id: "flash", label: t.gallery.filterFlash },
  ];

  const filteredPhotos =
    activeCategory === "all"
      ? GALLERY_PHOTOS
      : GALLERY_PHOTOS.filter((p) => p.category === activeCategory);

  return (
    <section id="gallery" className="py-20 bg-[#F8FAF7] dark:bg-[#090A0E] relative overflow-hidden transition-colors duration-300">
      {/* Background radial glow */}
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-[#A2B997]/15 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#A2B997]/20 dark:bg-white/5 border border-[#7B9370]/30 dark:border-white/10 text-xs font-mono text-[#5A734F] dark:text-[#FF70A6] font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.gallery.sectionTag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-sans tracking-tight text-slate-900 dark:text-white transition-colors">
            {t.gallery.heading}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-normal transition-colors">
            {t.gallery.subheading}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveCategory(f.id)}
              className={`px-4 py-2 rounded-2xl text-xs font-mono font-bold transition-all cursor-pointer ${
                activeCategory === f.id
                  ? "bg-[#7B9370] dark:bg-[#A2B997] text-white dark:text-black shadow-sm dark:shadow-neon-sage"
                  : "bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-black/10 dark:border-white/10"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Photo Grid with Grain & Timestamp HUD */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredPhotos.map((photo) => (
            <motion.div
              layout
              key={photo.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={() => setSelectedPhoto(photo)}
              className="group relative rounded-3xl overflow-hidden bg-[#151722] border border-black/10 dark:border-white/10 cursor-pointer aspect-[4/5] shadow-md hover:border-[#7B9370] dark:hover:border-[#A2B997]/60 transition-all"
            >
              {/* Photo Image */}
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter contrast-125 saturate-110"
                loading="lazy"
              />

              {/* Y2K Grain overlay */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors pointer-events-none" />

              {/* Vintage Date Stamp on bottom-right */}
              <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-black/80 backdrop-blur-sm border border-white/10 text-[11px] font-mono font-bold text-amber-300 tracking-wider shadow-md">
                {photo.timestamp}
              </div>

              {/* Hover Metadata Overlay Card */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-[#A2B997]/30 text-white border border-[#A2B997]/40">
                    FLASH ACTIVE ⚡
                  </span>
                  <span className="text-[10px] font-mono text-slate-300">
                    2004 CCD
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="text-base font-bold font-sans text-white">
                    {photo.title}
                  </h4>
                  <p className="text-xs text-slate-300 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-cyan-300" />
                    {photo.location}
                  </p>
                  <p className="text-[11px] font-mono text-[#A2B997]">
                    Vibe: {photo.vibe}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhoto(null)}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md p-4 sm:p-8 flex items-center justify-center"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-3xl w-full rounded-3xl bg-[#12141C] border border-white/20 p-4 sm:p-6 shadow-2xl overflow-hidden"
              >
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black border border-white/20 z-10 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-black mb-4">
                  <img
                    src={selectedPhoto.url}
                    alt={selectedPhoto.title}
                    className="w-full h-full object-contain filter contrast-125"
                  />
                  <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-lg bg-black/80 border border-white/20 text-xs font-mono font-bold text-amber-300">
                    {selectedPhoto.timestamp}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-2 border-t border-white/10 text-xs font-mono">
                  <div>
                    <h3 className="text-base font-bold font-sans text-white">
                      {selectedPhoto.title}
                    </h3>
                    <p className="text-slate-400">{selectedPhoto.location}</p>
                  </div>
                  <span className="text-[#A2B997] font-bold">
                    📸 DigiShot Retro Flash Snapshot
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};