import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Hls from 'hls.js';
import { Product, PRODUCTS } from '../data/products';

interface CollectionsSectionProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

const ITEMS_PER_PAGE = 6; // Exactly 2 rows of 3 items per page on desktop

export const CollectionsSection: React.FC<CollectionsSectionProps> = ({
  onSelectProduct,
  onAddToCart,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Initialize Mux HLS stream with loop, muted, autoplay
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const streamUrl = 'https://stream.mux.com/PkFsoKeakRLgL01gjf02CRcSbsJ600Z00NvLr9eRZ92pLbA.m3u8';
    let hls: Hls | null = null;

    if (Hls.isSupported()) {
      hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
      });
      hls.loadSource(streamUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {});
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = streamUrl;
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(() => {});
      });
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, []);

  const collections = ['All', 'Chrome Liquid', 'Cyber Minimal', 'Organic Shell', 'Micro Confection'];

  const filteredProducts = selectedFilter === 'All'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.collection === selectedFilter);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));

  // Reset to page 1 when filter changes
  const handleFilterChange = (col: string) => {
    setSelectedFilter(col);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Slice exactly 2 rows (6 items) for current page
  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <section
      ref={sectionRef}
      id="collections"
      className="relative py-20 sm:py-28 bg-[#F5F5F7] border-t border-stone-200/60 overflow-hidden"
    >
      {/* Background Video: Contained exclusively to Our Collections section (Mux HLS stream) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
        />
        {/* Soft scrim overlay to preserve video visibility while letting liquid-glass cards refract and shine */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F5F5F7]/85 via-[#F5F5F7]/60 to-[#F5F5F7]/85 backdrop-blur-[1px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header with Depth Reveal Animation */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16"
        >
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-950 tracking-tight">
              Our collections
            </h2>
            <p className="text-sm sm:text-base text-stone-700 font-medium mt-2 max-w-md">
              Meticulously engineered handbags merging aerodynamic chrome accents with tactile organic ergonomics.
            </p>
          </div>

          {/* Filter Bar with crisp clean frame styling */}
          <div className="flex flex-wrap items-center gap-2">
            {collections.map((col) => (
              <button
                key={col}
                onClick={() => handleFilterChange(col)}
                className={`px-4 py-1.5 text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer rounded-[6px] ${
                  selectedFilter === col
                    ? 'bg-[#D47A94] text-white shadow-sm'
                    : 'bg-white/80 hover:bg-white text-stone-900 border border-stone-300 backdrop-blur-md'
                }`}
              >
                {col}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Product Grid: Exactly two rows visible (max 6 items) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedFilter}-${currentPage}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {displayedProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: (idx % 3) * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group rounded-[8px] p-5 liquid-glass-bezel shadow-[0_6px_24px_rgba(0,0,0,0.04),inset_0_1px_2px_rgba(255,255,255,0.85)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.08),inset_0_1.5px_2px_rgba(255,255,255,0.95)] transition-all duration-300 flex flex-col justify-between border border-white/60"
              >
                {/* Box Shape Visual Picture Container with Soft Pinkish Backdrop */}
                <div
                  onClick={() => onSelectProduct(product)}
                  className="relative w-full aspect-square bg-[#F8EEF1]/70 rounded-[6px] p-6 flex items-center justify-center cursor-pointer overflow-hidden group-hover:bg-[#F5E3E9]/80 transition-colors border border-pink-100/40"
                >
                  {/* Floating Bag Image */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain max-h-[220px] transition-transform duration-500 ease-out group-hover:scale-108 drop-shadow-[0_15px_22px_rgba(0,0,0,0.12)]"
                  />

                  {/* Inspect Bag Overlay */}
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <span className="px-4 py-1.5 bg-white/95 shadow-md text-xs font-bold text-stone-900 flex items-center gap-1 border border-stone-200 rounded-[4px]">
                      Inspect Bag <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

                {/* Product Info & Actions with High Contrast Readability */}
                <div className="mt-5 flex flex-col gap-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#B24B66]">
                        {product.collection}
                      </span>
                      <h3 className="text-lg font-bold text-stone-950 tracking-tight">
                        {product.name}
                      </h3>
                    </div>
                    <span className="text-base font-extrabold text-stone-950 tabular-nums">
                      ${product.price.toLocaleString()}
                    </span>
                  </div>

                  <p className="text-xs text-stone-700 font-medium line-clamp-2 leading-relaxed">
                    {product.shortDesc}
                  </p>

                  {/* Swatches & Quick Add button */}
                  <div className="pt-2 flex items-center justify-between border-t border-stone-100/80">
                    <div className="flex items-center gap-1.5">
                      {product.colors.map((c) => (
                        <span
                          key={c.name}
                          title={c.name}
                          className="w-4 h-4 rounded-[3px] border border-stone-300 shadow-xs"
                          style={{ backgroundColor: c.hex }}
                        />
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onSelectProduct(product)}
                        className="text-xs font-bold text-stone-800 hover:text-black px-2 py-1 transition-colors cursor-pointer"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => onAddToCart(product)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-stone-900 hover:bg-[#D47A94] text-white text-xs font-medium transition-colors cursor-pointer rounded-[5px]"
                        title="Add to shopping bag"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Pagination Controls - Clean Two-Row Cap with Liquid Glass Styling */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-stone-200/60"
          >
            <div className="text-xs font-semibold text-stone-700 tracking-wide">
              Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
              {Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)} of{' '}
              {filteredProducts.length} pieces • 2 rows visible
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous page"
                className={`flex items-center gap-1 px-3 py-1.5 rounded-[8px] text-xs font-bold transition-all duration-200 cursor-pointer ${
                  currentPage === 1
                    ? 'opacity-40 cursor-not-allowed bg-white/40 text-stone-400 border border-stone-200/50'
                    : 'liquid-glass-bezel text-stone-900 hover:text-black hover:scale-102 border border-white/80 shadow-xs'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Prev</span>
              </button>

              <div className="flex items-center gap-1.5">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    aria-label={`Go to page ${pageNum}`}
                    className={`w-8 h-8 rounded-[8px] text-xs font-bold transition-all duration-200 cursor-pointer flex items-center justify-center ${
                      currentPage === pageNum
                        ? 'bg-[#D47A94] text-white shadow-sm ring-2 ring-[#D47A94]/30 scale-105'
                        : 'liquid-glass-bezel text-stone-800 hover:text-black hover:bg-white border border-white/70'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next page"
                className={`flex items-center gap-1 px-3 py-1.5 rounded-[8px] text-xs font-bold transition-all duration-200 cursor-pointer ${
                  currentPage === totalPages
                    ? 'opacity-40 cursor-not-allowed bg-white/40 text-stone-400 border border-stone-200/50'
                    : 'liquid-glass-bezel text-stone-900 hover:text-black hover:scale-102 border border-white/80 shadow-xs'
                }`}
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};
