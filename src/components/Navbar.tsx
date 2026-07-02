import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Heart, ShoppingBag, Menu, X, ChevronDown, Award, Gift, Sparkles } from "lucide-react";
import { categories } from "../data";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  wishlistCount: number;
  onCartOpen: () => void;
  onSearchOpen: () => void;
}

export default function Navbar({
  activeTab,
  setActiveTab,
  cartCount,
  wishlistCount,
  onCartOpen,
  onSearchOpen,
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "shop", label: "Collections", mega: true },
    { id: "corporate", label: "Corporate Gifting" },
    { id: "about", label: "Our Story" },
    { id: "blogs", label: "Gourmet Gazette" },
    { id: "faq", label: "FAQ" },
    { id: "contact", label: "Contact Us" },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
    setIsMegaMenuOpen(false);
  };

  return (
    <header id="main-header" className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Announcement Bar */}
      <div id="announcement-bar" className="bg-primary text-[#FFF9F2] text-xs font-medium py-2.5 px-4 text-center tracking-wide flex items-center justify-center gap-2 overflow-hidden border-b border-secondary/20">
        <Sparkles size={13} className="text-secondary animate-pulse" />
        <span>Complimentary Hand-Written Calligraphy Note & Royal Wax Seal with Every Gifting Box</span>
        <span className="hidden md:inline-block">|</span>
        <span className="hidden md:inline-block">Express Air Delivery Across Metro Cities</span>
      </div>

      {/* Main Header Container */}
      <nav id="navbar-container" className="glass border-b border-secondary/15 py-4 px-4 md:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo */}
          <button
            id="nav-logo"
            onClick={() => handleNavClick("home")}
            className="flex flex-col items-start cursor-pointer text-left focus:outline-none"
          >
            <span className="font-serif text-2xl tracking-[0.25em] text-primary font-extrabold leading-none">
              STAR
            </span>
            <span className="font-sans text-[9px] tracking-[0.45em] text-secondary uppercase font-semibold mt-0.5">
              DRY FRUITS
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <div id="desktop-nav" className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => {
              if (item.mega) {
                return (
                  <div
                    key={item.id}
                    className="relative"
                    onMouseEnter={() => setIsMegaMenuOpen(true)}
                    onMouseLeave={() => setIsMegaMenuOpen(false)}
                  >
                    <button
                      id={`nav-${item.id}`}
                      className={`font-sans text-xs uppercase tracking-widest font-medium py-2 flex items-center gap-1 cursor-pointer transition-colors ${
                        activeTab === "shop" ? "text-primary border-b border-secondary" : "text-primary/75 hover:text-secondary"
                      }`}
                    >
                      {item.label}
                      <ChevronDown size={12} className={`transition-transform duration-300 ${isMegaMenuOpen ? "rotate-180" : ""}`} />
                    </button>

                    {/* Mega Menu */}
                    <AnimatePresence>
                      {isMegaMenuOpen && (
                        <motion.div
                          id="nav-mega-menu"
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="absolute left-1/2 -translate-x-[40%] top-full pt-4 w-[850px]"
                        >
                          <div className="bg-[#FFF9F2] border border-secondary/20 rounded-2xl shadow-xl p-8 grid grid-cols-4 gap-6 glass">
                            {/* Categories Grid */}
                            <div className="col-span-3 grid grid-cols-3 gap-6">
                              <div className="col-span-3 border-b border-secondary/10 pb-2">
                                <h4 className="font-serif text-sm font-semibold tracking-wide text-primary">Explore Premium Varieties</h4>
                              </div>
                              {categories.slice(0, 6).map((cat) => (
                                <button
                                  key={cat.id}
                                  onClick={() => handleNavClick("shop")}
                                  className="group flex gap-3 text-left items-center cursor-pointer p-1.5 rounded-lg hover:bg-secondary/5 transition-colors"
                                >
                                  <div className="w-12 h-12 rounded-xl overflow-hidden border border-secondary/15 flex-shrink-0">
                                    <img
                                      src={cat.image}
                                      alt={cat.name}
                                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                      referrerPolicy="no-referrer"
                                    />
                                  </div>
                                  <div>
                                    <span className="font-sans text-xs font-semibold block text-primary group-hover:text-secondary transition-colors">
                                      {cat.name}
                                    </span>
                                    <span className="font-sans text-[10px] text-primary/50">
                                      {cat.itemCount} Varieties
                                    </span>
                                  </div>
                                </button>
                              ))}
                            </div>

                            {/* Promotional Panel */}
                            <div className="col-span-1 bg-gradient-to-br from-primary/5 to-secondary/15 p-5 rounded-xl border border-secondary/20 flex flex-col justify-between">
                              <div>
                                <div className="flex items-center gap-1.5 text-secondary text-[10px] uppercase tracking-wider font-semibold mb-2">
                                  <Award size={13} />
                                  <span>Signature Offer</span>
                                </div>
                                <h5 className="font-serif text-sm font-bold text-primary mb-1">Luxury Gifting Boxes</h5>
                                <p className="font-sans text-[11px] text-primary/70 leading-relaxed">
                                  Handcrafted imperial boxes designed for memorable presentations.
                                </p>
                              </div>
                              <button
                                onClick={() => handleNavClick("shop")}
                                className="mt-4 w-full bg-primary hover:bg-secondary text-[#FFF9F2] font-sans text-[10px] uppercase tracking-widest font-semibold py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
                              >
                                <Gift size={12} />
                                View Hampers
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <button
                  key={item.id}
                  id={`nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`font-sans text-xs uppercase tracking-widest font-medium py-2 border-b-2 cursor-pointer transition-all ${
                    activeTab === item.id
                      ? "text-primary border-secondary"
                      : "text-primary/75 border-transparent hover:text-secondary"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Action Icons */}
          <div id="nav-actions" className="flex items-center gap-2 md:gap-4">
            {/* Search Trigger */}
            <button
              id="search-trigger"
              onClick={onSearchOpen}
              className="p-2 text-primary hover:text-secondary hover:bg-secondary/5 rounded-full transition-all cursor-pointer"
              aria-label="Search Catalog"
            >
              <Search size={19} />
            </button>

            {/* Wishlist Trigger */}
            <button
              id="wishlist-trigger"
              onClick={() => handleNavClick("wishlist")}
              className="p-2 text-primary hover:text-secondary hover:bg-secondary/5 rounded-full transition-all relative cursor-pointer"
              aria-label="View Wishlist"
            >
              <Heart size={19} className={wishlistCount > 0 ? "fill-secondary text-secondary" : ""} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-secondary text-primary font-sans text-[9px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-sm border border-cream">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Trigger */}
            <button
              id="cart-trigger"
              onClick={onCartOpen}
              className="p-2 text-[#FFF9F2] bg-primary hover:bg-secondary hover:scale-105 rounded-full transition-all relative cursor-pointer"
              aria-label="Open Shopping Bag"
            >
              <ShoppingBag size={17} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-secondary text-primary font-sans text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm border border-primary">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              id="mobile-menu-trigger"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-primary hover:text-secondary rounded-full transition-all cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-nav-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden w-full bg-[#FFF9F2] border-b border-secondary/20 shadow-lg overflow-hidden glass absolute left-0 z-30"
          >
            <div className="flex flex-col py-6 px-6 gap-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left font-sans text-sm uppercase tracking-widest font-semibold py-2 transition-colors ${
                    activeTab === item.id ? "text-secondary pl-2 border-l-2 border-secondary" : "text-primary hover:text-secondary"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="h-[1px] bg-secondary/10 my-2" />
              {/* Promo section inside mobile menu */}
              <div className="bg-gradient-to-r from-primary/5 to-secondary/15 p-4 rounded-xl border border-secondary/20 flex items-center justify-between">
                <div>
                  <h5 className="font-serif text-xs font-bold text-primary">Luxury Diwali Assortment</h5>
                  <p className="font-sans text-[10px] text-primary/65">Book premium brass plates for guest gifts.</p>
                </div>
                <button
                  onClick={() => handleNavClick("shop")}
                  className="bg-primary text-[#FFF9F2] font-sans text-[9px] uppercase tracking-widest font-bold py-1.5 px-3 rounded-lg cursor-pointer"
                >
                  Shop Box
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
