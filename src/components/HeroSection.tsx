import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../data/products';

interface HeroSectionProps {
  onLearnMore: () => void;
  onSelectProduct: (product: Product) => void;
  flagshipProduct: Product;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onLearnMore,
  onSelectProduct,
  flagshipProduct,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleBagClick = () => {
    setIsAnimating(true);
    setClickCount((prev) => prev + 1);
    setTimeout(() => {
      setIsAnimating(false);
    }, 850);
  };

  const getMotionStyle = () => {
    if (isAnimating) {
      const mode = clickCount % 3;
      if (mode === 1) {
        return 'scale(1.18) translateY(-22px) rotate(-3.5deg)';
      } else if (mode === 2) {
        return 'scale(1.22) translateY(-26px) rotate(4deg)';
      } else {
        return 'scale(1.15) translateY(-30px) rotate(0deg)';
      }
    }
    if (isHovered) {
      return 'scale(1.1) translateY(-10px) rotate(1deg)';
    }
    return 'scale(1.04) translateY(0) rotate(0deg)';
  };

  return (
    <section className="relative pt-2 pb-16 sm:pb-24 overflow-hidden bg-[#FBFBFB]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Main "your [BAG] oice" Hero Focal Composition with Masked Ground-Up Fade */}
        <div className="relative min-h-[380px] sm:min-h-[460px] md:min-h-[540px] lg:min-h-[600px] flex items-center justify-between select-none">
          {/* Left Text: "your" feeds upward from ground up */}
          <div className="z-10 w-1/3 flex items-center justify-start overflow-hidden">
            <motion.h1
              initial={{ y: 90, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[18vw] sm:text-[14vw] lg:text-[11.5rem] font-bold tracking-tighter text-[#111111] leading-none lowercase drop-shadow-[0_12px_24px_rgba(0,0,0,0.16)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.08)]"
            >
              your
            </motion.h1>
          </div>

          {/* Centerpiece Visual: Pure Transparent Sculpted Pink Bag */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center pointer-events-auto">
            <div
              className="relative w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] md:w-[500px] md:h-[500px] lg:w-[580px] lg:h-[580px] group cursor-pointer flex items-center justify-center"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={handleBagClick}
              title="Click for smooth motion"
            >
              {/* Center Handbag with Zoomed Sizing and Spring Motion */}
              <div
                className="relative z-10 w-full h-full flex items-center justify-center transition-all duration-700 cubic-bezier(0.175, 0.885, 0.32, 1.275)"
                style={{
                  transform: getMotionStyle(),
                }}
              >
                {/* Soft ground shadow */}
                <div
                  className="absolute bottom-4 sm:bottom-6 w-4/5 h-10 bg-black/20 rounded-full filter blur-2xl transition-all duration-500 pointer-events-none"
                  style={{
                    transform: isAnimating
                      ? 'scale(0.8) opacity-40 translateY(16px)'
                      : isHovered
                      ? 'scale(0.92) opacity-65 translateY(8px)'
                      : 'scale(1) opacity-100 translateY(0)',
                  }}
                />

                <img
                  src="/src/assets/images/hero_bag_transparent.png"
                  alt="HUSH Sculptural Pink Handbag"
                  className="w-full h-full object-contain scale-110 sm:scale-120 md:scale-125 select-none pointer-events-auto filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.22)] drop-shadow-[0_35px_50px_rgba(0,0,0,0.14)] drop-shadow-[0_10px_20px_rgba(217,130,153,0.32)]"
                />
              </div>
            </div>
          </div>

          {/* Right Text: "oice" feeds upward from ground up */}
          <div className="z-10 w-1/3 flex items-center justify-end overflow-hidden">
            <motion.h1
              initial={{ y: 90, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[18vw] sm:text-[14vw] lg:text-[11.5rem] font-bold tracking-tighter text-[#111111] leading-none lowercase text-right drop-shadow-[0_12px_24px_rgba(0,0,0,0.16)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.08)]"
            >
              oice
            </motion.h1>
          </div>
        </div>

        {/* Lower Sub-Hero Row: Displays from ground up with attractive animated arrow CTA */}
        <div className="mt-8 sm:mt-12 pt-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
          {/* Left Block: About us / What we do with high contrast readability */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="block text-xs uppercase tracking-widest text-stone-700 font-bold mb-1.5">
              About us
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-950 tracking-tight">
              What we do
            </h2>
          </motion.div>

          {/* Right Block: Tagline & CTA Button with high contrast readable text */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start md:items-end text-left md:text-right"
          >
            <p className="text-base sm:text-lg font-bold text-stone-950 max-w-md leading-relaxed mb-4">
              Each shush brand bag is the perfect combination of creativity and practicality.
            </p>

            <button
              onClick={() => onSelectProduct(flagshipProduct)}
              className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#D47A94] hover:bg-[#C96984] text-white text-xs sm:text-sm font-medium tracking-wide shadow-sm hover:shadow transition-all duration-200 cursor-pointer active:scale-95"
            >
              {/* Button text sliding from left */}
              <motion.span
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.45 }}
              >
                Buy Now
              </motion.span>

              {/* Arrow with attractor nudge sideways */}
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                >
                  <ArrowRight className="w-3 h-3 text-white" />
                </motion.div>
              </span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
