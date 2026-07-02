import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Star, Heart, ShoppingBag, Eye, ShieldCheck, Dumbbell } from "lucide-react";
import { Product } from "../types";

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, size: string) => void;
  onAddToWishlist: (product: Product) => void;
  isWishlisted: boolean;
  onSelectProduct: (productId: string) => void;
  setActiveTab: (tab: string) => void;
}

export default function QuickViewModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onAddToWishlist,
  isWishlisted,
  onSelectProduct,
  setActiveTab,
}: QuickViewModalProps) {
  const [selectedSize, setSelectedSize] = useState("");

  // Initialize selected size when product loads
  React.useEffect(() => {
    if (product) {
      setSelectedSize(product.sizeOptions[0]);
    }
  }, [product]);

  if (!product) return null;

  const basePrice = product.discountPrice || product.price;
  let sizeMultiplier = 1;
  if (selectedSize === "500g") sizeMultiplier = 1.8;
  if (selectedSize === "1kg") sizeMultiplier = 3.2;
  const currentPrice = Math.round(basePrice * sizeMultiplier);

  const handleFullDetailsClick = () => {
    onSelectProduct(product.id);
    setActiveTab("product-detail");
    onClose();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="quickview-root" className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            id="quickview-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black"
          />

          {/* Dialog Body */}
          <motion.div
            id="quickview-box"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="bg-[#FFF9F2] w-full max-w-3xl rounded-2xl shadow-2xl relative overflow-hidden flex flex-col md:flex-row border border-secondary/25 z-50 max-h-[90vh] md:max-h-[80vh]"
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 hover:bg-secondary/15 text-primary hover:text-secondary rounded-full transition-all cursor-pointer z-10"
              aria-label="Close Lightbox"
            >
              <X size={18} />
            </button>

            {/* Left Column: Image Container */}
            <div className="w-full md:w-1/2 relative bg-cream border-b md:border-b-0 md:border-r border-secondary/15 aspect-square md:aspect-auto flex items-center justify-center overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={() => onAddToWishlist(product)}
                className="absolute top-4 left-4 p-2.5 bg-white/95 text-primary hover:text-red-600 rounded-full shadow transition-all cursor-pointer"
              >
                <Heart size={15} className={isWishlisted ? "fill-red-600 text-red-600 animate-pulse" : ""} />
              </button>
            </div>

            {/* Right Column: Information Forms */}
            <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto flex flex-col justify-between text-left">
              <div>
                <span className="font-sans text-[10px] uppercase tracking-widest text-secondary font-bold mb-1 block">
                  {product.category.replace("-", " ")}
                </span>
                
                <h3 className="font-serif text-lg md:text-xl font-bold text-primary mb-2 leading-snug">
                  {product.name}
                </h3>

                {/* Stars */}
                <div className="flex items-center gap-1.5 mb-4">
                  <div className="flex items-center text-amber-500">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        size={11}
                        className={i < Math.floor(product.rating) ? "fill-amber-500" : "text-gray-300"}
                      />
                    ))}
                  </div>
                  <span className="font-mono text-[10px] text-primary/60 font-semibold">{product.rating}</span>
                  <span className="font-sans text-[10px] text-primary/45">({product.reviewsCount} Customer Reviews)</span>
                </div>

                <p className="font-sans text-xs text-primary/75 leading-relaxed mb-4">
                  {product.description}
                </p>

                {/* Key Benefits */}
                <div className="mb-4">
                  <span className="font-sans text-[9px] uppercase tracking-wider font-bold text-primary/60 mb-1.5 block">
                    Signature Benefits
                  </span>
                  <ul className="flex flex-col gap-1 text-[11px] text-primary/75 font-medium pl-1">
                    {product.benefits.slice(0, 2).map((b, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Size options */}
                <div className="mb-6">
                  <span className="font-sans text-[10px] uppercase tracking-wider font-bold text-primary/60 mb-2 block">
                    Select Net Weight
                  </span>
                  <div className="flex gap-2">
                    {product.sizeOptions.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`px-3 py-1.5 rounded-lg border text-xs font-sans font-bold transition-all cursor-pointer ${
                          selectedSize === sz
                            ? "bg-primary text-[#FFF9F2] border-primary"
                            : "bg-white border-secondary/20 text-primary hover:border-primary/50"
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price & Primary Action row */}
              <div className="border-t border-secondary/15 pt-4 mt-auto">
                <div className="flex items-end justify-between mb-4">
                  <div>
                    <span className="font-sans text-[9px] text-primary/40 uppercase tracking-wider block">
                      Royal Selection Price
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-sans text-lg font-black text-primary">
                        ₹{currentPrice}
                      </span>
                      {product.discountPrice && (
                        <span className="font-sans text-xs text-primary/40 line-through">
                          ₹{Math.round(product.price * sizeMultiplier)}
                        </span>
                      )}
                    </div>
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${product.stock ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700"}`}>
                    {product.stock ? "In Stock" : "Temporarily Out"}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      onAddToCart(product, selectedSize);
                      onClose();
                    }}
                    className="bg-primary hover:bg-secondary text-[#FFF9F2] font-sans text-xs uppercase tracking-widest font-extrabold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <ShoppingBag size={14} />
                    Add To Bag
                  </button>

                  <button
                    onClick={handleFullDetailsClick}
                    className="bg-white hover:bg-secondary/10 border border-secondary text-primary font-sans text-xs uppercase tracking-widest font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Eye size={14} />
                    Full Details
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
