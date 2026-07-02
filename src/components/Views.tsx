import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  Star,
  Sparkles,
  Award,
  Truck,
  ShieldCheck,
  Brain,
  Instagram,
  Mail,
  Search,
  SlidersHorizontal,
  ChevronRight,
  Heart,
  ShoppingCart,
  MapPin,
  Clock,
  Send,
  HelpCircle,
  FileText,
  Calendar,
  User,
  CheckCircle,
  RefreshCw,
  Gift,
  ChevronDown
} from "lucide-react";
import { products, categories, blogs, testimonials, faqs, festivalCollections, corporateGiftPackages } from "../data";
import { Product, BlogPost, Category, Testimonial } from "../types";
import ProductCard from "./ProductCard";

// ==========================================
// 1. HOME VIEW
// ==========================================
interface HomeViewProps {
  setActiveTab: (tab: string) => void;
  onSelectProduct: (productId: string) => void;
  onAddToCart: (product: Product, size: string) => void;
  onAddToWishlist: (product: Product) => void;
  wishlist: Product[];
  onQuickView: (product: Product) => void;
}

export function HomeView({
  setActiveTab,
  onSelectProduct,
  onAddToCart,
  onAddToWishlist,
  wishlist,
  onQuickView,
}: HomeViewProps) {
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);
  const [aiSelectedBenefit, setAiSelectedBenefit] = useState<string | null>(null);

  // Top 4 featured products
  const featuredProducts = useMemo(() => products.filter(p => p.isFeatured).slice(0, 4), []);

  const handleCategoryClick = () => {
    setActiveTab("shop");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAiRecommend = (concern: string) => {
    if (concern === "brain") {
      setAiSelectedBenefit("Kashmiri Mamra Almonds are exceptionally loaded with raw essential oils that aid neurotransmitter firing. Saffron additions further enhance neurological rejuvenation.");
    } else if (concern === "skin") {
      setAiSelectedBenefit("Damask Rose Almond Dragées and high-vitamin E California almond varieties boost skin elasticity, natural hydration, and collagen production.");
    } else if (concern === "energy") {
      setAiSelectedBenefit("Saudi Medjool & Ajwa Dates packed with organic digestible fibers release complex natural sugars for stable energy, perfect for premium athletic routines.");
    } else if (concern === "heart") {
      setAiSelectedBenefit("Chilean and Kashmiri Walnut Halves containing supreme plant-based Omega-3 fatty acids actively clean vascular paths and optimize heart cell health.");
    }
  };

  return (
    <div id="home-view-root" className="flex flex-col gap-20 pb-20">
      
      {/* Dynamic Luxury Hero */}
      <section id="hero-section" className="relative min-h-[85vh] flex items-center bg-gradient-to-b from-[#FFF9F2] via-secondary/5 to-[#FFF9F2] px-4 md:px-8 py-12 overflow-hidden">
        {/* Subtle Decorative Background Spheres */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 text-left">
          {/* Left Text content */}
          <div className="lg:col-span-7 flex flex-col gap-6 md:gap-8">
            <div className="flex items-center gap-2 text-secondary text-xs uppercase tracking-[0.25em] font-extrabold">
              <Sparkles size={14} className="fill-secondary text-secondary" />
              <span>Gourmet Horticultural Masterpiece</span>
            </div>
            
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-black text-primary leading-[1.1] tracking-tight">
              India's Premium <br />
              <span className="text-secondary italic font-serif font-normal">Dry Fruits</span> Destination
            </h1>

            <p className="font-sans text-sm md:text-base text-primary/70 leading-relaxed max-w-xl">
              Healthy. Fresh. Handpicked. Delivered. <br />
              Indulge in ancient wellness sourced directly from high-altitude Kashmiri valleys, pristine Goan orchards, and historic deserts of Al-Madinah.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => handleCategoryClick()}
                className="bg-primary hover:bg-secondary text-[#FFF9F2] font-sans text-xs uppercase tracking-widest font-extrabold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2.5 cursor-pointer"
              >
                Explore Collections
                <ArrowRight size={14} />
              </button>
              <button
                onClick={() => setActiveTab("corporate")}
                className="bg-white hover:bg-secondary/5 border border-secondary text-primary font-sans text-xs uppercase tracking-widest font-bold py-4 px-8 rounded-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Gift size={14} className="text-secondary" />
                Corporate Gifting
              </button>
            </div>

            {/* Micro counters in Hero */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-secondary/15">
              <div className="flex flex-col">
                <span className="font-serif text-xl md:text-2xl font-black text-primary">20+</span>
                <span className="font-sans text-[10px] uppercase tracking-wider text-primary/50 font-bold mt-1">Years Legacy</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl md:text-2xl font-black text-primary">3+</span>
                <span className="font-sans text-[10px] uppercase tracking-wider text-primary/50 font-bold mt-1">Flagships</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl md:text-2xl font-black text-primary">10000+</span>
                <span className="font-sans text-[10px] uppercase tracking-wider text-primary/50 font-bold mt-1">Patrons Served</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl md:text-2xl font-black text-primary">500+</span>
                <span className="font-sans text-[10px] uppercase tracking-wider text-primary/50 font-bold mt-1">Gourmet SKU</span>
              </div>
            </div>
          </div>

          {/* Right Product Image Banner */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full max-w-[420px] aspect-square rounded-[2rem] overflow-hidden shadow-2xl border-2 border-secondary/20">
              <img
                src="https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=600&auto=format&fit=crop&q=80"
                alt="Star Dry Fruits Luxury Showcase"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent" />
              {/* Glass overlay badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 glass rounded-xl flex items-center gap-3">
                <Award size={24} className="text-secondary flex-shrink-0" />
                <div>
                  <span className="font-serif text-xs font-bold text-primary block">Grand Cru Selection</span>
                  <span className="font-sans text-[10px] text-primary/70">W180 Cashews & Mamra Almonds</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Categories Grid */}
      <section id="categories-section" className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center max-w-xl mx-auto mb-12 flex flex-col items-center gap-3">
          <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-secondary font-bold">Curated Classifications</span>
          <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-primary">Shop By Category</h2>
          <p className="font-sans text-xs md:text-sm text-primary/60 leading-relaxed">
            Every category represents highly sorted, non-pesticide, direct-sourced harvests of impeccable cosmetic and oil standard.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.slice(0, 8).map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick()}
              className="group cursor-pointer flex flex-col bg-white border border-secondary/15 rounded-2xl p-4 overflow-hidden shadow-sm hover:shadow-xl hover:border-secondary/35 transition-all text-left"
            >
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-cream mb-4 relative">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="font-serif text-sm md:text-base font-extrabold text-primary group-hover:text-secondary transition-colors leading-tight">
                {cat.name}
              </h3>
              <p className="font-sans text-[11px] text-primary/55 line-clamp-2 mt-1.5 leading-normal">
                {cat.description}
              </p>
              <span className="font-sans text-[9px] uppercase tracking-wider text-secondary font-bold mt-3.5 flex items-center gap-1">
                View Collection <ChevronRight size={10} />
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products Showcase */}
      <section id="featured-section" className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col sm:flex-row items-baseline justify-between gap-4 border-b border-secondary/15 pb-4 mb-10 text-left">
          <div>
            <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-secondary font-bold">Patron Favorites</span>
            <h2 className="font-serif text-2xl md:text-3xl font-extrabold text-primary mt-1">Our Signature Offerings</h2>
          </div>
          <button
            onClick={() => handleCategoryClick()}
            className="font-sans text-xs uppercase tracking-wider text-primary hover:text-secondary font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            Explore Full Catalog <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onAddToCart={onAddToCart}
              onAddToWishlist={onAddToWishlist}
              isWishlisted={wishlist.some((w) => w.id === p.id)}
              onQuickView={onQuickView}
              onSelectProduct={onSelectProduct}
              setActiveTab={setActiveTab}
            />
          ))}
        </div>
      </section>

      {/* Why Choose Us & AI Recommender Row */}
      <section id="why-choose-us" className="bg-primary text-[#FFF9F2] py-20 px-4 md:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Core Virtues */}
          <div className="lg:col-span-7 text-left flex flex-col gap-8">
            <div>
              <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-secondary font-bold">Uncompromising Quality</span>
              <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-cream mt-1.5">
                The Royal Purity Creed
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-4">
              <div className="flex gap-4 items-start">
                <div className="p-2.5 bg-white/5 border border-secondary/25 text-secondary rounded-xl">
                  <Award size={20} />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-cream">Direct Sourcing</h4>
                  <p className="font-sans text-xs text-[#FFF9F2]/70 leading-relaxed mt-1">
                    No middlemen. We physically acquire Mamra almonds from Kashmir, and Akbari pistachios directly from Iranian farmers.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-2.5 bg-white/5 border border-secondary/25 text-secondary rounded-xl">
                  <Truck size={20} />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-cream">Express Air Dispatch</h4>
                  <p className="font-sans text-xs text-[#FFF9F2]/70 leading-relaxed mt-1">
                    Sustaining optimal humidity levels. Freshly sorted batches shipped via rapid express air to maintain oil and crunch integrity.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-2.5 bg-white/5 border border-secondary/25 text-secondary rounded-xl">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-cream">No Fumigation</h4>
                  <p className="font-sans text-xs text-[#FFF9F2]/70 leading-relaxed mt-1">
                    Absolutely sulfur-free processing. No artificial polish, paraffin wax coating, or chemical preservatives are used.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-2.5 bg-white/5 border border-secondary/25 text-secondary rounded-xl">
                  <Gift size={20} />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-cream">Calligraphy Packing</h4>
                  <p className="font-sans text-xs text-[#FFF9F2]/70 leading-relaxed mt-1">
                    Each royal hamper is packed by hand, sealed with hot wax seals, and contains calligraphy note options on handmade scrolls.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right AI recommendation assistant mockup */}
          <div className="lg:col-span-5">
            <div className="glass-dark border border-secondary/35 rounded-2xl p-6 text-left flex flex-col gap-4 relative">
              <div className="absolute top-4 right-4 bg-secondary/15 border border-secondary/30 text-secondary text-[8px] uppercase font-mono tracking-widest px-2.5 py-1 rounded-full flex items-center gap-1">
                <Brain size={11} /> AI Recommender
              </div>
              
              <h3 className="font-serif text-base font-extrabold text-cream mt-1">
                Custom Nutrition Blueprint
              </h3>
              <p className="font-sans text-xs text-[#FFF9F2]/65 leading-relaxed">
                Click on any wellness concern below to let our algorithmic concierge recommend the perfect dry fruit.
              </p>

              <div className="grid grid-cols-2 gap-2.5 mt-2">
                <button
                  onClick={() => handleAiRecommend("brain")}
                  className="bg-white/5 hover:bg-secondary/15 border border-secondary/15 hover:border-secondary text-left p-3 rounded-lg font-sans text-xs text-[#FFF9F2] transition-all cursor-pointer flex flex-col gap-1"
                >
                  <strong className="text-secondary font-bold uppercase tracking-wider text-[9px]">Cognition</strong>
                  Brain & Memory
                </button>
                <button
                  onClick={() => handleAiRecommend("skin")}
                  className="bg-white/5 hover:bg-secondary/15 border border-secondary/15 hover:border-secondary text-left p-3 rounded-lg font-sans text-xs text-[#FFF9F2] transition-all cursor-pointer flex flex-col gap-1"
                >
                  <strong className="text-secondary font-bold uppercase tracking-wider text-[9px]">Aesthetics</strong>
                  Skin Collagen
                </button>
                <button
                  onClick={() => handleAiRecommend("energy")}
                  className="bg-white/5 hover:bg-secondary/15 border border-secondary/15 hover:border-secondary text-left p-3 rounded-lg font-sans text-xs text-[#FFF9F2] transition-all cursor-pointer flex flex-col gap-1"
                >
                  <strong className="text-secondary font-bold uppercase tracking-wider text-[9px]">Vigor</strong>
                  Instant Clean Fuel
                </button>
                <button
                  onClick={() => handleAiRecommend("heart")}
                  className="bg-white/5 hover:bg-secondary/15 border border-secondary/15 hover:border-secondary text-left p-3 rounded-lg font-sans text-xs text-[#FFF9F2] transition-all cursor-pointer flex flex-col gap-1"
                >
                  <strong className="text-secondary font-bold uppercase tracking-wider text-[9px]">Stamina</strong>
                  Heart & Cholesterol
                </button>
              </div>

              {/* Dynamic Answer Panel */}
              <AnimatePresence mode="wait">
                {aiSelectedBenefit && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-3 p-4 bg-[#FFF9F2]/5 rounded-xl border border-secondary/15 font-sans text-[11px] text-cream/85 leading-relaxed"
                  >
                    {aiSelectedBenefit}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </section>

      {/* Festival Gifting Collection Section */}
      <section id="festivals-section" className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center max-w-xl mx-auto mb-12 flex flex-col items-center gap-3">
          <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-secondary font-bold">Traditional Celebrations</span>
          <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-primary">Festival Gifting Suite</h2>
          <p className="font-sans text-xs md:text-sm text-primary/60 leading-relaxed">
            Beautifully embossed boxes crafted manually with customized greetings and handpicked contents to honor premium Indian relationships.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {festivalCollections.map((col) => (
            <div
              key={col.id}
              onClick={() => handleCategoryClick()}
              className="group cursor-pointer relative rounded-2xl overflow-hidden aspect-[4/3] shadow-md hover:shadow-2xl transition-all"
            >
              <img
                src={col.image}
                alt={col.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${col.themeColor} opacity-70 group-hover:opacity-80 transition-opacity`} />
              
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-left text-white">
                <span className="font-sans text-[9px] uppercase tracking-wider text-secondary font-bold mb-1">Star Festival Suite</span>
                <h3 className="font-serif text-lg font-black">{col.name}</h3>
                <p className="font-sans text-[11px] text-white/80 line-clamp-2 mt-1 font-light leading-normal">
                  {col.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Corporate Gifting Callout Section */}
      <section id="corporate-callout" className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="bg-[#FFF9F2] border-2 border-secondary/25 rounded-3xl p-8 md:p-14 text-left grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative overflow-hidden shadow-md">
          {/* Subtle gold decoration background */}
          <div className="absolute -right-16 -top-16 w-64 h-64 bg-secondary/10 rounded-full blur-2xl" />

          <div className="lg:col-span-8 flex flex-col gap-4 relative z-10">
            <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-secondary font-extrabold">Executive Procurement</span>
            <h2 className="font-serif text-3xl md:text-4xl font-black text-primary leading-tight">
              Bespoke Office hampers & <br />Bulk Custom Gifting
            </h2>
            <p className="font-sans text-xs md:text-sm text-primary/70 leading-relaxed max-w-xl">
              We coordinate high-volume corporate orders for top Indian enterprises. Print your corporate logo on hand-finished cedarwood drawers, select individual dry fruit weights, and include customized congratulatory letters.
            </p>
            <div className="flex flex-wrap gap-6 mt-2 text-xs font-bold text-primary">
              <span className="flex items-center gap-1.5"><CheckCircle size={14} className="text-secondary" /> Volume Discounts</span>
              <span className="flex items-center gap-1.5"><CheckCircle size={14} className="text-secondary" /> Logo Hot-stamping</span>
              <span className="flex items-center gap-1.5"><CheckCircle size={14} className="text-secondary" /> Air Deliveries Coordination</span>
            </div>
          </div>

          <div className="lg:col-span-4 flex justify-end relative z-10 w-full">
            <button
              onClick={() => setActiveTab("corporate")}
              className="w-full lg:w-auto bg-primary hover:bg-secondary text-[#FFF9F2] font-sans text-xs uppercase tracking-widest font-extrabold py-4 px-8 rounded-xl shadow-lg transition-all text-center cursor-pointer"
            >
              Request Custom Quotation
            </button>
          </div>
        </div>
      </section>

      {/* Customer Testimonial Slider */}
      <section id="testimonials-section" className="bg-[#2D1A08] text-[#FFF9F2] py-20 px-4 md:px-8 relative overflow-hidden">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-6 relative z-10">
          <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-secondary font-extrabold">Sovereign Affluence</span>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-cream">Patron Testimonials</h2>
          
          <div className="h-0.5 w-16 bg-secondary my-2" />

          {/* Testimonial slider content */}
          <div className="min-h-[140px] flex items-center justify-center">
            <p className="font-serif text-base md:text-lg italic text-[#FFF9F2]/90 leading-relaxed max-w-3xl">
              "{testimonials[activeTestimonialIndex].comment}"
            </p>
          </div>

          <div className="flex flex-col items-center gap-2 mt-4">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-secondary/40 shadow">
              <img
                src={testimonials[activeTestimonialIndex].avatar}
                alt={testimonials[activeTestimonialIndex].name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <span className="font-sans text-xs font-bold text-cream block">
                {testimonials[activeTestimonialIndex].name}
              </span>
              <span className="font-sans text-[10px] text-[#FFF9F2]/60 uppercase tracking-wider font-light block">
                {testimonials[activeTestimonialIndex].role}, {testimonials[activeTestimonialIndex].company}
              </span>
            </div>
          </div>

          {/* Slider Pagination circles */}
          <div className="flex gap-2.5 mt-6">
            {testimonials.slice(0, 5).map((t, idx) => (
              <button
                key={t.id}
                onClick={() => setActiveTestimonialIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                  activeTestimonialIndex === idx ? "bg-secondary scale-110" : "bg-[#FFF9F2]/20 hover:bg-[#FFF9F2]/40"
                }`}
                aria-label={`Go to Slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Instagram lifestyle gallery */}
      <section id="instagram-section" className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 flex flex-col items-center gap-2">
          <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-secondary font-bold">Social Vignettes</span>
          <h2 className="font-serif text-2xl md:text-3xl font-extrabold text-primary">#StarDryFruitsLife</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=400&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=400&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=400&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1585502766743-1e967a327ff5?w=400&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1534080391025-a76c6ec29a43?w=400&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=400&auto=format&fit=crop&q=80",
          ].map((url, i) => (
            <div
              key={i}
              className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer shadow-sm"
            >
              <img
                src={url}
                alt="Lifestyle Social dry fruits"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <Instagram size={18} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter signup section */}
      <section id="newsletter-section" className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="bg-gradient-to-b from-[#FFF9F2] to-secondary/15 border border-secondary/20 rounded-3xl p-8 md:p-12 text-center flex flex-col items-center gap-6 shadow-sm">
          <div className="p-3 bg-primary/5 text-primary rounded-full border border-secondary/10">
            <Mail size={22} />
          </div>
          <div className="max-w-md">
            <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-secondary font-extrabold mb-1 block">
              Bespoke Updates
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary">
              Subscribe to the Gazette
            </h2>
            <p className="font-sans text-xs text-primary/60 mt-2 leading-relaxed">
              Receive notifications regarding fresh seasonal harvests, limited edition Diwali trunks, and wellness articles from our direct-sourcing leads.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Successfully subscribed to Star Gazette concierge updates!");
            }}
            className="flex flex-col sm:flex-row gap-3 w-full max-w-md"
          >
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow bg-white border border-secondary/20 rounded-xl px-4 py-3 font-sans text-xs focus:outline-none focus:border-primary shadow-inner"
              required
            />
            <button
              type="submit"
              className="bg-primary hover:bg-secondary text-[#FFF9F2] font-sans text-xs uppercase tracking-widest font-extrabold py-3 px-6 rounded-xl cursor-pointer transition-colors"
            >
              Join Us
            </button>
          </form>
        </div>
      </section>

    </div>
  );
}


// ==========================================
// 2. PRODUCT LISTING VIEW (SHOP)
// ==========================================
interface ShopViewProps {
  onAddToCart: (product: Product, size: string) => void;
  onAddToWishlist: (product: Product) => void;
  wishlist: Product[];
  onQuickView: (product: Product) => void;
  onSelectProduct: (productId: string) => void;
  setActiveTab: (tab: string) => void;
  initialSearchQuery?: string;
}

export function ShopView({
  onAddToCart,
  onAddToWishlist,
  wishlist,
  onQuickView,
  onSelectProduct,
  setActiveTab,
  initialSearchQuery = "",
}: ShopViewProps) {
  // Filters
  const [search, setSearch] = useState(initialSearchQuery);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStock, setSelectedStock] = useState("all"); // all, in-stock
  const [priceLimit, setPriceLimit] = useState(5000);
  const [sortOption, setSortOption] = useState("featured"); // featured, price-low, price-high, rating

  // Sync with initialSearchQuery if it changes
  React.useEffect(() => {
    setSearch(initialSearchQuery);
  }, [initialSearchQuery]);

  // Reset filters
  const handleResetFilters = () => {
    setSearch("");
    setSelectedCategory("all");
    setSelectedStock("all");
    setPriceLimit(5000);
    setSortOption("featured");
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(q) || p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Stock filter
    if (selectedStock === "in-stock") {
      result = result.filter((p) => p.stock);
    }

    // Price limit
    result = result.filter((p) => {
      const currentPrice = p.discountPrice || p.price;
      return currentPrice <= priceLimit;
    });

    // Sorting
    if (sortOption === "price-low") {
      result.sort((a, b) => {
        const pa = a.discountPrice || a.price;
        const pb = b.discountPrice || b.price;
        return pa - pb;
      });
    } else if (sortOption === "price-high") {
      result.sort((a, b) => {
        const pa = a.discountPrice || a.price;
        const pb = b.discountPrice || b.price;
        return pb - pa;
      });
    } else if (sortOption === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [search, selectedCategory, selectedStock, priceLimit, sortOption]);

  return (
    <div id="shop-view" className="max-w-7xl mx-auto px-4 md:px-8 py-10 text-left">
      {/* Breadcrumb banner */}
      <div className="flex gap-2 text-[10px] text-primary/40 uppercase font-semibold tracking-wider mb-6">
        <span>Boutique</span>
        <ChevronRight size={10} className="mt-0.5" />
        <span className="text-primary/75">Full Catalog Collection</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Filters column */}
        <aside id="shop-filters-column" className="lg:col-span-3 bg-white border border-secondary/15 rounded-2xl p-6 shadow-sm flex flex-col gap-6 sticky top-28">
          <div className="flex items-center justify-between border-b border-secondary/10 pb-3">
            <h3 className="font-serif text-sm font-bold text-primary flex items-center gap-1.5">
              <SlidersHorizontal size={14} className="text-secondary" /> Filter Collection
            </h3>
            <button
              onClick={handleResetFilters}
              className="font-sans text-[10px] text-secondary hover:underline cursor-pointer uppercase tracking-wider font-bold"
            >
              Clear All
            </button>
          </div>

          {/* Search bar inside filters */}
          <div className="flex flex-col gap-1.5">
            <span className="font-sans text-[10px] uppercase font-bold text-primary/55">Search Keywords</span>
            <div className="relative">
              <input
                type="text"
                placeholder="Mamra, cashews, saffron..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-cream border border-secondary/15 rounded-lg pl-8 pr-3 py-1.5 font-sans text-xs focus:outline-none focus:border-primary shadow-inner"
              />
              <Search size={13} className="text-primary/40 absolute left-3 top-2.5" />
            </div>
          </div>

          {/* Categories select list */}
          <div className="flex flex-col gap-1.5">
            <span className="font-sans text-[10px] uppercase font-bold text-primary/55">Category Selection</span>
            <div className="flex flex-col gap-1 mt-1">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`text-left font-sans text-xs py-1.5 px-2.5 rounded-lg font-medium cursor-pointer transition-colors ${
                  selectedCategory === "all" ? "bg-primary text-[#FFF9F2]" : "hover:bg-secondary/10 text-primary"
                }`}
              >
                All Varieties
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`text-left font-sans text-xs py-1.5 px-2.5 rounded-lg font-medium cursor-pointer transition-colors flex items-center justify-between ${
                    selectedCategory === cat.id ? "bg-primary text-[#FFF9F2]" : "hover:bg-secondary/10 text-primary"
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className={`text-[9px] font-mono font-bold ${selectedCategory === cat.id ? "text-secondary" : "text-primary/40"}`}>
                    {cat.itemCount}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center font-sans text-[10px] uppercase font-bold text-primary/55">
              <span>Max Price</span>
              <span className="text-secondary font-mono font-bold">₹{priceLimit}</span>
            </div>
            <input
              type="range"
              min="200"
              max="5000"
              step="50"
              value={priceLimit}
              onChange={(e) => setPriceLimit(Number(e.target.value))}
              className="w-full mt-2 accent-primary cursor-pointer"
            />
          </div>

          {/* Availability */}
          <div className="flex flex-col gap-1.5">
            <span className="font-sans text-[10px] uppercase font-bold text-primary/55">Availability</span>
            <label className="flex items-center gap-2.5 text-xs text-primary font-medium mt-1 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedStock === "in-stock"}
                onChange={(e) => setSelectedStock(e.target.checked ? "in-stock" : "all")}
                className="accent-primary"
              />
              Exclude Out of Stock
            </label>
          </div>
        </aside>

        {/* Right Products list grid */}
        <main id="shop-products-main" className="flex-1 lg:col-span-9">
          
          {/* Header toolbar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-secondary/10 pb-4 mb-6">
            <span className="font-sans text-xs text-primary/60">
              Showing <strong className="text-primary font-bold">{filteredProducts.length}</strong> luxurious matches
            </span>

            {/* Sorting dropdown */}
            <div className="flex items-center gap-2">
              <span className="font-sans text-[10px] uppercase font-bold text-primary/55">Sort By:</span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="bg-white border border-secondary/15 rounded-lg px-3 py-1.5 font-sans text-xs text-primary focus:outline-none focus:border-primary shadow-sm"
              >
                <option value="featured">Featured Selections</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Patron Rating</option>
              </select>
            </div>
          </div>

          {/* Product Cards Grid */}
          {filteredProducts.length === 0 ? (
            <div className="p-16 text-center flex flex-col items-center justify-center gap-4">
              <Search size={36} className="text-primary/30" />
              <div>
                <h4 className="font-serif text-base font-bold text-primary">No Matching Products</h4>
                <p className="font-sans text-xs text-primary/55 mt-1">Adjust your filters or query to find a custom selection.</p>
              </div>
              <button
                onClick={handleResetFilters}
                className="bg-primary hover:bg-secondary text-[#FFF9F2] font-sans text-xs uppercase py-2 px-5 rounded-lg transition-colors cursor-pointer font-bold"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onAddToCart={onAddToCart}
                  onAddToWishlist={onAddToWishlist}
                  isWishlisted={wishlist.some((w) => w.id === p.id)}
                  onQuickView={onQuickView}
                  onSelectProduct={onSelectProduct}
                  setActiveTab={setActiveTab}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}


// ==========================================
// 3. PRODUCT DETAIL VIEW
// ==========================================
interface ProductDetailViewProps {
  productId: string;
  onAddToCart: (product: Product, size: string) => void;
  onAddToWishlist: (product: Product) => void;
  wishlist: Product[];
  setActiveTab: (tab: string) => void;
}

export function ProductDetailView({
  productId,
  onAddToCart,
  onAddToWishlist,
  wishlist,
  setActiveTab,
}: ProductDetailViewProps) {
  const product = useMemo(() => products.find((p) => p.id === productId) || products[0], [productId]);
  
  const [selectedSize, setSelectedSize] = useState(product.sizeOptions[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveInfoTab] = useState("benefits"); // benefits, nutrition, culinary
  const [pincode, setPincode] = useState("");
  const [deliveryStatus, setDeliveryStatus] = useState("");

  const basePrice = product.discountPrice || product.price;
  let sizeMultiplier = 1;
  if (selectedSize === "500g") sizeMultiplier = 1.8;
  if (selectedSize === "1kg") sizeMultiplier = 3.2;
  const currentPrice = Math.round(basePrice * sizeMultiplier);

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.trim().length === 6) {
      if (pincode.startsWith("11") || pincode.startsWith("40") || pincode.startsWith("56") || pincode.startsWith("60")) {
        setDeliveryStatus("✅ Complimentary Express Air Dispatch Available: Delivery in 24 Hours");
      } else {
        setDeliveryStatus("✅ Express Ground Shipment Available: Fulfill in 3-4 Business Days");
      }
    } else {
      setDeliveryStatus("❌ Invalid Indian Pincode. Please enter a 6-digit postal code.");
    }
  };

  const isWishlisted = wishlist.some((w) => w.id === product.id);

  // Suggest frequently bought together (usually a seed or date item)
  const suggestedAddon = useMemo(() => products.find((p) => p.id === "dat-medjool" || p.id === "see-mix-7") || products[1], []);

  return (
    <div id="product-detail-view" className="max-w-7xl mx-auto px-4 md:px-8 py-10 text-left">
      {/* Breadcrumbs */}
      <div className="flex gap-2 text-[10px] text-primary/40 uppercase font-semibold tracking-wider mb-8">
        <button onClick={() => setActiveTab("home")} className="hover:text-primary transition-colors cursor-pointer">Boutique</button>
        <ChevronRight size={10} className="mt-0.5" />
        <button onClick={() => setActiveTab("shop")} className="hover:text-primary transition-colors cursor-pointer">{product.category}</button>
        <ChevronRight size={10} className="mt-0.5" />
        <span className="text-primary/75">{product.name}</span>
      </div>

      {/* Main layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
        
        {/* Left Column: Huge Product Gallery */}
        <div id="product-gallery" className="lg:col-span-6 flex flex-col gap-4">
          <div className="aspect-square bg-cream rounded-2xl overflow-hidden border border-secondary/15 shadow-sm relative group">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
              referrerPolicy="no-referrer"
            />
            {product.isBestseller && (
              <span className="absolute top-4 left-4 bg-primary text-[#FFF9F2] text-[9px] uppercase tracking-wider font-extrabold px-3 py-1 rounded-md">
                Royal Choice
              </span>
            )}
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            {product.gallery.map((imgUrl, i) => (
              <div key={i} className="aspect-square rounded-xl overflow-hidden bg-cream border border-secondary/15 shadow-inner cursor-pointer hover:border-primary">
                <img src={imgUrl} alt="Alternative look" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Dynamic Form Purchase Block */}
        <div id="product-actions-column" className="lg:col-span-6 flex flex-col gap-6">
          <div>
            <span className="font-sans text-[10px] uppercase tracking-widest text-secondary font-extrabold mb-1.5 block">
              {product.category.replace("-", " ")}
            </span>
            <h1 className="font-serif text-2xl md:text-3xl font-black text-primary leading-tight">
              {product.name}
            </h1>

            {/* Stars */}
            <div className="flex items-center gap-2 mt-2.5">
              <div className="flex text-amber-500">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} size={13} className={i < Math.floor(product.rating) ? "fill-amber-500" : "text-gray-300"} />
                ))}
              </div>
              <span className="font-mono text-xs font-bold text-primary/70">{product.rating}</span>
              <span className="text-xs text-primary/45">({product.reviewsCount} verified patrons)</span>
            </div>
          </div>

          <div className="h-[1px] bg-secondary/15" />

          {/* Pricing */}
          <div className="flex items-baseline gap-3">
            <span className="font-sans text-2xl font-black text-primary">
              ₹{currentPrice}
            </span>
            {product.discountPrice && (
              <span className="font-sans text-sm text-primary/40 line-through">
                ₹{Math.round(product.price * sizeMultiplier)}
              </span>
            )}
            <span className="text-[10px] uppercase font-bold text-secondary tracking-wider block bg-secondary/5 border border-secondary/15 px-2.5 py-1 rounded">
              Selected: {selectedSize}
            </span>
          </div>

          <p className="font-sans text-xs text-primary/75 leading-relaxed">
            {product.description}
          </p>

          {/* Size Choice Buttons */}
          <div>
            <span className="font-sans text-[10px] uppercase tracking-wider font-extrabold text-primary/55 mb-2.5 block">
              Net Weight Selection
            </span>
            <div className="flex gap-3">
              {product.sizeOptions.map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`px-4 py-2 rounded-xl border text-xs font-sans font-bold transition-all cursor-pointer ${
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

          {/* Quantity Selector & Primary add triggers */}
          <div className="flex flex-wrap gap-4 items-center mt-2">
            <div className="flex items-center border border-secondary/25 rounded-xl bg-cream overflow-hidden">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3.5 py-2.5 hover:bg-secondary/15 text-primary cursor-pointer font-bold"
              >
                -
              </button>
              <span className="px-5 font-mono text-sm font-bold text-primary">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3.5 py-2.5 hover:bg-secondary/15 text-primary cursor-pointer font-bold"
              >
                +
              </button>
            </div>

            <button
              onClick={() => {
                // Add quantity loop
                for (let step = 0; step < quantity; step++) {
                  onAddToCart(product, selectedSize);
                }
              }}
              className="flex-grow bg-primary hover:bg-secondary text-[#FFF9F2] font-sans text-xs uppercase tracking-widest font-extrabold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.01] cursor-pointer"
            >
              <ShoppingCart size={15} />
              Add To Shopping Bag (₹{currentPrice * quantity})
            </button>

            <button
              onClick={() => onAddToWishlist(product)}
              className="p-3.5 bg-white border border-secondary/25 hover:text-red-600 rounded-xl transition-all cursor-pointer"
              title="Add to Favorites"
            >
              <Heart size={16} className={isWishlisted ? "fill-red-600 text-red-600" : "text-primary"} />
            </button>
          </div>

          <div className="h-[1px] bg-secondary/15 my-1" />

          {/* Delivery estimate lookup widget */}
          <form onSubmit={handlePincodeCheck} className="flex flex-col gap-2 bg-white border border-secondary/15 rounded-xl p-4 shadow-sm">
            <label className="font-sans text-[10px] uppercase font-bold text-primary/65 block">
              Delivery Pin-Code Check
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ex. 400001 (Mumbai)"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="flex-1 bg-cream border border-secondary/15 rounded-lg px-3 py-2 font-mono text-xs focus:outline-none focus:border-primary"
              />
              <button
                type="submit"
                className="bg-primary hover:bg-secondary text-[#FFF9F2] font-sans text-xs uppercase font-bold px-4 py-2 rounded-lg cursor-pointer transition-colors"
              >
                Lookup
              </button>
            </div>
            {deliveryStatus && (
              <p className="font-sans text-[10px] font-medium text-primary leading-normal mt-1">
                {deliveryStatus}
              </p>
            )}
          </form>
        </div>
      </div>

      {/* Tabs segment: Nutrition, Benefits, Pairing */}
      <section id="tabs-segment" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20 border-t border-secondary/15 pt-10">
        <div className="lg:col-span-4 flex flex-col gap-2 text-left">
          <button
            onClick={() => setActiveInfoTab("benefits")}
            className={`text-left font-serif text-base py-3 px-4 rounded-xl border transition-all cursor-pointer ${
              activeTab === "benefits" ? "border-primary bg-primary/5 text-primary font-bold" : "border-transparent hover:bg-secondary/5 text-primary/60"
            }`}
          >
            Organic Wellness Virtues
          </button>
          <button
            onClick={() => setActiveInfoTab("nutrition")}
            className={`text-left font-serif text-base py-3 px-4 rounded-xl border transition-all cursor-pointer ${
              activeTab === "nutrition" ? "border-primary bg-primary/5 text-primary font-bold" : "border-transparent hover:bg-secondary/5 text-primary/60"
            }`}
          >
            Clinical Nutritional Profile
          </button>
          <button
            onClick={() => setActiveInfoTab("culinary")}
            className={`text-left font-serif text-base py-3 px-4 rounded-xl border transition-all cursor-pointer ${
              activeTab === "culinary" ? "border-primary bg-primary/5 text-primary font-bold" : "border-transparent hover:bg-secondary/5 text-primary/60"
            }`}
          >
            Culinary Usage Guidance
          </button>
        </div>

        <div className="lg:col-span-8 bg-white border border-secondary/15 rounded-2xl p-6 md:p-8 shadow-sm">
          <AnimatePresence mode="wait">
            {activeTab === "benefits" && (
              <motion.div
                key="benefits"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-4"
              >
                <h3 className="font-serif text-base font-bold text-primary flex items-center gap-1.5 border-b border-secondary/5 pb-2">
                  <Star size={16} className="text-secondary fill-secondary" /> Wellness Benefits
                </h3>
                <ul className="flex flex-col gap-3 pl-1 text-xs text-primary/75 leading-relaxed">
                  {product.benefits.map((b, idx) => (
                    <li key={idx} className="flex gap-2 items-start">
                      <span className="w-2 h-2 rounded-full bg-secondary mt-1 flex-shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                  <li className="flex gap-2 items-start">
                    <span className="w-2 h-2 rounded-full bg-secondary mt-1 flex-shrink-0" />
                    <span>Contains rich traces of copper and potassium, essential for enzyme synthesis and muscle longevity.</span>
                  </li>
                </ul>
              </motion.div>
            )}

            {activeTab === "nutrition" && (
              <motion.div
                key="nutrition"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-4"
              >
                <h3 className="font-serif text-base font-bold text-primary flex items-center gap-1.5 border-b border-secondary/5 pb-2">
                  <FileText size={16} className="text-secondary" /> Nutrition metrics (Approx Per 100g)
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 font-sans text-xs">
                  <div className="bg-cream border border-secondary/10 p-3 rounded-xl flex flex-col items-center">
                    <span className="text-primary/40 text-[9px] uppercase font-bold">Energy</span>
                    <strong className="text-primary font-bold mt-1 text-sm">{product.nutrition.calories}</strong>
                  </div>
                  <div className="bg-cream border border-secondary/10 p-3 rounded-xl flex flex-col items-center">
                    <span className="text-primary/40 text-[9px] uppercase font-bold">Protein</span>
                    <strong className="text-primary font-bold mt-1 text-sm">{product.nutrition.protein}</strong>
                  </div>
                  <div className="bg-cream border border-secondary/10 p-3 rounded-xl flex flex-col items-center">
                    <span className="text-primary/40 text-[9px] uppercase font-bold">Total Carbs</span>
                    <strong className="text-primary font-bold mt-1 text-sm">{product.nutrition.carbs}</strong>
                  </div>
                  <div className="bg-cream border border-secondary/10 p-3 rounded-xl flex flex-col items-center">
                    <span className="text-primary/40 text-[9px] uppercase font-bold">Total Fat</span>
                    <strong className="text-primary font-bold mt-1 text-sm">{product.nutrition.fat}</strong>
                  </div>
                  <div className="bg-cream border border-secondary/10 p-3 rounded-xl flex flex-col items-center">
                    <span className="text-primary/40 text-[9px] uppercase font-bold">Dietary Fiber</span>
                    <strong className="text-primary font-bold mt-1 text-sm">{product.nutrition.fiber}</strong>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "culinary" && (
              <motion.div
                key="culinary"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-3 text-xs text-primary/75 leading-relaxed"
              >
                <h3 className="font-serif text-base font-bold text-primary flex items-center gap-1.5 border-b border-secondary/5 pb-2">
                  <Sparkles size={16} className="text-secondary" /> Culinary Pairing Suggestions
                </h3>
                <p>
                  Soak almonds or walnuts overnight in warm mineral water. Enjoy as a clean morning snack paired with dates, or blend into artisanal nut-milks and dessert bases.
                </p>
                <p>
                  Saffron-salted varieties serve as magnificent additions to luxury high-tea platters, cheese-boards, or gourmet kheer garnishes.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Frequently bought together */}
      <section id="frequently-bought" className="bg-white border border-secondary/15 rounded-2xl p-6 md:p-8 mb-20 shadow-sm">
        <h3 className="font-serif text-base font-extrabold text-primary mb-2">Frequently Bought Together</h3>
        <p className="font-sans text-[11px] text-primary/50 mb-6">Enhance your culinary routine by combining wellness elements.</p>

        <div className="flex flex-col md:flex-row items-center gap-6 justify-between text-left">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-xl border border-secondary/10 overflow-hidden bg-cream">
                <img src={product.image} alt="current" className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="font-serif text-xs font-bold text-primary block leading-tight">{product.name}</span>
                <span className="font-sans text-xs text-secondary font-bold">₹{currentPrice}</span>
              </div>
            </div>

            <span className="text-primary/45 text-lg font-black">+</span>

            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-xl border border-secondary/10 overflow-hidden bg-cream">
                <img src={suggestedAddon.image} alt="addon" className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="font-serif text-xs font-bold text-primary block leading-tight">{suggestedAddon.name}</span>
                <span className="font-sans text-xs text-secondary font-bold">₹{suggestedAddon.discountPrice || suggestedAddon.price}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              onAddToCart(product, selectedSize);
              onAddToCart(suggestedAddon, suggestedAddon.sizeOptions[0]);
              alert(`Added both ${product.name} and ${suggestedAddon.name} to your Shopping Bag!`);
            }}
            className="w-full md:w-auto bg-primary hover:bg-secondary text-[#FFF9F2] font-sans text-xs uppercase tracking-widest font-extrabold py-3 px-6 rounded-xl transition-colors cursor-pointer"
          >
            Add Bundle to Bag (₹{currentPrice + (suggestedAddon.discountPrice || suggestedAddon.price)})
          </button>
        </div>
      </section>

    </div>
  );
}


// ==========================================
// 4. OUR STORY (ABOUT US)
// ==========================================
export function AboutView() {
  const timelineEvents = [
    { year: "2006", title: "Orchard Foundation", desc: "First contracts with walnut growers of Pahalgam, Kashmir." },
    { year: "2011", title: "Direct Importation Setup", desc: "Forged partnerships with traditional Akbari sorting yards in Tehran." },
    { year: "2016", title: "Mumbai Flagship Boutique", desc: "Opened our premier retail boutique in Colaba, serving distinguished patrons." },
    { year: "2021", title: "Calligraphy & Hamper Studio", desc: "Launched customized royal gifting suites for high-end luxury Indian weddings." },
    { year: "2026", title: "Digital Presentation Suite", desc: "Establishing global storefronts to serve worldwide patrons with Air Dispatch." },
  ];

  return (
    <div id="about-view" className="max-w-5xl mx-auto px-4 py-10 text-left flex flex-col gap-16">
      
      {/* Narrative Section */}
      <section className="flex flex-col gap-6 md:gap-8 max-w-3xl">
        <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-secondary font-extrabold">Horticultural Chronicles</span>
        <h1 className="font-serif text-3xl md:text-5xl font-black text-primary leading-tight">
          A Century of Botanical Stewardship
        </h1>
        <p className="font-sans text-sm text-primary/75 leading-relaxed">
          Founded under mountain valleys in Jammu & Kashmir, Star Dry Fruits is born out of a single obsession: to source the highest physical quality, oil-rich whole nuts in existence. We operate our business with uncompromising direct partnerships, bypassing industrial bulk brokers to ensure fair returns for our multi-generational farmers.
        </p>
      </section>

      {/* Vision & Mission boxes */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="bg-white border border-secondary/15 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col gap-4">
          <div className="p-2.5 bg-primary/5 text-primary rounded-xl border border-secondary/10 self-start">
            <Award size={18} />
          </div>
          <h3 className="font-serif text-lg font-bold text-primary">Our Royal Vision</h3>
          <p className="font-sans text-xs text-primary/70 leading-relaxed">
            To make authentic, non-sulfur processed Indian and global dry fruits the gold-standard reference for clean wellness, preserving rural agrarian expertise and heirloom seed varieties.
          </p>
        </div>

        <div className="bg-white border border-secondary/15 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col gap-4">
          <div className="p-2.5 bg-primary/5 text-primary rounded-xl border border-secondary/10 self-start">
            <ShieldCheck size={18} />
          </div>
          <h3 className="font-serif text-lg font-bold text-primary">The Purity Mission</h3>
          <p className="font-sans text-xs text-primary/70 leading-relaxed">
            Eliminating industrial preservatives, synthetic coatings, and pesticide residue from dry fruit retail. Providing unmatched optical sorting and personalized calligraphic gifting.
          </p>
        </div>
      </section>

      {/* Elegant Timeline */}
      <section className="flex flex-col gap-8 border-t border-secondary/15 pt-12">
        <h2 className="font-serif text-2xl font-extrabold text-primary">Chronicles of Stewardship</h2>
        <div className="relative border-l border-secondary/25 pl-6 flex flex-col gap-8">
          {timelineEvents.map((ev, i) => (
            <div key={i} className="relative">
              <span className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-primary border-4 border-[#FFF9F2] shadow-sm flex items-center justify-center" />
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                <span className="font-mono text-xs font-bold text-secondary">{ev.year}</span>
                <h4 className="font-serif text-sm font-bold text-primary">{ev.title}</h4>
              </div>
              <p className="font-sans text-xs text-primary/60 mt-1 max-w-xl">{ev.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Founder Profile */}
      <section className="bg-gradient-to-r from-[#FFF9F2] to-secondary/10 border border-secondary/15 rounded-2xl p-6 md:p-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-4 flex justify-center">
          <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-secondary/25 shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80"
              alt="Founder Nikhil Sharma"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
        <div className="md:col-span-8 text-left flex flex-col gap-3">
          <span className="font-mono text-[9px] uppercase tracking-wider text-secondary font-bold">Stewardship Lead</span>
          <h3 className="font-serif text-xl font-bold text-primary">Nikhil Sharma</h3>
          <p className="font-sans text-xs text-primary/75 leading-relaxed">
            "When we began in 2006, dry fruits in India were sold in bulk gunny bags, exposing active nutrient oils to humidity and oxidative dust. We set out to treat these organic treasures like fine vintage wines—protecting them through small-batch sorting, beautiful custom ceramic packaging, and fast temperature-controlled transport."
          </p>
        </div>
      </section>

    </div>
  );
}


// ==========================================
// 5. CORPORATE GIFTING VIEW
// ==========================================
export function CorporateView() {
  const [formData, setFormData] = useState({ name: "", company: "", email: "", phone: "", qty: "50", package: "Sovereign Desk-Tray", message: "" });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
  };

  return (
    <div id="corporate-view" className="max-w-5xl mx-auto px-4 py-10 text-left flex flex-col gap-16">
      
      {/* Hero */}
      <section className="flex flex-col gap-6 md:gap-8 max-w-3xl">
        <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-secondary font-extrabold">Enterprise Logistics</span>
        <h1 className="font-serif text-3xl md:text-5xl font-black text-primary leading-tight">
          Corporate Custom Hampers
        </h1>
        <p className="font-sans text-sm text-primary/75 leading-relaxed">
          From executive board members to top-performing teams, honor achievements with customized wooden trunks, Moradabad hand-beaten brass trays, and certified high-grade Kashmiri nuts.
        </p>
      </section>

      {/* Package Tier cards */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {corporateGiftPackages.map((p) => (
          <div key={p.id} className="bg-white border border-secondary/15 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-xl hover:border-secondary/35 transition-all">
            <div>
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-cream mb-4 border border-secondary/5">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-serif text-base font-extrabold text-primary leading-tight">{p.name}</h3>
              <span className="font-mono text-xs font-bold text-secondary block mt-1">{p.priceRange}</span>
              <p className="font-sans text-[11px] text-primary/55 mt-2.5 leading-normal">{p.description}</p>
              
              <div className="h-[1px] bg-secondary/10 my-3" />
              
              <span className="font-sans text-[9px] uppercase tracking-wider font-bold text-primary/45 block mb-2">Sample Contents</span>
              <ul className="flex flex-col gap-1 text-[10px] text-primary/75 pl-1.5 font-medium">
                {p.contents.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <span className="font-mono text-[9px] text-primary/40 block mb-2">Min. MOQ: {p.minQuantity} hampers</span>
              <button
                onClick={() => setFormData({ ...formData, package: p.name })}
                className="w-full bg-primary hover:bg-secondary text-[#FFF9F2] font-sans text-[10px] uppercase tracking-widest font-bold py-2.5 px-4 rounded-lg cursor-pointer transition-colors"
              >
                Select Tier
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Bulk Inquiry Form */}
      <section className="bg-white border border-secondary/15 rounded-3xl p-6 md:p-10 shadow-sm">
        <h2 className="font-serif text-xl md:text-2xl font-black text-primary mb-6">Bulk Gifting Concierge Form</h2>

        {success ? (
          <div className="p-8 text-center flex flex-col items-center gap-4 bg-green-50 border border-green-200 rounded-2xl">
            <CheckCircle size={44} className="text-green-700" />
            <div>
              <h4 className="font-serif text-base font-bold text-green-800">Quotation Inquiry Submitted</h4>
              <p className="font-sans text-xs text-green-700/80 mt-1 max-w-md">
                We have received your corporate coordinates. Our B2B Gifting Lead will compile your requested quote and message you on WhatsApp within 3 business hours.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5 font-sans text-xs">
            <div className="flex flex-col gap-1.5 text-left">
              <label className="font-bold text-primary/70 uppercase text-[9px] tracking-wider">Contact Name *</label>
              <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="bg-cream border border-secondary/20 rounded-lg px-3 py-2.5 focus:outline-none focus:border-primary" />
            </div>
            <div className="flex flex-col gap-1.5 text-left">
              <label className="font-bold text-primary/70 uppercase text-[9px] tracking-wider">Company Name *</label>
              <input type="text" required value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className="bg-cream border border-secondary/20 rounded-lg px-3 py-2.5 focus:outline-none focus:border-primary" />
            </div>
            <div className="flex flex-col gap-1.5 text-left">
              <label className="font-bold text-primary/70 uppercase text-[9px] tracking-wider">Email Address *</label>
              <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="bg-cream border border-secondary/20 rounded-lg px-3 py-2.5 focus:outline-none focus:border-primary" />
            </div>
            <div className="flex flex-col gap-1.5 text-left">
              <label className="font-bold text-primary/70 uppercase text-[9px] tracking-wider">Mobile Number *</label>
              <input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="bg-cream border border-secondary/20 rounded-lg px-3 py-2.5 focus:outline-none focus:border-primary" />
            </div>
            <div className="flex flex-col gap-1.5 text-left">
              <label className="font-bold text-primary/70 uppercase text-[9px] tracking-wider">Required Quantity</label>
              <input type="number" min="20" value={formData.qty} onChange={(e) => setFormData({ ...formData, qty: e.target.value })} className="bg-cream border border-secondary/20 rounded-lg px-3 py-2.5 focus:outline-none focus:border-primary" />
            </div>
            <div className="flex flex-col gap-1.5 text-left">
              <label className="font-bold text-primary/70 uppercase text-[9px] tracking-wider">Gifting Tier</label>
              <select value={formData.package} onChange={(e) => setFormData({ ...formData, package: e.target.value })} className="bg-cream border border-secondary/20 rounded-lg px-3 py-2.5 focus:outline-none focus:border-primary">
                <option value="Sovereign Desk-Tray">Sovereign Desk-Tray Collection</option>
                <option value="Mahogany Classic Drawer">Mahogany Classic Drawer Set</option>
                <option value="Vice-Presidential Signature">Vice-Presidential Signature Trunk</option>
              </select>
            </div>
            <div className="sm:col-span-2 flex flex-col gap-1.5 text-left">
              <label className="font-bold text-primary/70 uppercase text-[9px] tracking-wider">Customization Instructions</label>
              <textarea placeholder="Tell us about your brand guidelines, timeline, or content changes..." rows={3.5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="bg-cream border border-secondary/20 rounded-lg px-3 py-2.5 focus:outline-none focus:border-primary resize-none" />
            </div>
            <div className="sm:col-span-2 mt-2">
              <button type="submit" className="w-full bg-primary hover:bg-secondary text-[#FFF9F2] font-sans text-xs uppercase tracking-widest font-extrabold py-3.5 px-6 rounded-xl cursor-pointer transition-colors shadow">
                Submit Quotation Request
              </button>
            </div>
          </form>
        )}
      </section>

    </div>
  );
}


// ==========================================
// 6. GOURMET GAZETTE (BLOGS & DETAILS)
// ==========================================
interface BlogsViewProps {
  onSelectBlog: (blogId: string) => void;
  setActiveTab: (tab: string) => void;
}

export function BlogsView({ onSelectBlog, setActiveTab }: BlogsViewProps) {
  const [selectedTag, setSelectedTag] = useState("all");

  const filteredBlogs = useMemo(() => {
    if (selectedTag === "all") return blogs;
    return blogs.filter((b) => b.category === selectedTag);
  }, [selectedTag]);

  const handleBlogClick = (blogId: string) => {
    onSelectBlog(blogId);
    setActiveTab("blog-detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div id="blogs-view" className="max-w-6xl mx-auto px-4 py-10 text-left">
      <div className="mb-10 text-center max-w-xl mx-auto flex flex-col gap-2">
        <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-secondary font-extrabold">Culinary Gazette</span>
        <h1 className="font-serif text-3xl md:text-5xl font-black text-primary leading-tight">The Gourmet Gazette</h1>
        <p className="font-sans text-xs text-primary/60 leading-relaxed mt-1">Explore sourcing diaries, medical nutrition benefits, and heritage baking recipes.</p>
      </div>

      {/* Categories / Tag selector */}
      <div className="flex flex-wrap gap-2.5 justify-center mb-10">
        {["all", "Nutrition", "Sourcing", "Lifestyle", "Recipes", "Gifting"].map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-3.5 py-1.5 rounded-full border text-xs font-sans font-semibold uppercase tracking-wider cursor-pointer transition-all ${
              selectedTag === tag
                ? "bg-primary text-[#FFF9F2] border-primary"
                : "bg-white border-secondary/20 text-primary hover:border-primary"
            }`}
          >
            {tag === "all" ? "All Gazette Entries" : tag}
          </button>
        ))}
      </div>

      {/* Featured Big Blog Post */}
      <section className="bg-white border border-secondary/15 rounded-3xl overflow-hidden p-6 md:p-8 shadow-sm mb-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-5 aspect-video lg:aspect-square rounded-2xl overflow-hidden bg-cream">
          <img src={blogs[0].image} alt="featured blog" className="w-full h-full object-cover" />
        </div>
        <div className="lg:col-span-7 text-left flex flex-col gap-4">
          <div className="flex gap-4 text-[10px] uppercase font-bold text-secondary">
            <span>{blogs[0].category}</span>
            <span>•</span>
            <span>{blogs[0].readTime}</span>
          </div>
          <h2 className="font-serif text-xl md:text-2xl font-black text-primary leading-tight hover:text-secondary cursor-pointer transition-colors" onClick={() => handleBlogClick(blogs[0].id)}>
            {blogs[0].title}
          </h2>
          <p className="font-sans text-xs md:text-sm text-primary/65 leading-relaxed">
            {blogs[0].summary}
          </p>
          <div className="flex items-center gap-2.5 font-sans text-xs text-primary/50 mt-2">
            <User size={14} />
            <span>{blogs[0].author}</span>
            <span>•</span>
            <Calendar size={14} />
            <span>{blogs[0].date}</span>
          </div>
          <button
            onClick={() => handleBlogClick(blogs[0].id)}
            className="self-start mt-2 bg-primary hover:bg-secondary text-[#FFF9F2] font-sans text-xs uppercase tracking-widest font-extrabold py-2.5 px-5 rounded-lg cursor-pointer transition-colors"
          >
            Read Article
          </button>
        </div>
      </section>

      {/* Grid of other blogs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlogs.slice(1).map((b) => (
          <div
            key={b.id}
            onClick={() => handleBlogClick(b.id)}
            className="group cursor-pointer bg-white border border-secondary/15 rounded-2xl p-4 overflow-hidden shadow-sm hover:shadow-xl transition-all text-left flex flex-col justify-between"
          >
            <div>
              <div className="aspect-[16/10] rounded-xl overflow-hidden bg-cream mb-4 relative border border-secondary/5">
                <img src={b.image} alt="blog cover" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="flex gap-3 text-[10px] uppercase font-bold text-secondary mb-2">
                <span>{b.category}</span>
                <span>•</span>
                <span>{b.readTime}</span>
              </div>
              <h3 className="font-serif text-sm md:text-base font-extrabold text-primary group-hover:text-secondary transition-colors duration-200 line-clamp-2 leading-snug">
                {b.title}
              </h3>
              <p className="font-sans text-[11px] text-primary/55 line-clamp-2 mt-2 leading-normal">
                {b.summary}
              </p>
            </div>

            <div className="flex justify-between items-center text-[10px] font-mono text-primary/45 border-t border-secondary/10 pt-3 mt-4">
              <span>{b.date}</span>
              <span className="font-sans font-bold text-secondary group-hover:underline flex items-center gap-1">
                Read <ChevronRight size={10} />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 6.2 BLOG DETAILS VIEW
interface BlogDetailViewProps {
  blogId: string;
  setActiveTab: (tab: string) => void;
}

export function BlogDetailView({ blogId, setActiveTab }: BlogDetailViewProps) {
  const post = useMemo(() => blogs.find((b) => b.id === blogId) || blogs[0], [blogId]);

  return (
    <div id="blog-detail-view" className="max-w-3xl mx-auto px-4 py-10 text-left flex flex-col gap-8">
      {/* Breadcrumb */}
      <button
        onClick={() => setActiveTab("blogs")}
        className="font-sans text-[10px] uppercase tracking-wider font-extrabold text-primary/50 hover:text-secondary cursor-pointer self-start"
      >
        ← Return to Gazette list
      </button>

      <div>
        <div className="flex gap-4 text-[10px] uppercase font-bold text-secondary mb-2">
          <span>{post.category}</span>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>
        
        <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-black text-primary leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center gap-4 mt-4 font-sans text-xs text-primary/50">
          <div className="flex items-center gap-1.5">
            <User size={13} />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar size={13} />
            <span>{post.date}</span>
          </div>
        </div>
      </div>

      <div className="aspect-[2/1] bg-cream border border-secondary/15 rounded-2xl overflow-hidden shadow-sm">
        <img src={post.image} alt="post main cover" className="w-full h-full object-cover" />
      </div>

      {/* Styled rich text block */}
      <article className="prose prose-sm max-w-none text-primary/80 font-sans text-xs sm:text-sm leading-relaxed flex flex-col gap-5">
        <h3 className="font-serif text-base sm:text-lg font-bold text-primary mt-2">I. Sourcing & Nutritional Significance</h3>
        <p>
          At Star Dry Fruits, culinary excellence begins at the farm-gate. Traditional optical checks and batch size standards (such as measuring whole Mamra almond concave curls or W180 Cashews) are vital to ensure full flavor integrity. Premium nuts contain highly concentrated reserves of essential botanical oil.
        </p>
        <p>
          These active oils hold crucial reserves of antioxidant Vitamin E, soluble fibers, and protective mono-unsaturated fatty acids. In standard industrial collections, extreme heat processing causes nut oils to run rancid and oxidise, destroying health benefits. We avoid sulfur treatment entirely.
        </p>
        <blockquote className="border-l-4 border-secondary pl-4 italic text-primary/70 my-2 font-serif text-xs sm:text-sm">
          "Purity is not a retail option; it is a multi-generational commitment to clean wellness and direct farmer partnership."
        </blockquote>
        <h3 className="font-serif text-base sm:text-lg font-bold text-primary mt-2">II. Optimal Daily Culinary Usage</h3>
        <p>
          Ayurvedic systems highly advise soaking almonds and raisins overnight in copper or pristine mineral water. This softens the outer fiber layers, neutralizes enzyme inhibitors like phytic acids, and allows our systems to process complex trace minerals easily.
        </p>
        <p>
          Combine 5 soaked Kashmiri Mamra almonds with two Royal Ajwa dates each morning for immediate, clean fuel that keeps blood sugars balanced, prevents fatigue, and aids cognitive cellular energy.
        </p>
      </article>

      <div className="h-[1px] bg-secondary/15 my-6" />

      {/* Author box */}
      <div className="bg-cream border border-secondary/15 rounded-xl p-5 flex gap-4 items-center">
        <div className="w-12 h-12 rounded-full overflow-hidden border border-secondary/10 flex-shrink-0">
          <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80" alt="avatar author" className="w-full h-full object-cover" />
        </div>
        <div>
          <span className="font-sans text-xs font-bold text-primary block">Written by {post.author}</span>
          <span className="font-sans text-[10px] text-primary/50 block">Concierge Nutrition & Sourcing Advisor</span>
        </div>
      </div>
    </div>
  );
}


// ==========================================
// 7. CONTACT & STORES
// ==========================================
export function ContactView() {
  const [submitted, setSubmitted] = useState(false);

  const boutiques = [
    { city: "Mumbai Flagship Store", address: "Imperial House, Colaba Causeway, Colaba, Mumbai – 400001", times: "10:30 AM – 9:00 PM Daily" },
    { city: "New Delhi Boutique", address: "Chaurangee Mansion, Connaught Place, New Delhi – 110001", times: "11:00 AM – 9:30 PM Daily" },
    { city: "Bengaluru Lounge", address: "Jubilee Manor, Road No. 36, Jubilee Hills, Hyderabad / Indiranagar – 560038", times: "10:00 AM – 8:30 PM Daily" },
  ];

  return (
    <div id="contact-view" className="max-w-5xl mx-auto px-4 py-10 text-left flex flex-col gap-16">
      
      {/* Hero Header */}
      <section className="flex flex-col gap-6 md:gap-8 max-w-3xl">
        <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-secondary font-extrabold">Concierge Coordinates</span>
        <h1 className="font-serif text-3xl md:text-5xl font-black text-primary leading-tight">
          Locate our Boutiques
        </h1>
        <p className="font-sans text-sm text-primary/75 leading-relaxed">
          Experience our physical scent-jars, wood-chest catalogs, and hand-beaten brass trays. Enjoy complimentary saffron tea upon visiting.
        </p>
      </section>

      {/* Grid: Boutiques list vs Map placeholder */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Boutiques */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {boutiques.map((bt, idx) => (
            <div key={idx} className="bg-white border border-secondary/15 rounded-xl p-5 flex flex-col gap-3 shadow-sm hover:border-secondary transition-all">
              <div className="flex gap-2 text-secondary">
                <MapPin size={16} className="mt-0.5" />
                <h3 className="font-serif text-sm font-bold text-primary leading-tight">{bt.city}</h3>
              </div>
              <p className="font-sans text-xs text-primary/75 leading-relaxed pl-6">{bt.address}</p>
              <div className="flex gap-2 items-center text-[10px] font-semibold text-primary/50 pl-6 mt-1 border-t border-secondary/5 pt-2">
                <Clock size={12} />
                <span>{bt.times}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Google maps static visualization */}
        <div className="lg:col-span-7 bg-white border border-secondary/15 rounded-2xl p-4 shadow-sm h-[320px] flex flex-col justify-between items-center relative overflow-hidden">
          {/* SVG Map mock */}
          <div className="absolute inset-0 bg-cream flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full opacity-15 stroke-primary stroke-1 fill-none">
              <path d="M0,20 Q40,40 100,10" />
              <path d="M20,0 Q60,50 40,100" />
              <path d="M0,70 L100,80" />
              <circle cx="45" cy="35" r="3" fill="#C89B3C" />
              <circle cx="65" cy="55" r="3" fill="#C89B3C" />
              <circle cx="25" cy="75" r="3" fill="#C89B3C" />
            </svg>
            
            <div className="relative z-10 p-6 flex flex-col items-center gap-2 max-w-sm text-center">
              <MapPin size={34} className="text-secondary" />
              <span className="font-serif text-sm font-bold text-primary">Map View Locked</span>
              <p className="font-sans text-[11px] text-primary/50">
                Interactive Google Maps API coordinates are locked on the client-presentation sandbox. Metros are mapped correctly inside active routes.
              </p>
            </div>
          </div>
        </div>

      </section>

      {/* Online Concierge Form */}
      <section className="bg-white border border-secondary/15 rounded-3xl p-6 md:p-10 shadow-sm">
        <h2 className="font-serif text-xl font-extrabold text-primary mb-2">Send Online Correspondence</h2>
        <p className="font-sans text-[11px] text-primary/45 mb-6">Write to our customer satisfaction lead regarding bespoke logistics.</p>

        {submitted ? (
          <div className="p-8 text-center bg-green-50 border border-green-200 rounded-2xl flex flex-col items-center gap-3">
            <CheckCircle size={36} className="text-green-700" />
            <h4 className="font-serif text-base font-bold text-green-800">Correspondence Logged</h4>
            <p className="font-sans text-xs text-green-700/70 max-w-sm">We appreciate your feedback. Our manager will check your coordinates and write back soon.</p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans text-xs text-left"
          >
            <div className="flex flex-col gap-1.5">
              <label className="font-bold text-primary/70 uppercase text-[9px] tracking-wider">Your Full Name *</label>
              <input type="text" required className="bg-cream border border-secondary/20 rounded-lg px-3 py-2.5 focus:outline-none focus:border-primary" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-bold text-primary/70 uppercase text-[9px] tracking-wider">Email Coordinates *</label>
              <input type="email" required className="bg-cream border border-secondary/20 rounded-lg px-3 py-2.5 focus:outline-none focus:border-primary" />
            </div>
            <div className="sm:col-span-2 flex flex-col gap-1.5">
              <label className="font-bold text-primary/70 uppercase text-[9px] tracking-wider">Write Correspondence *</label>
              <textarea required rows={4} className="bg-cream border border-secondary/20 rounded-lg px-3 py-2.5 focus:outline-none focus:border-primary resize-none" placeholder="We value your voice..." />
            </div>
            <div className="sm:col-span-2">
              <button type="submit" className="w-full bg-primary hover:bg-secondary text-[#FFF9F2] font-sans text-xs uppercase tracking-widest font-extrabold py-3.5 rounded-xl cursor-pointer transition-colors shadow">
                Transmit Correspondence
              </button>
            </div>
          </form>
        )}
      </section>

    </div>
  );
}


// ==========================================
// 8. ACCORDION FAQ VIEW
// ==========================================
export function FAQView() {
  const [openFaq, setOpenFaq] = useState<string | null>(faqs[0].id);

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <div id="faq-view" className="max-w-4xl mx-auto px-4 py-10 text-left flex flex-col gap-10">
      
      <div className="text-center max-w-xl mx-auto flex flex-col gap-2 mb-4">
        <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-secondary font-extrabold">Resolution Center</span>
        <h1 className="font-serif text-3xl md:text-5xl font-black text-primary leading-tight">Patron Assistance</h1>
        <p className="font-sans text-xs text-primary/60 leading-relaxed mt-1">Frequently asked questions concerning Mamra botanical sorting, fresh storage limits, and corporate logistics.</p>
      </div>

      <div className="flex flex-col gap-3.5">
        {faqs.map((f) => (
          <div key={f.id} className="bg-white border border-secondary/15 rounded-xl overflow-hidden shadow-sm">
            <button
              onClick={() => toggleFaq(f.id)}
              className="w-full p-4 md:p-5 flex justify-between items-center text-left font-serif text-sm font-bold text-primary hover:bg-secondary/5 transition-all cursor-pointer"
            >
              <span className="flex items-center gap-2.5">
                <HelpCircle size={15} className="text-secondary" />
                {f.question}
              </span>
              <ChevronDown size={14} className={`text-primary/60 transition-transform ${openFaq === f.id ? "rotate-180" : ""}`} />
            </button>
            
            <AnimatePresence initial={false}>
              {openFaq === f.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                  <div className="p-4 md:p-5 pt-0 border-t border-secondary/5 font-sans text-xs text-primary/75 leading-relaxed bg-[#FFF9F2]/20">
                    {f.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

    </div>
  );
}


// ==========================================
// 9. WISHLIST VIEW
// ==========================================
interface WishlistViewProps {
  wishlist: Product[];
  onAddToCart: (product: Product, size: string) => void;
  onRemoveFromWishlist: (product: Product) => void;
  setActiveTab: (tab: string) => void;
}

export function WishlistView({ wishlist, onAddToCart, onRemoveFromWishlist, setActiveTab }: WishlistViewProps) {
  return (
    <div id="wishlist-view" className="max-w-5xl mx-auto px-4 py-10 text-left">
      <div className="mb-10 text-center max-w-xl mx-auto flex flex-col gap-2">
        <Heart size={26} className="text-secondary self-center fill-secondary" />
        <h1 className="font-serif text-2xl md:text-3xl font-black text-primary">Your Premium Favorites</h1>
        <p className="font-sans text-xs text-primary/60 leading-relaxed mt-1">Keep track of Mamra varieties, cashew classifications, and gold boxes you wish to gift later.</p>
      </div>

      {wishlist.length === 0 ? (
        <div className="p-16 border border-dashed border-secondary/30 rounded-3xl text-center flex flex-col items-center gap-4 bg-white/50">
          <Heart size={36} className="text-primary/30" />
          <div>
            <h4 className="font-serif text-base font-bold text-primary">No Favorites Marked</h4>
            <p className="font-sans text-xs text-primary/55 mt-1">Click the heart icon on any gourmet item cards to collect them here.</p>
          </div>
          <button
            onClick={() => setActiveTab("shop")}
            className="bg-primary hover:bg-secondary text-[#FFF9F2] font-sans text-xs uppercase tracking-widest font-bold py-2.5 px-6 rounded-lg cursor-pointer"
          >
            Explore Boutique Catalogue
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((p) => {
            const price = p.discountPrice || p.price;
            return (
              <div key={p.id} className="bg-white border border-secondary/15 rounded-xl p-4 relative flex gap-4 shadow-sm items-center">
                <div className="w-16 h-16 rounded-lg overflow-hidden border border-secondary/5 bg-cream flex-shrink-0">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow min-w-0 text-left">
                  <h4 className="font-serif text-xs font-extrabold text-primary truncate leading-tight">{p.name}</h4>
                  <span className="font-sans text-xs text-secondary font-bold block mt-1">₹{price}</span>
                  
                  <div className="flex gap-2.5 mt-3.5">
                    <button
                      onClick={() => onAddToCart(p, p.sizeOptions[0])}
                      className="bg-primary hover:bg-secondary text-[#FFF9F2] font-sans text-[10px] uppercase font-bold py-1.5 px-3 rounded-md cursor-pointer transition-colors"
                    >
                      Add to Bag
                    </button>
                    <button
                      onClick={() => onRemoveFromWishlist(p)}
                      className="border border-secondary text-primary/65 hover:text-red-600 font-sans text-[10px] uppercase font-bold py-1.5 px-3 rounded-md cursor-pointer hover:bg-secondary/5"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}


// ==========================================
// 10. ORDER TRACKING VIEW
// ==========================================
export function OrderTrackingView() {
  const [orderIdInput, setOrderIdInput] = useState("");
  const [trackedOrder, setTrackedOrder] = useState<boolean>(false);

  const timelineSteps = [
    { title: "Order Confirmed", date: "01 July, 05:28 PM", desc: "Sovereign coordinates matched and logged securely.", active: true },
    { title: "Gourmet Batch Sorting", date: "02 July, 09:30 AM", desc: "Manual quality criteria verification and optical checks completed.", active: true },
    { title: "Calligraphy & Saffron Infusion", date: "02 July, 01:15 PM", desc: "Gold calligraphy notes written; hot-wax stamp seal applied.", active: true },
    { title: "Express Air Dispatch", date: "Pending Flight", desc: "Metropolitan logistics air hub departure scheduled.", active: false },
    { title: "Delivered to Landmark", date: "Estimated 03 July", desc: "Complimentary hand-off coordinated via WhatsApp.", active: false },
  ];

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderIdInput.trim()) {
      setTrackedOrder(true);
    }
  };

  return (
    <div id="tracking-view" className="max-w-4xl mx-auto px-4 py-10 text-left flex flex-col gap-10">
      
      <div className="text-center max-w-xl mx-auto flex flex-col gap-2 mb-4">
        <Truck size={26} className="text-secondary self-center" />
        <h1 className="font-serif text-2xl md:text-3xl font-black text-primary">Sovereign Dispatch Tracking</h1>
        <p className="font-sans text-xs text-primary/60 leading-relaxed mt-1">Track the exact batch sorting, calligraphic notes processing, and flight coordinates for your luxury hampers.</p>
      </div>

      <form onSubmit={handleTrackSubmit} className="bg-white border border-secondary/15 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row gap-3">
        <div className="flex-1 text-left flex flex-col gap-1">
          <label className="font-sans text-[9px] uppercase font-bold text-primary/50 tracking-wider">Order Reference ID</label>
          <input
            type="text"
            required
            placeholder="Ex. STAR-2026-928402"
            value={orderIdInput}
            onChange={(e) => setOrderIdInput(e.target.value)}
            className="bg-cream border border-secondary/15 rounded-lg px-3 py-2.5 font-mono text-xs focus:outline-none focus:border-primary"
          />
        </div>
        <button
          type="submit"
          className="bg-primary hover:bg-secondary text-[#FFF9F2] font-sans text-xs uppercase tracking-widest font-extrabold px-6 py-3 rounded-xl cursor-pointer self-end transition-colors w-full sm:w-auto"
        >
          Track Dispatch
        </button>
      </form>

      {trackedOrder && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-secondary/15 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col gap-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-secondary/5 pb-4 gap-2 text-xs">
            <div>
              <span className="text-primary/40 uppercase font-bold text-[9px] tracking-wider block">Reference Reference</span>
              <strong className="font-mono text-primary text-sm font-bold">{orderIdInput.toUpperCase()}</strong>
            </div>
            <div className="text-sm sm:text-right">
              <span className="text-primary/40 uppercase font-bold text-[9px] tracking-wider block">Logistics Status</span>
              <span className="text-green-700 font-sans font-bold flex items-center gap-1.5 justify-end">
                <span className="w-2 h-2 rounded-full bg-green-700 animate-pulse" /> Saffron & Wax Processing
              </span>
            </div>
          </div>

          <div className="relative border-l-2 border-secondary/20 pl-6 flex flex-col gap-8">
            {timelineSteps.map((st, idx) => (
              <div key={idx} className="relative">
                <span className={`absolute -left-[32px] top-1 w-4.5 h-4.5 rounded-full border-4 border-white shadow-sm flex items-center justify-center ${st.active ? "bg-secondary" : "bg-gray-200"}`} />
                <div className="flex flex-col sm:flex-row justify-between items-baseline gap-1 text-xs">
                  <h4 className={`font-serif font-bold ${st.active ? "text-primary text-sm" : "text-primary/40"}`}>{st.title}</h4>
                  <span className="font-sans font-medium text-primary/45">{st.date}</span>
                </div>
                <p className={`font-sans text-[11px] mt-1 ${st.active ? "text-primary/65" : "text-primary/30"}`}>{st.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

    </div>
  );
}
