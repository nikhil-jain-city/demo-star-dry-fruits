import React from "react";
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, Globe, Award, ShieldCheck, Heart } from "lucide-react";

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="main-footer" className="bg-[#2D1A08] text-[#FFF9F2] pt-16 pb-8 border-t border-secondary/20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
        
        {/* Brand & Mission column */}
        <div id="footer-col-brand" className="lg:col-span-2 flex flex-col gap-6">
          <div>
            <h3 className="font-serif text-2xl tracking-[0.25em] text-secondary font-bold leading-none mb-1">
              STAR
            </h3>
            <span className="font-sans text-[10px] tracking-[0.45em] text-cream uppercase font-medium">
              DRY FRUITS
            </span>
          </div>
          <p className="font-sans text-xs text-[#FFF9F2]/70 leading-relaxed max-w-sm">
            India's premiere destination for custom direct-sourced premium dry fruits, organic superseeds, and handcrafted royal gift hampers. Cultivating wellness since 2006.
          </p>
          
          <div className="flex flex-col gap-3 mt-2 text-xs text-[#FFF9F2]/80 font-light">
            <div className="flex items-center gap-3">
              <MapPin size={16} className="text-secondary flex-shrink-0" />
              <span>Imperial House, Colaba Causeway, Colaba, Mumbai – 400001</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={16} className="text-secondary flex-shrink-0" />
              <span>+91 22 4920 3800</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={16} className="text-secondary flex-shrink-0" />
              <span>concierge@stardryfruits.com</span>
            </div>
          </div>
        </div>

        {/* Categories column */}
        <div id="footer-col-collections" className="flex flex-col gap-4">
          <h4 className="font-serif text-sm font-semibold tracking-wider text-secondary uppercase">
            Collections
          </h4>
          <ul className="flex flex-col gap-2.5 text-xs text-[#FFF9F2]/70 font-light">
            <li>
              <button onClick={() => setActiveTab("shop")} className="hover:text-secondary hover:underline transition-colors text-left cursor-pointer">
                Aged Kashmiri Mamra
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab("shop")} className="hover:text-secondary hover:underline transition-colors text-left cursor-pointer">
                Royal King Cashews W180
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab("shop")} className="hover:text-secondary hover:underline transition-colors text-left cursor-pointer">
                Iranian Akbari Pistachios
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab("shop")} className="hover:text-secondary hover:underline transition-colors text-left cursor-pointer">
                Kashmiri Snow Walnut Halves
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab("shop")} className="hover:text-secondary hover:underline transition-colors text-left cursor-pointer">
                Luxury Custom Gift Boxes
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab("shop")} className="hover:text-secondary hover:underline transition-colors text-left cursor-pointer">
                Organic Superfood Seeds
              </button>
            </li>
          </ul>
        </div>

        {/* Assistance column */}
        <div id="footer-col-assistance" className="flex flex-col gap-4">
          <h4 className="font-serif text-sm font-semibold tracking-wider text-secondary uppercase">
            Concierge Desk
          </h4>
          <ul className="flex flex-col gap-2.5 text-xs text-[#FFF9F2]/70 font-light">
            <li>
              <button onClick={() => setActiveTab("order-tracking")} className="hover:text-secondary hover:underline transition-colors text-left cursor-pointer">
                Track Order
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab("corporate")} className="hover:text-secondary hover:underline transition-colors text-left cursor-pointer">
                Corporate Bulk Quotation
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab("faq")} className="hover:text-secondary hover:underline transition-colors text-left cursor-pointer">
                FAQs & Storage Guides
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab("contact")} className="hover:text-secondary hover:underline transition-colors text-left cursor-pointer">
                Our Offline Boutiques
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab("contact")} className="hover:text-secondary hover:underline transition-colors text-left cursor-pointer">
                Submit Business Query
              </button>
            </li>
          </ul>
        </div>

        {/* Socials & Trust column */}
        <div id="footer-col-trust" className="flex flex-col gap-5">
          <h4 className="font-serif text-sm font-semibold tracking-wider text-secondary uppercase">
            Royal Guarantee
          </h4>
          <div className="flex flex-col gap-3">
            <div className="flex gap-2.5 items-start">
              <Award size={18} className="text-secondary flex-shrink-0 mt-0.5" />
              <p className="font-sans text-[11px] text-[#FFF9F2]/75 leading-relaxed">
                <strong className="text-[#FFF9F2]">100% Direct Sourced:</strong> Sorting Mamra almonds and Kashmiri walnut halves in small batches.
              </p>
            </div>
            <div className="flex gap-2.5 items-start">
              <ShieldCheck size={18} className="text-secondary flex-shrink-0 mt-0.5" />
              <p className="font-sans text-[11px] text-[#FFF9F2]/75 leading-relaxed">
                <strong className="text-[#FFF9F2]">Aesthetic Quality:</strong> Rigorous 3-layer optical and manual inspection criteria.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-2">
            <a href="#" className="p-2 bg-[#FFF9F2]/5 hover:bg-secondary/15 hover:text-secondary rounded-full transition-colors cursor-pointer" aria-label="Instagram">
              <Instagram size={15} />
            </a>
            <a href="#" className="p-2 bg-[#FFF9F2]/5 hover:bg-secondary/15 hover:text-secondary rounded-full transition-colors cursor-pointer" aria-label="Facebook">
              <Facebook size={15} />
            </a>
            <a href="#" className="p-2 bg-[#FFF9F2]/5 hover:bg-secondary/15 hover:text-secondary rounded-full transition-colors cursor-pointer" aria-label="Twitter">
              <Twitter size={15} />
            </a>
            <a href="#" className="p-2 bg-[#FFF9F2]/5 hover:bg-secondary/15 hover:text-secondary rounded-full transition-colors cursor-pointer" aria-label="Official Website">
              <Globe size={15} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div id="footer-bottom-bar" className="max-w-7xl mx-auto px-4 md:px-8 pt-8 border-t border-[#FFF9F2]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-[#FFF9F2]/50 font-light tracking-wider">
        <p>© {currentYear} STAR DRY FRUITS PRIVATE LIMITED. ALL RIGHTS RESERVED.</p>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-secondary transition-colors">PRIVACY CODE</a>
          <a href="#" className="hover:text-secondary transition-colors">TERMS OF PATRONAGE</a>
          <a href="#" className="hover:text-secondary transition-colors">ANTI-MODERN SLAVERY STATEMENT</a>
        </div>
        <p className="flex items-center gap-1">
          Made in India for Global Patrons
          <Heart size={10} className="text-secondary fill-secondary animate-pulse" />
        </p>
      </div>
    </footer>
  );
}
