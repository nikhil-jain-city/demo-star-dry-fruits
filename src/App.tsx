import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import CheckoutModal from "./components/CheckoutModal";
import QuickViewModal from "./components/QuickViewModal";
import SearchModal from "./components/SearchModal";
import {
  HomeView,
  ShopView,
  ProductDetailView,
  AboutView,
  CorporateView,
  BlogsView,
  BlogDetailView,
  ContactView,
  FAQView,
  WishlistView,
  OrderTrackingView,
} from "./components/Views";
import { Product, CartItem } from "./types";
import { products } from "./data";

export default function App() {
  // Navigation & Sub-views states
  const [activeTab, setActiveTab] = useState<string>("home");
  const [selectedProductId, setSelectedProductId] = useState<string>("alm-mamra");
  const [selectedBlogId, setSelectedBlogId] = useState<string>("blog-1");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Storage / Cart states
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("star_dry_fruits_cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const saved = localStorage.getItem("star_dry_fruits_wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  // Modal displays
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem("star_dry_fruits_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("star_dry_fruits_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Cart operations
  const handleAddToCart = (product: Product, size: string) => {
    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex((item) => item.product.id === product.id && item.size === size);
      if (existingIdx > -1) {
        const nextCart = [...prevCart];
        nextCart[existingIdx].quantity += 1;
        return nextCart;
      } else {
        return [...prevCart, { product, size, quantity: 1 }];
      }
    });
    // Open drawer to give elegant immediate visual validation
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (productId: string, size: string) => {
    setCart((prevCart) => prevCart.filter((item) => !(item.product.id === productId && item.size === size)));
  };

  const handleUpdateCartQty = (productId: string, size: string, change: number) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.product.id === productId && item.size === size) {
            return { ...item, quantity: Math.max(1, item.quantity + change) };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
    });
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Wishlist operations
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prevWishlist) => {
      const exists = prevWishlist.some((item) => item.id === product.id);
      if (exists) {
        return prevWishlist.filter((item) => item.id !== product.id);
      } else {
        return [...prevWishlist, product];
      }
    });
  };

  const handleRemoveFromWishlist = (product: Product) => {
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== product.id));
  };

  // Quick view triggers
  const handleQuickView = (product: Product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  // Search submission trigger
  const handleSearchSubmit = (query: string) => {
    setSearchQuery(query);
    setActiveTab("shop");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Calculate cart counts
  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const cartSubtotal = cart.reduce((total, item) => {
    const price = item.product.discountPrice || item.product.price;
    let sizeMultiplier = 1;
    if (item.selectedSize === "500g") sizeMultiplier = 1.8;
    if (item.selectedSize === "1kg") sizeMultiplier = 3.2;
    const adjustedPrice = Math.round(price * sizeMultiplier);
    return total + adjustedPrice * item.quantity;
  }, 0);

  return (
    <div className="min-h-screen bg-[#FFF9F2] text-primary font-sans selection:bg-secondary selection:text-white flex flex-col justify-between">
      
      {/* Announcement banner bar */}
      <div id="announcement-bar" className="bg-primary text-[#FFF9F2] py-2 px-4 text-center text-[10px] sm:text-xs font-semibold tracking-wider uppercase border-b border-secondary/15 relative z-45">
        Complimentary Express Air Dispatch on orders over ₹1,500. Use Code: <span className="text-secondary font-black">ROYAL15</span> for 15% off.
      </div>

      {/* Sticky header navbar navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          // If returning from search query tab clicks, clear query so full catalog is seen
          if (tab !== "shop") {
            setSearchQuery("");
          }
        }}
        cartCount={totalCartCount}
        onCartOpen={() => setIsCartOpen(true)}
        onSearchOpen={() => setIsSearchOpen(true)}
        wishlistCount={wishlist.length}
      />

      {/* Primary content router section */}
      <main id="main-content-router" className="flex-grow pt-24 min-h-[70vh]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + (activeTab === "product-detail" ? selectedProductId : activeTab === "blog-detail" ? selectedBlogId : "")}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {activeTab === "home" && (
              <HomeView
                setActiveTab={setActiveTab}
                onSelectProduct={setSelectedProductId}
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleToggleWishlist}
                wishlist={wishlist}
                onQuickView={handleQuickView}
              />
            )}

            {activeTab === "shop" && (
              <ShopView
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleToggleWishlist}
                wishlist={wishlist}
                onQuickView={handleQuickView}
                onSelectProduct={setSelectedProductId}
                setActiveTab={setActiveTab}
                initialSearchQuery={searchQuery}
              />
            )}

            {activeTab === "product-detail" && (
              <ProductDetailView
                productId={selectedProductId}
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleToggleWishlist}
                wishlist={wishlist}
                setActiveTab={setActiveTab}
              />
            )}

            {activeTab === "about" && <AboutView />}

            {activeTab === "corporate" && <CorporateView />}

            {activeTab === "blogs" && (
              <BlogsView
                onSelectBlog={setSelectedBlogId}
                setActiveTab={setActiveTab}
              />
            )}

            {activeTab === "blog-detail" && (
              <BlogDetailView
                blogId={selectedBlogId}
                setActiveTab={setActiveTab}
              />
            )}

            {activeTab === "contact" && <ContactView />}

            {activeTab === "faq" && <FAQView />}

            {activeTab === "wishlist" && (
              <WishlistView
                wishlist={wishlist}
                onAddToCart={handleAddToCart}
                onRemoveFromWishlist={handleRemoveFromWishlist}
                setActiveTab={setActiveTab}
              />
            )}

            {activeTab === "order-tracking" && <OrderTrackingView />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global premium brand footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Overlay Drawer Components */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onRemoveItem={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateCartQty}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        onClearCart={handleClearCart}
        subtotal={cartSubtotal}
      />

      <QuickViewModal
        product={quickViewProduct}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        onAddToCart={handleAddToCart}
        onAddToWishlist={handleToggleWishlist}
        isWishlisted={quickViewProduct ? wishlist.some((w) => w.id === quickViewProduct.id) : false}
        onSelectProduct={setSelectedProductId}
        setActiveTab={setActiveTab}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSearchSubmit={handleSearchSubmit}
        onSelectProduct={setSelectedProductId}
        setActiveTab={setActiveTab}
      />

    </div>
  );
}
