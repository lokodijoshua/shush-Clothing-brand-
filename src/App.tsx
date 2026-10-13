/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { NewArrivalsSection } from './components/NewArrivalsSection';
import { StorySection } from './components/StorySection';
import { CollectionsSection } from './components/CollectionsSection';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { ProductLandingPage } from './components/ProductLandingPage';
import { Product, PRODUCTS } from './data/products';

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [landingProduct, setLandingProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: PRODUCTS.find((p) => p.id === 'sabrina') || PRODUCTS[0],
      quantity: 1,
      selectedColor: 'Mirror Chrome',
    },
  ]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const flagshipProduct = PRODUCTS.find((p) => p.id === 'hero-hush') || PRODUCTS[0];

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleAddToCart = (product: Product, selectedColor?: string) => {
    const color = selectedColor || product.colors[0]?.name || 'Standard';
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.selectedColor === color
      );
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.selectedColor === color
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1, selectedColor: color }];
    });
    showToast(`Added ${product.name} (${color}) to your bag`);
  };

  const handleOpenLandingPage = (product: Product) => {
    setLandingProduct(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleNavigate = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FBFBFB] flex flex-col font-sans-clean text-[#111111] selection:bg-[#E58DA3]/30 selection:text-[#B24B66]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white text-xs font-semibold px-4 py-3 rounded-full shadow-xl border border-stone-800 animate-in fade-in slide-in-from-bottom-3 duration-200 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D47A94]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {landingProduct ? (
        /* Full Dedicated Landing Page for the Add-to-Bag / Purchase Section */
        <ProductLandingPage
          product={landingProduct}
          onBack={() => {
            setLandingProduct(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onAddToCart={handleAddToCart}
          onOpenCart={() => setIsCartOpen(true)}
        />
      ) : (
        /* Standard Home Showcase Landing Page */
        <>
          {/* Sticky Header with 3-Zone navigation and Chubby HUSH Wordmark */}
          <Header
            cartCount={totalCartCount}
            onOpenCart={() => setIsCartOpen(true)}
            onOpenSearch={() => setIsSearchOpen(true)}
            onNavigate={handleNavigate}
          />

          <main className="flex-1">
            {/* Hero Section: "your [BAG] oice" */}
            <HeroSection
              flagshipProduct={flagshipProduct}
              onSelectProduct={handleOpenLandingPage}
              onLearnMore={() => handleOpenLandingPage(flagshipProduct)}
            />

            {/* Section 2: Full-width Pink Banner with NEW ARRIVALS & 3 Arched Capsule Cards */}
            <NewArrivalsSection
              onSelectProduct={handleOpenLandingPage}
              onAddToCart={handleOpenLandingPage}
            />

            {/* Section 3: Brand Story & Futurism Manifesto + Giant Chubby HUSH + Avant-Garde Collage */}
            <StorySection
              onLearnMoreAboutBrand={() => handleNavigate('collections')}
            />

            {/* Section 4: "Our collections" with Interactive Filters */}
            <CollectionsSection
              onSelectProduct={handleOpenLandingPage}
              onAddToCart={handleOpenLandingPage}
            />

            {/* Section 5: Press Reviews & Critiques */}
            <ReviewsSection />
          </main>

          {/* Luxury Minimalist Footer */}
          <Footer />
        </>
      )}

      {/* Quick View Modal (Secondary) */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(p) => {
          setIsSearchOpen(false);
          handleOpenLandingPage(p);
        }}
      />
    </div>
  );
}
