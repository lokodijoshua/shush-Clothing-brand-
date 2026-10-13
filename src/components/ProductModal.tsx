import React, { useState } from 'react';
import { X, Check, Leaf, ShieldCheck, Truck, RefreshCw, ShoppingBag } from 'lucide-react';
import { Product } from '../data/products';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, selectedColor: string) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, selectedColor);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-stone-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-black transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Product Image showcase in soft arch / blush frame */}
          <div className="relative bg-[#F8EEF1] p-8 flex flex-col items-center justify-center min-h-[340px] md:min-h-full">
            {product.isEco && (
              <span className="absolute top-6 left-6 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/80 backdrop-blur text-xs font-semibold text-emerald-800 uppercase tracking-wider">
                <Leaf className="w-3 h-3 fill-emerald-600 text-transparent" />
                ECO CERTIFIED
              </span>
            )}

            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain max-h-[300px] drop-shadow-[0_15px_25px_rgba(0,0,0,0.12)] transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Right: Specifications & Buy module */}
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs uppercase font-bold tracking-widest text-[#D47A94]">
                  {product.collection}
                </span>
                <span className="text-xl font-extrabold text-stone-900 tabular-nums">
                  ${product.price.toLocaleString()}
                </span>
              </div>

              <h2 className="text-2xl font-extrabold text-stone-900 tracking-tight mb-2">
                {product.name}
              </h2>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Color Selection */}
              <div className="mb-6">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                  Finish / Color: <span className="text-stone-900 font-semibold">{selectedColor}</span>
                </label>
                <div className="flex items-center gap-3">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`group relative p-1 rounded-full transition-all cursor-pointer ${
                        selectedColor === c.name ? 'ring-2 ring-[#D47A94] ring-offset-2' : 'hover:scale-105'
                      }`}
                      title={c.name}
                    >
                      <span
                        className="block w-6 h-6 rounded-full border border-black/10 shadow-xs"
                        style={{ backgroundColor: c.hex }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Material specifications */}
              <div className="space-y-2 mb-6 border-t border-b border-stone-100 py-3 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span className="font-semibold text-stone-700">Dimensions:</span>
                  <span>{product.dimensions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-stone-700">Weight:</span>
                  <span>{product.weight}</span>
                </div>
                <div>
                  <span className="font-semibold text-stone-700 block mb-1">Materials:</span>
                  <ul className="list-disc list-inside space-y-0.5 text-stone-500">
                    {product.materials.map((m, idx) => (
                      <li key={idx}>{m}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Action Buttons & Guarantees */}
            <div>
              <button
                onClick={handleAdd}
                className={`w-full py-3.5 px-6 rounded-full font-bold text-sm tracking-wide flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer shadow-md ${
                  addedAnimation
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#D47A94] hover:bg-[#C96984] text-white'
                }`}
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag — ${product.price.toLocaleString()}</span>
                  </>
                )}
              </button>

              <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[10px] text-stone-500 font-medium">
                <div className="flex flex-col items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-stone-400" />
                  <span>Free Global Delivery</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-stone-400" />
                  <span>2-Year Warranty</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <RefreshCw className="w-3.5 h-3.5 text-stone-400" />
                  <span>30-Day Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
