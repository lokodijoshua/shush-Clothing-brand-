import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface StorySectionProps {
  onLearnMoreAboutBrand?: () => void;
}

const STORY_BAGS = [
  {
    id: 'colorway-1',
    src: '/src/assets/images/story_bag_color1.png',
    alt: 'HUSH Sculptural Bag - Colorway 01',
  },
  {
    id: 'colorway-2',
    src: '/src/assets/images/story_bag_color2.png',
    alt: 'HUSH Sculptural Bag - Colorway 02',
  },
];

export const StorySection: React.FC<StorySectionProps> = ({
  onLearnMoreAboutBrand,
}) => {
  const [activeBagIndex, setActiveBagIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleBagClick = () => {
    setActiveBagIndex((prev) => (prev === 0 ? 1 : 0));
  };

  const currentBag = STORY_BAGS[activeBagIndex];

  return (
    <section id="about" className="relative py-20 sm:py-28 bg-[#FBFBFB] overflow-hidden">
      {/* Video Background: Contained strictly within this section, autoplay, loop, muted */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-85"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260815_034306_165449ef-7d2e-4e81-850f-1939c5cb442d.mp4"
        />
        {/* Soft scrim overlay to preserve video visibility while keeping text crisp and readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FBFBFB]/90 via-[#FBFBFB]/65 to-[#FBFBFB]/35" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Brand Manifesto & Giant Chubby "HUSH" Typography */}
          <div className="lg:col-span-6 flex flex-col justify-between min-h-[520px]">
            {/* Description fading from the ground up */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-lg"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-950 leading-[1.22] tracking-tight mb-6">
                Our team is passionate about futurism and innovation, and we bring this passion to life in every bag we make.
              </h2>

              <p className="text-sm sm:text-base text-stone-800 leading-relaxed mb-8 font-medium">
                We love experimenting with modern materials, technologies and shapes to create products that not only meet your needs, but also inspire new possibilities. Together we explore the future of fashion and functionality, creating bags that will become your faithful companions in the fast-paced world of modern life.
              </p>

              <button
                onClick={onLearnMoreAboutBrand}
                className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#D47A94] hover:bg-[#C96984] text-white text-xs sm:text-sm font-medium tracking-wide shadow-sm hover:shadow transition-all duration-200 cursor-pointer active:scale-95"
              >
                <span>More about us</span>
                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                  <motion.div
                    animate={{ x: [0, 3, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                  >
                    <ArrowRight className="w-3 h-3 text-white" />
                  </motion.div>
                </span>
              </button>
            </motion.div>

            {/* Giant Puffy Bubble "HUSH" Logo popping out from the left hand side into frame */}
            <div className="mt-12 lg:mt-16 select-none overflow-visible">
              <motion.span
                initial={{ opacity: 0, x: -140, scale: 0.94 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="font-brand text-[22vw] sm:text-[18vw] lg:text-[13rem] font-bold text-[#E293A7] leading-none tracking-tight block drop-shadow-[0_2px_4px_rgba(226,147,167,0.15)] hover:text-[#DA869C] transition-colors duration-300"
              >
                shush
              </motion.span>
            </div>
          </div>

          {/* Right Column: Interactive Color-Swapping Bag */}
          <div className="lg:col-span-6 relative flex flex-col items-center lg:items-end justify-center select-none">
            <div
              className="relative w-full max-w-[440px] sm:max-w-[500px] aspect-square flex items-center justify-center cursor-pointer group"
              onClick={handleBagClick}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              title="Click to alternate colors"
            >
              {/* Ground contact shadow */}
              <div
                className="absolute bottom-6 sm:bottom-8 w-3/4 h-8 bg-black/20 rounded-full filter blur-2xl transition-all duration-500 pointer-events-none"
                style={{
                  transform: isHovered ? 'scale(1.08) opacity-80' : 'scale(1) opacity-65',
                }}
              />

              {/* Animated Bag Layer with Left-Falling Exit and Right-Rising Entrance */}
              <div className="relative w-full h-full flex items-center justify-center overflow-visible">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={currentBag.id}
                    initial={{
                      x: 160,
                      y: 110,
                      rotate: 22,
                      opacity: 0,
                      scale: 0.92,
                    }}
                    animate={{
                      x: 0,
                      y: isHovered ? -8 : 0,
                      rotate: 0,
                      opacity: 1,
                      scale: isHovered ? 1.05 : 1,
                    }}
                    exit={{
                      x: -180,
                      y: 130,
                      rotate: -24,
                      opacity: 0,
                      scale: 0.88,
                    }}
                    transition={{
                      duration: 0.75,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <img
                      src={currentBag.src}
                      alt={currentBag.alt}
                      className="w-full h-full object-contain scale-110 sm:scale-120 md:scale-125 select-none pointer-events-auto filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.22)] drop-shadow-[0_35px_50px_rgba(0,0,0,0.14)] drop-shadow-[0_10px_20px_rgba(217,130,153,0.32)]"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
