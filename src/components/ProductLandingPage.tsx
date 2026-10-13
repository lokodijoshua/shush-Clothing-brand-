import React, { useState } from 'react';
import {
  ArrowLeft,
  ShoppingBag,
  Leaf,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  Sparkles,
  ChevronRight,
  Share2,
} from 'lucide-react';
import { Product, PRODUCTS } from '../data/products';

interface ProductLandingPageProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, selectedColor?: string) => void;
  onOpenCart: () => void;
}

export const ProductLandingPage: React.FC<ProductLandingPageProps> = ({
  product,
  onBack,
  onAddToCart,
  onOpenCart,
}) => {
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors[0]?.name || 'Standard'
  );
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'materials' | 'shipping'>('details');

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product, selectedColor);
    }
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product, selectedColor);
    }
    onOpenCart();
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `shush — ${product.name}`,
          text: product.shortDesc,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2200);
      }
    } catch {
      // Ignore user cancellation
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFB] flex flex-col font-sans-clean text-[#111111] selection:bg-[#E58DA3]/30 selection:text-[#B24B66]">
      {/* Top Glassmorphic Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-stone-200/60 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <button
            onClick={onBack}
            className="group inline-flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-stone-600 hover:text-stone-950 transition-colors py-2 px-3 rounded-full hover:bg-stone-100/80 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Showcase</span>
          </button>

          {/* shush Brand Center Wordmark */}
          <button
            onClick={onBack}
            className="font-brand text-2xl sm:text-3xl font-bold tracking-tight text-[#E293A7] hover:scale-105 transition-transform cursor-pointer"
          >
            shush
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2.5 rounded-full text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer relative"
              title="Share product"
              aria-label="Share product"
            >
              <Share2 className="w-4 h-4" />
              {copiedLink && (
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-bold bg-stone-900 text-white px-2 py-0.5 rounded-md whitespace-nowrap">
                  Link copied!
                </span>
              )}
            </button>
            <button
              onClick={onOpenCart}
              className="inline-flex items-center gap-2 bg-[#18181B] hover:bg-stone-800 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-sm transition-all cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#E293A7]" />
              <span>Bag</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Product Stage */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-medium text-stone-400 mb-8">
          <button onClick={onBack} className="hover:text-stone-700 transition-colors cursor-pointer">
            Home
          </button>
          <ChevronRight className="w-3 h-3 text-stone-300" />
          <span className="text-stone-500">{product.collection}</span>
          <ChevronRight className="w-3 h-3 text-stone-300" />
          <span className="text-stone-900 font-semibold">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Left / Gallery Column: 7 Cols */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="relative w-full rounded-2xl bg-gradient-to-b from-[#F9EFF2] via-[#F4E3E7] to-[#EED6DC] p-8 sm:p-14 flex items-center justify-center min-h-[420px] sm:min-h-[520px] overflow-hidden border border-white/60 shadow-[0_20px_60px_-15px_rgba(226,147,167,0.25)]">
              {/* Decorative radial aura */}
              <div className="absolute inset-0 bg-radial from-white/70 via-transparent to-transparent pointer-events-none" />

              {/* Eco Badge */}
              {product.isEco && (
                <div className="absolute top-6 left-6 z-10 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md text-[11px] font-bold text-emerald-900 border border-white/60 shadow-xs">
                  <Leaf className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                  <span>ECO CERTIFIED</span>
                </div>
              )}

              {/* Tag / Category Badge */}
              <div className="absolute top-6 right-6 z-10 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-900/85 backdrop-blur-md text-[11px] font-bold text-white shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#E293A7]" />
                <span>{product.tag || product.category}</span>
              </div>

              {/* Product Sculpture Image */}
              <img
                src={product.image}
                alt={product.name}
                className="relative z-10 w-full max-w-[420px] max-h-[420px] object-contain drop-shadow-[0_28px_40px_rgba(0,0,0,0.18)] transition-transform duration-700 hover:scale-105"
              />

              {/* Subtle caption */}
              <span className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[11px] uppercase tracking-widest text-stone-500/80 font-semibold pointer-events-none">
                Organic Sculpture Edition
              </span>
            </div>

            {/* Quick Guarantees Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
              <div className="p-4 rounded-xl bg-white border border-stone-200/70 shadow-xs flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#F8EEF1] text-[#B24B66] flex items-center justify-center shrink-0">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900">Complimentary Courier</h4>
                  <p className="text-[11px] text-stone-500">Free global insured shipping</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-stone-200/70 shadow-xs flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#F8EEF1] text-[#B24B66] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900">Authentic & Certified</h4>
                  <p className="text-[11px] text-stone-500">NFC cryptographic card</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-stone-200/70 shadow-xs flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#F8EEF1] text-[#B24B66] flex items-center justify-center shrink-0">
                  <RotateCcw className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900">30-Day Returns</h4>
                  <p className="text-[11px] text-stone-500">Hassle-free luxury return</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right / Product Details & Purchase Form: 5 Cols */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-white rounded-2xl border border-stone-200/80 p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between gap-4 mb-2">
                <span className="text-xs font-extrabold tracking-widest text-[#D47A94] uppercase">
                  {product.collection}
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/60">
                  In Stock & Ready to Dispatch
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-950 tracking-tight mb-2">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-black text-stone-950 tabular-nums">
                  ${product.price.toLocaleString()}
                </span>
                <span className="text-xs text-stone-400 font-medium">USD • VAT & Duties Included</span>
              </div>

              <p className="text-sm text-stone-600 leading-relaxed mb-6 pb-6 border-b border-stone-100">
                {product.description}
              </p>

              {/* Color Finish Selection */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-stone-600 mb-3">
                  <span>Selected Color / Finish</span>
                  <span className="text-[#B24B66] font-semibold lowercase tracking-normal text-sm">
                    {selectedColor}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {product.colors.map((c) => {
                    const isSelected = selectedColor === c.name;
                    return (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`group flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#D47A94] bg-[#FBF0F4] text-stone-950 ring-2 ring-[#D47A94]/20'
                            : 'border-stone-200 bg-white hover:border-stone-300 text-stone-700'
                        }`}
                      >
                        <span
                          className="w-4 h-4 rounded-full border border-black/15 shrink-0 shadow-2xs"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span>{c.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity selector */}
              <div className="mb-6 flex items-center justify-between gap-4">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-600">
                  Quantity
                </span>
                <div className="inline-flex items-center border border-stone-200 rounded-xl bg-stone-50 overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3.5 py-1.5 text-stone-600 hover:text-stone-950 hover:bg-stone-100 transition-colors text-sm font-bold cursor-pointer"
                  >
                    −
                  </button>
                  <span className="px-4 py-1.5 text-xs font-bold text-stone-900 tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                    className="px-3.5 py-1.5 text-stone-600 hover:text-stone-950 hover:bg-stone-100 transition-colors text-sm font-bold cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleBuyNow}
                  className="w-full py-4 px-6 rounded-xl bg-stone-950 hover:bg-black text-white font-bold text-sm tracking-wide shadow-lg shadow-black/10 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4 text-[#E293A7]" />
                  <span>Buy Now — ${(product.price * quantity).toLocaleString()}</span>
                </button>

                <button
                  onClick={handleAdd}
                  className="w-full py-3.5 px-6 rounded-xl bg-[#F8EEF1] hover:bg-[#F2DEE4] text-[#8C2C47] font-bold text-sm tracking-wide transition-all border border-[#E9C3CE] cursor-pointer flex items-center justify-center gap-2"
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-700">Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <span>Add to Bag</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Tabbed Specifications */}
            <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-sm">
              <div className="flex items-center gap-4 border-b border-stone-100 pb-3 mb-4">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`text-xs font-bold uppercase tracking-wider pb-1 transition-colors cursor-pointer ${
                    activeTab === 'details'
                      ? 'text-stone-950 border-b-2 border-stone-950'
                      : 'text-stone-400 hover:text-stone-700'
                  }`}
                >
                  Dimensions & Fit
                </button>
                <button
                  onClick={() => setActiveTab('materials')}
                  className={`text-xs font-bold uppercase tracking-wider pb-1 transition-colors cursor-pointer ${
                    activeTab === 'materials'
                      ? 'text-stone-950 border-b-2 border-stone-950'
                      : 'text-stone-400 hover:text-stone-700'
                  }`}
                >
                  Materials
                </button>
                <button
                  onClick={() => setActiveTab('shipping')}
                  className={`text-xs font-bold uppercase tracking-wider pb-1 transition-colors cursor-pointer ${
                    activeTab === 'shipping'
                      ? 'text-stone-950 border-b-2 border-stone-950'
                      : 'text-stone-400 hover:text-stone-700'
                  }`}
                >
                  Shipping & Care
                </button>
              </div>

              {activeTab === 'details' && (
                <div className="space-y-2.5 text-xs text-stone-600">
                  <div className="flex justify-between py-1.5 border-b border-stone-50">
                    <span className="font-semibold text-stone-900">Dimensions</span>
                    <span>{product.dimensions}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-stone-50">
                    <span className="font-semibold text-stone-900">Sculptural Weight</span>
                    <span>{product.weight}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-stone-50">
                    <span className="font-semibold text-stone-900">Collection</span>
                    <span>{product.collection}</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="font-semibold text-stone-900">Strap</span>
                    <span>Adjustable chrome link & bio-leather strap included</span>
                  </div>
                </div>
              )}

              {activeTab === 'materials' && (
                <div className="space-y-2 text-xs text-stone-600">
                  <p className="font-medium mb-2">Sustainable & futurist material curation:</p>
                  <ul className="space-y-1.5 list-disc list-inside">
                    {product.materials.map((mat, i) => (
                      <li key={i} className="text-stone-700">{mat}</li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'shipping' && (
                <div className="space-y-2 text-xs text-stone-600 leading-relaxed">
                  <p>
                    All shush orders are packaged in 100% biodegradable sculpted cases with velvet-touch dust bags.
                  </p>
                  <p>
                    Orders placed before 2 PM CET dispatch same-day via carbon-offset express logistics with end-to-end telemetry tracking.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Curated Recommendations */}
        <section className="mt-16 sm:mt-24 pt-12 border-t border-stone-200">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#D47A94] block mb-1">
                Curated Companions
              </span>
              <h3 className="text-2xl font-extrabold text-stone-950">You May Also Adore</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map((rel) => (
              <div
                key={rel.id}
                className="group bg-white rounded-2xl border border-stone-200/80 p-5 hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div className="relative aspect-square rounded-xl bg-gradient-to-b from-[#FAF2F4] to-[#F1E0E5] p-6 flex items-center justify-center mb-4 overflow-hidden">
                  <img
                    src={rel.image}
                    alt={rel.name}
                    className="w-full h-full object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/90 text-stone-800">
                    {rel.collection}
                  </span>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-extrabold text-stone-950 text-base">{rel.name}</h4>
                    <span className="font-bold text-sm text-stone-900">${rel.price}</span>
                  </div>
                  <p className="text-xs text-stone-500 line-clamp-2 mb-4">{rel.shortDesc}</p>
                </div>

                <button
                  onClick={() => {
                    onAddToCart(rel);
                    onOpenCart();
                  }}
                  className="w-full py-2.5 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-[#E293A7]" />
                  <span>Buy Now</span>
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
