import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Product, PRODUCTS } from '../data/products';

interface NewArrivalsSectionProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

type TabType = 'Bloggers\' Choice' | 'NEW ARRIVALS' | 'Bestsellers';

export const NewArrivalsSection: React.FC<NewArrivalsSectionProps> = ({
  onSelectProduct,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('NEW ARRIVALS');
  const [isButtonHovered, setIsButtonHovered] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(true);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const tabs: TabType[] = ['Bloggers\' Choice', 'NEW ARRIVALS', 'Bestsellers'];

  // Detect mobile vs desktop view for proper multi-column translation
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filter pool per tab
  const pool = useMemo(() => {
    if (activeTab === 'NEW ARRIVALS') {
      return PRODUCTS.filter((p) => ['naomi', 'brielle', 'sabrina', 'valeria', 'seraphina'].includes(p.id));
    }
    if (activeTab === 'Bloggers\' Choice') {
      return PRODUCTS.filter((p) => ['hero-hush', 'sabrina', 'valeria', 'naomi', 'seraphina'].includes(p.id));
    }
    return PRODUCTS.filter((p) => ['brielle', 'naomi', 'mignardise-mini', 'seraphina', 'sabrina'].includes(p.id));
  }, [activeTab]);

  const poolLength = pool.length;

  // 8 repetitions = 40 items for a vast, infinite continuous circular carousel track
  const extendedItems = useMemo(() => {
    return [
      ...pool,
      ...pool,
      ...pool,
      ...pool,
      ...pool,
      ...pool,
      ...pool,
      ...pool,
    ];
  }, [pool]);

  // Center starts at index 20 (4th repetition, exactly at index 0 = Naomi)
  const [centerIndex, setCenterIndex] = useState<number>(20);

  // Smoothly advance to the next item
  const handleNext = useCallback(() => {
    setIsTransitioning(true);
    setCenterIndex((prev) => prev + 1);
  }, []);

  // Smoothly rewind to the previous item
  const handlePrev = useCallback(() => {
    setIsTransitioning(true);
    setCenterIndex((prev) => prev - 1);
  }, []);

  // Seamless boundary wrap when the slide animation completes
  // Silently teleports by 2 full pool lengths without any animation so the user never sees a restart or rewind!
  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget || e.propertyName !== 'transform') return;

    if (centerIndex >= poolLength * 6) {
      // Past safe zone on the right: silently shift back by 2 sets
      setIsTransitioning(false);
      setCenterIndex((prev) => prev - poolLength * 2);
    } else if (centerIndex <= poolLength * 2) {
      // Past safe zone on the left: silently shift forward by 2 sets
      setIsTransitioning(false);
      setCenterIndex((prev) => prev + poolLength * 2);
    }
  };

  // Re-enable CSS transitions after the silent teleport frame has painted
  useEffect(() => {
    if (!isTransitioning) {
      let raf2: number;
      const raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => {
          setIsTransitioning(true);
        });
      });
      return () => {
        cancelAnimationFrame(raf1);
        if (raf2) cancelAnimationFrame(raf2);
      };
    }
  }, [isTransitioning]);

  // Safety fallback wrap in case transition end event was swallowed (e.g. background tab)
  useEffect(() => {
    if (centerIndex >= poolLength * 7) {
      setIsTransitioning(false);
      setCenterIndex((prev) => prev - poolLength * 3);
    } else if (centerIndex <= poolLength) {
      setIsTransitioning(false);
      setCenterIndex((prev) => prev + poolLength * 3);
    }
  }, [centerIndex, poolLength]);

  // Perpetual auto-motion: advances continuously every 3 seconds without needing clicks
  useEffect(() => {
    if (isButtonHovered) return;

    autoPlayTimerRef.current = setInterval(() => {
      handleNext();
    }, 3000);

    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [isButtonHovered, handleNext, centerIndex]);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setIsTransitioning(false);
    setCenterIndex(20);
  };

  // Compute horizontal translation percentage so centerIndex is centered in viewport
  const itemWidthPercent = isMobile ? 100 : 33.3333333333;
  const translateX = isMobile
    ? -(centerIndex * itemWidthPercent)
    : -((centerIndex - 1) * itemWidthPercent);

  // Active indicator dot based on modulo
  const activeIndicator = ((centerIndex % poolLength) + poolLength) % poolLength;

  return (
    <section
      id="new-arrivals"
      className="w-full bg-[#D47A94] text-white py-16 sm:py-24 px-6 sm:px-8 overflow-hidden transition-colors duration-300 relative select-none"
    >
      <div className="max-w-7xl mx-auto">
        {/* Top Filter Tabs */}
        <div className="flex items-center justify-center gap-8 sm:gap-12 mb-14 sm:mb-20 text-center">
          {tabs.map((tab) => {
            const isActive = tab === activeTab;
            return (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`transition-all duration-200 cursor-pointer text-sm sm:text-base tracking-wide ${
                  isActive
                    ? 'font-extrabold text-white text-base sm:text-lg tracking-wider border-b-2 border-white pb-1'
                    : 'font-normal text-white/70 hover:text-white'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Carousel Viewport with soft edge gradients */}
        <div className="relative flex items-center justify-center">
          {/* Left Arrow Button */}
          <button
            onClick={() => {
              if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
              handlePrev();
            }}
            className="hidden md:flex absolute -left-2 lg:-left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/20 hover:bg-white/35 backdrop-blur-md text-white items-center justify-center transition-all duration-200 active:scale-90 cursor-pointer shadow-md"
            aria-label="Previous bag in rotation"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* Continuous Sliding Window Track */}
          <div className="w-full max-w-5xl overflow-hidden py-8 relative">
            {/* Soft Edge Gradient Overlays */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-[#D47A94] to-transparent z-20" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-[#D47A94] to-transparent z-20" />

            {/* Horizontal Track that physically slides */}
            <div
              onTransitionEnd={handleTransitionEnd}
              className="flex items-center"
              style={{
                transform: `translateX(${translateX}%)`,
                transition: isTransitioning
                  ? 'transform 750ms cubic-bezier(0.16, 1, 0.3, 1)'
                  : 'none',
              }}
            >
              {extendedItems.map((product, idx) => {
                const isCenter = idx === centerIndex;
                const isPrev = idx === centerIndex - 1;
                const isNext = idx === centerIndex + 1;

                return (
                  <div
                    key={`${product.id}-${idx}`}
                    style={{
                      width: isMobile ? '100%' : '33.3333333333%',
                      flexShrink: 0,
                    }}
                    onClick={() => {
                      if (isPrev) handlePrev();
                      else if (isNext) handleNext();
                      else if (isCenter) onSelectProduct(product);
                    }}
                    className={`px-3 sm:px-4 flex flex-col items-center cursor-pointer transition-all ${
                      isTransitioning
                        ? 'duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]'
                        : 'duration-0'
                    } ${
                      isCenter
                        ? 'z-20 scale-105 sm:scale-115 -translate-y-3 sm:-translate-y-6'
                        : 'z-10 scale-90 sm:scale-95 opacity-75 hover:opacity-95'
                    }`}
                  >
                    {/* INVISIBLE CONTAINER (No card box, no borders) */}
                    <div className="relative w-full aspect-[4/4.8] bg-transparent p-2 flex flex-col items-center justify-center">
                      {/* Floating Transparent Bag */}
                      <div className="relative z-10 w-full h-full flex items-center justify-center">
                        <img
                          src={product.image}
                          alt={product.name}
                          className={`w-full h-full object-contain select-none transition-all ${
                            isTransitioning
                              ? 'duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]'
                              : 'duration-0'
                          } ${
                            isCenter
                              ? 'max-h-[290px] sm:max-h-[340px] drop-shadow-[0_25px_35px_rgba(0,0,0,0.3)] drop-shadow-[0_40px_60px_rgba(0,0,0,0.18)] hover:scale-108'
                              : 'max-h-[220px] sm:max-h-[250px] drop-shadow-[0_15px_25px_rgba(0,0,0,0.2)] hover:scale-104'
                          }`}
                        />
                      </div>

                      {/* Ambient Ground Shadow */}
                      <div
                        className={`rounded-full bg-black/25 filter blur-xl transition-all pointer-events-none -mt-4 ${
                          isTransitioning ? 'duration-700' : 'duration-0'
                        } ${
                          isCenter ? 'w-4/5 h-8 opacity-100' : 'w-3/4 h-5 opacity-60'
                        }`}
                      />
                    </div>

                    {/* Product Name, $Price Tag, and Buy Now Button */}
                    <div className="w-full mt-4 px-2 flex items-center justify-between">
                      <div className="text-left">
                        <h3
                          className={`font-extrabold text-white tracking-tight leading-tight transition-all duration-300 ${
                            isCenter ? 'text-xl sm:text-2xl' : 'text-base sm:text-lg'
                          }`}
                        >
                          {product.name}
                        </h3>
                        <p
                          className={`font-bold text-white/95 tabular-nums mt-0.5 transition-all duration-300 ${
                            isCenter ? 'text-lg sm:text-xl' : 'text-sm sm:text-base text-white/80'
                          }`}
                        >
                          ${product.price.toLocaleString()}
                        </p>
                      </div>

                      <button
                        onMouseEnter={() => setIsButtonHovered(true)}
                        onMouseLeave={() => setIsButtonHovered(false)}
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProduct(product);
                        }}
                        className={`px-5 py-2 sm:px-6 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 cursor-pointer active:scale-95 ${
                          product.buttonClass || 'bg-white text-[#D47A94] hover:bg-stone-50'
                        } ${isCenter ? 'shadow-xl scale-105' : 'shadow-md opacity-90'}`}
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={() => {
              if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
              handleNext();
            }}
            className="hidden md:flex absolute -right-2 lg:-right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/20 hover:bg-white/35 backdrop-blur-md text-white items-center justify-center transition-all duration-200 active:scale-90 cursor-pointer shadow-md"
            aria-label="Next bag in rotation"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {pool.map((_, i) => {
            return (
              <button
                key={i}
                onClick={() => {
                  const diff = i - activeIndicator;
                  setIsTransitioning(true);
                  setCenterIndex((prev) => prev + diff);
                }}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  i === activeIndicator ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Go to item ${i + 1}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
