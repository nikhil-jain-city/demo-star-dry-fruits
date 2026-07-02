import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Search, Sparkles, ArrowRight } from "lucide-react";
import { products } from "../data";
import { Product } from "../types";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearchSubmit: (query: string) => void;
  onSelectProduct: (productId: string) => void;
  setActiveTab: (tab: string) => void;
}

export default function SearchModal({
  isOpen,
  onClose,
  onSearchSubmit,
  onSelectProduct,
  setActiveTab,
}: SearchModalProps) {
  const [query, setQuery] = useState("");

  const suggestedSearches = [
    "Mamra Almonds",
    "Jumbo Cashews W180",
    "Iranian Akbari",
    "Ajwa Dates",
    "Saffron Custom Chest",
    "7-in-1 Seed mix",
  ];

  const filteredSuggestions = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter((p) => p.name.toLowerCase().includes(q)).slice(0, 4);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearchSubmit(query);
      onClose();
    }
  };

  const handleSuggestionClick = (p: Product) => {
    onSelectProduct(p.id);
    setActiveTab("product-detail");
    onClose();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePopularSearchClick = (searchStr: string) => {
    onSearchSubmit(searchStr);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="search-modal-root" className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4">
          {/* Dark Backdrop overlay */}
          <motion.div
            id="search-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.95 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#2D1A08]/95"
          />

          {/* Close button top right */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2.5 bg-white/5 border border-white/10 hover:border-white/30 text-white hover:text-secondary rounded-full cursor-pointer transition-all z-10"
            aria-label="Exit Search Overlay"
          >
            <X size={20} />
          </button>

          {/* Search container Box */}
          <motion.div
            id="search-content-box"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full max-w-2xl relative z-10 text-left flex flex-col gap-10 px-4"
          >
            {/* Input form */}
            <form onSubmit={handleSubmit} className="relative flex items-center border-b-2 border-secondary/40 pb-3 focus-within:border-secondary transition-colors">
              <input
                type="text"
                autoFocus
                placeholder="Search Star dry fruits catalog..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent font-serif text-xl sm:text-2xl font-bold text-[#FFF9F2] placeholder-[#FFF9F2]/30 focus:outline-none"
              />
              <button type="submit" className="text-secondary hover:text-white cursor-pointer" aria-label="Perform Search">
                <Search size={22} />
              </button>
            </form>

            {/* Content Suggestions */}
            {query.trim().length > 0 ? (
              <div className="flex flex-col gap-4">
                <span className="font-sans text-[10px] uppercase tracking-wider font-extrabold text-[#FFF9F2]/40">
                  Gourmet Match Suggestions
                </span>
                {filteredSuggestions.length === 0 ? (
                  <p className="font-sans text-xs text-[#FFF9F2]/50">No immediate matches found. Press enter to perform full catalog query.</p>
                ) : (
                  <div className="flex flex-col gap-3">
                    {filteredSuggestions.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => handleSuggestionClick(p)}
                        className="flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/5 p-2 rounded-xl text-left cursor-pointer transition-all"
                      >
                        <div className="w-12 h-12 rounded bg-[#FFF9F2] overflow-hidden flex-shrink-0">
                          <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-grow">
                          <span className="font-serif text-xs font-bold text-[#FFF9F2] block leading-tight">{p.name}</span>
                          <span className="font-sans text-[10px] text-secondary font-bold block mt-1">₹{p.discountPrice || p.price}</span>
                        </div>
                        <ArrowRight size={14} className="text-[#FFF9F2]/40" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* Popular suggested searches */
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-1.5 font-sans text-[10px] uppercase tracking-wider font-extrabold text-[#FFF9F2]/40">
                  <Sparkles size={12} className="text-secondary fill-secondary" /> Popular Curations
                </div>
                
                <div className="flex flex-wrap gap-2.5">
                  {suggestedSearches.map((searchStr) => (
                    <button
                      key={searchStr}
                      onClick={() => handlePopularSearchClick(searchStr)}
                      className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-secondary rounded-xl text-xs font-sans text-[#FFF9F2] font-semibold cursor-pointer transition-all"
                    >
                      {searchStr}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
