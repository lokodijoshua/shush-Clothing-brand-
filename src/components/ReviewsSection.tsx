import React from 'react';
import { Quote, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { REVIEWS } from '../data/products';

const XLogo = () => (
  <svg className="w-4.5 h-4.5 text-stone-950" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const InstagramLogo = () => (
  <svg className="w-4.5 h-4.5 text-[#E1306C]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const ThreadsLogo = () => (
  <svg className="w-4.5 h-4.5 text-stone-950" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12.186 24c-3.567 0-6.402-1.157-8.427-3.44C1.734 18.277 1 15.34 1 11.83 1 8.358 2.062 5.5 4.159 3.327 6.257 1.155 9.176 0 12.84 0c3.702 0 6.643 1.155 8.741 3.432C23.679 5.71 24.7 8.653 24.7 12.18c0 .546-.022 1.05-.067 1.512H6.012c.112 2.373.918 4.283 2.418 5.731 1.5 1.448 3.51 2.172 6.03 2.172 2.091 0 3.864-.47 5.318-1.411l1.528 2.646c-2.068 1.407-4.665 2.11-7.79 2.11zM6.08 10.97h15.26c-.112-2.164-.85-3.885-2.213-5.163-1.364-1.278-3.32-1.917-5.867-1.917-2.457 0-4.38.64-5.768 1.917-1.388 1.278-2.184 2.999-2.388 5.163z" />
  </svg>
);

export const ReviewsSection: React.FC = () => {
  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'x':
        return <XLogo />;
      case 'instagram':
        return <InstagramLogo />;
      case 'threads':
        return <ThreadsLogo />;
      default:
        return <XLogo />;
    }
  };

  const getPlatformLabel = (platform: string) => {
    switch (platform) {
      case 'x':
        return 'X';
      case 'instagram':
        return 'IG';
      case 'threads':
        return 'Threads';
      default:
        return 'X';
    }
  };

  return (
    <section id="reviews" className="py-20 sm:py-24 bg-white border-t border-stone-200/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#B24B66] block mb-2">
            Community & Curated
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-950 tracking-tight">
            Praised by visionaries and everyday collectors
          </h2>
        </motion.div>

        {/* Staggered Dazzle Cards on Scroll with 8px radius */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((rev, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{
                duration: 0.7,
                delay: idx * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="bg-[#FBFBFB] rounded-[8px] p-8 border border-stone-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_16px_32px_rgba(212,122,148,0.08)] flex flex-col justify-between transition-shadow"
            >
              <div>
                <div className="flex items-center gap-1 text-[#D47A94] mb-4">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + idx * 0.1 + i * 0.05 }}
                    >
                      <Star className="w-4 h-4 fill-[#D47A94]" />
                    </motion.div>
                  ))}
                </div>
                <p className="text-sm sm:text-base text-stone-900 font-medium leading-relaxed italic mb-6">
                  &ldquo;{rev.content}&rdquo;
                </p>
              </div>

              {/* Anonymous attribution with profile icon */}
              <div className="border-t border-stone-200/80 pt-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-[8px] bg-white border border-stone-200 flex items-center justify-center shadow-xs shrink-0">
                    {getPlatformIcon(rev.platform)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-base font-extrabold text-stone-950">
                        Anonymous
                      </h4>
                      <span className="text-[10px] uppercase font-bold text-stone-500 bg-stone-200/70 px-1.5 py-0.5 rounded-[4px]">
                        {getPlatformLabel(rev.platform)}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-stone-600">
                      {rev.role}
                    </p>
                  </div>
                </div>
                <Quote className="w-5 h-5 text-stone-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
