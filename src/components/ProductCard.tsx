import React from "react";
import { motion } from "motion/react";
import { Star, Eye, ShoppingCart, Heart, Sparkles } from "lucide-react";
import { Product } from "../types";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, size: string) => void;
  onAddToWishlist: (product: Product) => void;
  isWishlisted: boolean;
  onQuickView: (product: Product) => void;
  onSelectProduct: (productId: string) => void;
  setActiveTab: (tab: string) => void;
  key?: string;
}

export default function ProductCard({
  product,
  onAddToCart,
  onAddToWishlist,
  isWishlisted,
  onQuickView,
  onSelectProduct,
  setActiveTab,
}: ProductCardProps) {
  const handleCardClick = () => {
    onSelectProduct(product.id);
    setActiveTab("product-detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.div
      id={`product-card-${product.id}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="group relative flex flex-col bg-white border border-secondary/15 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-secondary/35 transition-all duration-300 flex-grow"
    >
      {/* Product Image Section */}
      <div className="relative aspect-square overflow-hidden bg-cream border-b border-secondary/5 flex-shrink-0 cursor-pointer" onClick={handleCardClick}>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
          {product.isBestseller && (
            <span className="bg-primary text-[#FFF9F2] text-[9px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded-md flex items-center gap-1 shadow-sm">
              <Sparkles size={10} className="text-secondary fill-secondary" />
              Bestseller
            </span>
          )}
          {product.isNew && (
            <span className="bg-secondary text-primary text-[9px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-md shadow-sm">
              New Arrival
            </span>
          )}
          {product.discountPercent && (
            <span className="bg-red-700 text-white text-[9px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-md shadow-sm">
              -{product.discountPercent}% Off
            </span>
          )}
        </div>

        {/* Product Image with Hover Zoom */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
          referrerPolicy="no-referrer"
        />

        {/* Glassmorphic Actions Slide-up Overlay */}
        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="p-3 bg-white/90 hover:bg-white text-primary hover:text-secondary rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-350 ease-out cursor-pointer"
            title="Quick View"
          >
            <Eye size={17} />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product, product.sizeOptions[0]);
            }}
            className="p-3 bg-primary hover:bg-secondary text-[#FFF9F2] hover:scale-105 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-350 ease-out cursor-pointer"
            title="Add to Shopping Bag"
          >
            <ShoppingCart size={17} />
          </button>
        </div>
      </div>

      {/* Wishlist Button (Always visible on top right) */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onAddToWishlist(product);
        }}
        className="absolute top-3 right-3 z-10 p-2 bg-white/95 hover:bg-white text-primary/75 hover:text-red-600 rounded-full shadow-sm hover:shadow-md transition-all cursor-pointer"
        aria-label="Add to Wishlist"
      >
        <Heart
          size={15}
          className={`${isWishlisted ? "fill-red-600 text-red-600 animate-pulse" : "text-primary/75"}`}
        />
      </button>

      {/* Product Information Section */}
      <div className="p-4 md:p-5 flex flex-col flex-grow text-left cursor-pointer" onClick={handleCardClick}>
        
        {/* Category Label */}
        <span className="font-sans text-[9px] uppercase tracking-widest text-secondary font-bold mb-1.5">
          {product.category.replace("-", " ")}
        </span>

        {/* Product Title */}
        <h4 className="font-serif text-sm md:text-base font-extrabold text-primary group-hover:text-secondary transition-colors duration-200 line-clamp-1 leading-tight mb-2">
          {product.name}
        </h4>

        {/* Ratings block */}
        <div className="flex items-center gap-1.5 mb-3.5">
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
          <span className="font-sans text-[10px] text-primary/40">({product.reviewsCount})</span>
        </div>

        {/* Price & Add to Cart button */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-secondary/5">
          <div className="flex flex-col">
            {product.discountPrice ? (
              <div className="flex items-center gap-1.5">
                <span className="font-sans text-sm md:text-base font-extrabold text-primary">
                  ₹{product.discountPrice}
                </span>
                <span className="font-sans text-xs text-primary/45 line-through">
                  ₹{product.price}
                </span>
              </div>
            ) : (
              <span className="font-sans text-sm md:text-base font-extrabold text-primary">
                ₹{product.price}
              </span>
            )}
            <span className="font-sans text-[9px] text-primary/40 uppercase tracking-wider font-medium">
              for {product.sizeOptions[0]} pack
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product, product.sizeOptions[0]);
            }}
            className="bg-[#FFF9F2] hover:bg-primary border border-secondary text-primary hover:text-[#FFF9F2] font-sans text-[10px] uppercase tracking-wider font-extrabold py-2 px-3.5 rounded-lg transition-all hover:scale-[1.03] cursor-pointer"
          >
            Add
          </button>
        </div>
      </div>
    </motion.div>
  );
}
