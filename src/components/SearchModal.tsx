import React, { useState } from 'react';
import { X, Search, ArrowRight } from 'lucide-react';
import { Product, PRODUCTS } from '../data/products';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');

  const filtered = PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.collection.toLowerCase().includes(query.toLowerCase()) ||
    p.shortDesc.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-stone-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 sm:p-6 border-b border-stone-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-stone-400" />
          <input
            type="text"
            placeholder="Search Sabrina, Brielle, chrome, vegan leather..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full text-base sm:text-lg font-medium text-stone-900 placeholder:text-stone-400 focus:outline-hidden"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-100 text-stone-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto">
          <div className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3">
            {query ? `Results (${filtered.length})` : 'Popular Searches'}
          </div>

          <div className="space-y-3">
            {filtered.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  onSelectProduct(product);
                  onClose();
                }}
                className="flex items-center justify-between p-3 rounded-2xl hover:bg-stone-50 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#F8EEF1] p-1 flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-stone-900 group-hover:text-[#D47A94] transition-colors">
                      {product.name}
                    </h4>
                    <p className="text-xs text-stone-500">
                      {product.collection} · ${product.price.toLocaleString()}
                    </p>
                  </div>
                </div>

                <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-[#D47A94] transition-colors" />
              </div>
            ))}

            {filtered.length === 0 && (
              <p className="text-sm text-stone-500 py-6 text-center">
                No matching bags found for &ldquo;{query}&rdquo;.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
