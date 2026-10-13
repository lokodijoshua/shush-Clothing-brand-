import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 3000);
    }
  };

  return (
    <footer className="bg-[#111111] text-white pt-20 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-stone-800">
          {/* Brand Col */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <span className="font-brand text-4xl sm:text-5xl font-bold tracking-tight text-[#E293A7] block mb-4">
                shush
              </span>
              <p className="text-sm text-stone-400 max-w-sm leading-relaxed">
                Sculptural luxury accessories at the threshold of organic anatomy and cybernetic precision. Designed for modern life, built with sustainable intention.
              </p>
            </div>

            <div className="mt-8 text-xs text-stone-500">
              © {new Date().getFullYear()} shush Couture Studio. All rights reserved.
            </div>
          </div>

          {/* Links Col 1 */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-stone-300">
              Exploration
            </h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>
                <a href="#new-arrivals" className="hover:text-white transition-colors">
                  New Arrivals
                </a>
              </li>
              <li>
                <a href="#collections" className="hover:text-white transition-colors">
                  Chrome Series
                </a>
              </li>
              <li>
                <a href="#collections" className="hover:text-white transition-colors">
                  Cyber Minimal
                </a>
              </li>
              <li>
                <a href="#collections" className="hover:text-white transition-colors">
                  Micro Confections
                </a>
              </li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-stone-300">
              Maison
            </h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  Our Philosophy
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  Eco Bio-Polymers
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">
                  Press & Critics
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  Care & Restoration
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Col */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-stone-300">
              Private Drops
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Receive confidential invites to our limited batch capsule releases and archival previews.
            </p>

            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <input
                type="email"
                placeholder="Enter email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-full bg-stone-900 border border-stone-800 text-xs text-white placeholder:text-stone-500 focus:outline-hidden focus:border-[#D47A94]"
              />
              <button
                type="submit"
                className="p-2.5 rounded-full bg-[#D47A94] hover:bg-[#C96984] text-white transition-colors cursor-pointer shrink-0"
                aria-label="Subscribe"
              >
                {subscribed ? <Check className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
            {subscribed && (
              <p className="text-[11px] text-[#E293A7]">
                You are on the VIP archival list.
              </p>
            )}
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Global Delivery & Customs</span>
          </div>
          <span>Crafted with zero compromises on ethics and aesthetics.</span>
        </div>
      </div>
    </footer>
  );
};
