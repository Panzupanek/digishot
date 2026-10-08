import React, { useState } from "react";
import { useShop } from "../context/ShopContext";
import { GALLERY_PHOTOS, GalleryPhoto } from "../data/photos";
import { Camera, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Gallery: React.FC = () => {
  const { t } = useShop();
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

  return (
    <section id="gallery" className="py-20 bg-[#F8FAF7] dark:bg-[#090A0E] relative overflow-hidden transition-colors duration-300">
      {/* Background radial glow */}
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-[#A2B997]/15 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#A2B997]/20 dark:bg-white/5 border border-[#7B9370]/30 dark:border-white/10 text-xs font-mono text-[#5A734F] dark:text-[#A2B997] font-bold">
            <Camera className="w-3.5 h-3.5" />
            <span>{t.gallery.sectionTag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-sans tracking-tight text-slate-900 dark:text-white transition-colors">
            {t.gallery.heading}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-normal max-w-2xl mx-auto leading-relaxed transition-colors">
            {t.gallery.subheading}
          </p>
        </div>

        {/* 4-Photo Responsive Grid: 2 columns on mobile, 4 columns on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
          {GALLERY_PHOTOS.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              onClick={() => setSelectedPhoto(photo)}
              className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-900 border border-black/10 dark:border-white/10 cursor-pointer aspect-[3/4] shadow-md hover:shadow-xl hover:border-[#7B9370] dark:hover:border-[#A2B997]/60 transition-all duration-300"
            >
              {/* Photo Image */}
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />

              {/* Subtle Vignette overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-60 group-hover:opacity-40 transition-opacity pointer-events-none" />

              {/* Vintage Date & Flash Stamp on bottom */}
              <div className="absolute bottom-2.5 sm:bottom-3.5 left-2.5 sm:left-3.5 right-2.5 sm:right-3.5 flex items-center justify-between text-[10px] sm:text-xs font-mono font-bold text-amber-300 drop-shadow">
                <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm border border-white/10">
                  {photo.timestamp}
                </span>
                <span className="px-2 py-0.5 rounded bg-[#7B9370]/80 text-white backdrop-blur-sm">
                  ⚡ FLASH
                </span>
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
                className="relative max-w-4xl w-full rounded-3xl bg-[#12141C] border border-white/20 p-4 sm:p-6 shadow-2xl overflow-hidden"
              >
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute top-4 right-4 p-2.5 rounded-full bg-black/70 text-white hover:bg-black border border-white/20 z-10 cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="relative rounded-2xl overflow-hidden max-h-[75vh] flex items-center justify-center bg-black mb-4">
                  <img
                    src={selectedPhoto.url}
                    alt={selectedPhoto.title}
                    className="w-auto h-auto max-h-[70vh] max-w-full object-contain"
                  />
                  <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-black/80 border border-white/20 text-xs font-mono font-bold text-amber-300">
                    {selectedPhoto.timestamp} • FLASH ACTIVE ⚡
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs font-mono">
                  <span className="text-white font-bold">{selectedPhoto.title}</span>
                  <span className="text-[#A2B997] font-bold">
                    📸 Shot on DigiShot (Raw CCD + Xenon Flash)
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