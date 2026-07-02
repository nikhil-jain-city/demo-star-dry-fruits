import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ShoppingBag, Plus, Minus, Trash2, Gift, ClipboardCheck, Sparkles } from "lucide-react";
import { CartItem } from "../types";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, size: string, quantity: number) => void;
  onRemoveItem: (productId: string, size: string) => void;
  onProceedToCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}: CartDrawerProps) {
  const [couponCode, setCouponCode] = useState("");
  const [appliedDiscountPercent, setAppliedDiscountPercent] = useState<number>(0);
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");
  const [giftWrap, setGiftWrap] = useState(false);
  const [giftMessage, setGiftMessage] = useState("");

  const handleApplyCoupon = () => {
    setCouponError("");
    setCouponSuccess("");
    const cleaned = couponCode.trim().toUpperCase();
    if (cleaned === "ROYAL15") {
      setAppliedDiscountPercent(15);
      setCouponSuccess("Promo ROYAL15 applied successfully (15% Savings!)");
    } else if (cleaned === "WELCOME10") {
      setAppliedDiscountPercent(10);
      setCouponSuccess("Promo WELCOME10 applied successfully (10% Savings!)");
    } else if (cleaned === "") {
      setCouponError("Please enter a valid coupon code.");
    } else {
      setCouponError("Invalid promo code. Try 'ROYAL15' or 'WELCOME10'.");
    }
  };

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => {
      const price = item.product.discountPrice || item.product.price;
      // Adjust price based on size choice
      let sizeMultiplier = 1;
      if (item.selectedSize === "500g") sizeMultiplier = 1.8;
      if (item.selectedSize === "1kg") sizeMultiplier = 3.2;
      const adjustedPrice = Math.round(price * sizeMultiplier);
      return total + adjustedPrice * item.quantity;
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const discountAmount = Math.round((subtotal * appliedDiscountPercent) / 100);
  const giftWrapCost = giftWrap ? 150 : 0;
  const shippingCost = subtotal > 1499 || subtotal === 0 ? 0 : 150;
  const grandTotal = subtotal - discountAmount + giftWrapCost + shippingCost;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            id="cart-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-50 cursor-pointer"
          />

          {/* Drawer Sliding Side-sheet */}
          <motion.div
            id="cart-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#FFF9F2] shadow-2xl z-50 flex flex-col glass border-l border-secondary/25"
          >
            {/* Header Section */}
            <div className="p-6 border-b border-secondary/15 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="text-primary" size={20} />
                <h3 className="font-serif text-lg font-bold text-primary">Your Shopping Bag</h3>
                <span className="bg-primary/5 text-primary text-xs px-2.5 py-1 rounded-full font-mono font-bold">
                  {cart.reduce((sum, i) => sum + i.quantity, 0)}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 hover:bg-secondary/15 text-primary hover:text-secondary rounded-full transition-all cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-5">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-16">
                  <div className="p-4 bg-secondary/5 rounded-full text-secondary">
                    <ShoppingBag size={42} className="stroke-[1.5]" />
                  </div>
                  <div>
                    <h4 className="font-serif text-base font-bold text-primary">Your Bag is Empty</h4>
                    <p className="font-sans text-xs text-primary/55 mt-1 max-w-xs leading-relaxed">
                      Savor the purity of handpicked aged almonds and luxury gift boxes. Explore our collections to begin.
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="mt-2 bg-primary hover:bg-secondary text-[#FFF9F2] font-sans text-xs uppercase tracking-widest font-bold py-2.5 px-6 rounded-lg transition-colors cursor-pointer"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                cart.map((item) => {
                  const basePrice = item.product.discountPrice || item.product.price;
                  let sizeMultiplier = 1;
                  if (item.selectedSize === "500g") sizeMultiplier = 1.8;
                  if (item.selectedSize === "1kg") sizeMultiplier = 3.2;
                  const itemPrice = Math.round(basePrice * sizeMultiplier);

                  return (
                    <div
                      key={`${item.product.id}-${item.selectedSize}`}
                      className="flex gap-4 p-3 bg-white border border-secondary/10 rounded-xl shadow-sm hover:border-secondary/25 transition-all"
                    >
                      <div className="w-16 h-16 rounded-lg overflow-hidden border border-secondary/5 bg-cream flex-shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      <div className="flex-1 flex flex-col justify-between text-left">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <h4 className="font-serif text-xs font-extrabold text-primary line-clamp-2 leading-snug">
                              {item.product.name}
                            </h4>
                            <button
                              onClick={() => onRemoveItem(item.product.id, item.selectedSize)}
                              className="text-primary/40 hover:text-red-600 p-0.5 transition-colors cursor-pointer"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                          <span className="font-sans text-[10px] text-secondary font-bold uppercase tracking-wider block mt-1">
                            Size: {item.selectedSize}
                          </span>
                        </div>

                        <div className="flex items-center justify-between mt-2.5">
                          {/* Quantity selector */}
                          <div className="flex items-center border border-secondary/20 rounded-md bg-cream overflow-hidden">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, item.quantity - 1)}
                              className="px-2 py-0.5 hover:bg-secondary/10 text-primary cursor-pointer"
                            >
                              <Minus size={10} />
                            </button>
                            <span className="px-2.5 font-mono text-[11px] font-bold text-primary">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, item.quantity + 1)}
                              className="px-2 py-0.5 hover:bg-secondary/10 text-primary cursor-pointer"
                            >
                              <Plus size={10} />
                            </button>
                          </div>

                          <div className="text-right">
                            <span className="font-sans text-xs font-bold text-primary block">
                              ₹{itemPrice * item.quantity}
                            </span>
                            {item.quantity > 1 && (
                              <span className="font-sans text-[9px] text-primary/45">
                                (₹{itemPrice} each)
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}

              {cart.length > 0 && (
                <div className="flex flex-col gap-4 border-t border-secondary/10 pt-4 mt-2">
                  {/* Luxury Gift Wrap option */}
                  <div className="bg-gradient-to-br from-primary/5 to-secondary/15 p-4 rounded-xl border border-secondary/20">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={giftWrap}
                        onChange={(e) => setGiftWrap(e.target.checked)}
                        className="mt-1 accent-primary cursor-pointer"
                      />
                      <div>
                        <span className="font-serif text-xs font-bold text-primary flex items-center gap-1.5">
                          <Gift size={14} className="text-secondary" />
                          Imperial Gift Wrapping (+₹150)
                        </span>
                        <p className="font-sans text-[10px] text-primary/65 mt-0.5 leading-relaxed">
                          Includes signature velvet box wrap, gold silk ribbon, and custom printed calligraphy message.
                        </p>
                      </div>
                    </label>

                    {giftWrap && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-3"
                      >
                        <textarea
                          placeholder="Write your custom blessing scroll... (Our calligrapher will hand-ink this)"
                          value={giftMessage}
                          onChange={(e) => setGiftMessage(e.target.value)}
                          className="w-full bg-[#FFF9F2] border border-secondary/25 rounded-lg p-2.5 font-sans text-xs text-primary focus:outline-none focus:border-primary resize-none placeholder:text-primary/35"
                          rows={2.5}
                        />
                      </motion.div>
                    )}
                  </div>

                  {/* Promo Code Entry */}
                  <div className="flex flex-col gap-1.5">
                    <span className="font-sans text-[10px] text-primary/70 font-semibold uppercase tracking-wider block">
                      Promotion/Affiliate Code
                    </span>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="ENTER ROYAL15 OR WELCOME10"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="flex-1 bg-white border border-secondary/20 rounded-lg px-3 py-2 font-mono text-xs uppercase tracking-wide focus:outline-none focus:border-primary"
                      />
                      <button
                        onClick={handleApplyCoupon}
                        className="bg-primary hover:bg-secondary text-[#FFF9F2] px-4 py-2 rounded-lg font-sans text-xs uppercase tracking-widest font-bold cursor-pointer transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                    {couponError && <p className="text-red-600 font-sans text-[10px]">{couponError}</p>}
                    {couponSuccess && (
                      <p className="text-green-700 font-sans text-[10px] flex items-center gap-1 font-semibold">
                        <ClipboardCheck size={11} /> {couponSuccess}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Sticky Drawer Footer Subtotal calculations */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-secondary/15 bg-white flex flex-col gap-4">
                <div className="flex flex-col gap-2.5 text-xs text-primary/75">
                  <div className="flex justify-between items-center">
                    <span>Basket Subtotal</span>
                    <span className="font-mono font-semibold">₹{subtotal}</span>
                  </div>
                  {appliedDiscountPercent > 0 && (
                    <div className="flex justify-between items-center text-green-700 font-semibold">
                      <span>Promo Savings ({appliedDiscountPercent}%)</span>
                      <span className="font-mono">-₹{discountAmount}</span>
                    </div>
                  )}
                  {giftWrap && (
                    <div className="flex justify-between items-center">
                      <span>Calligraphy Gift Wrap</span>
                      <span className="font-mono">₹150</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <span>Express Air Delivery</span>
                    {shippingCost === 0 ? (
                      <span className="text-green-700 font-semibold flex items-center gap-1">
                        <Sparkles size={11} className="fill-green-700" /> Free
                      </span>
                    ) : (
                      <span className="font-mono">₹150</span>
                    )}
                  </div>
                  {shippingCost > 0 && (
                    <p className="text-[9px] text-primary/45 text-right mt-0.5">
                      Add ₹{1500 - subtotal} more for Complimentary Delivery
                    </p>
                  )}
                </div>

                <div className="h-[1px] bg-secondary/10 my-1" />

                <div className="flex justify-between items-center font-serif text-base font-bold text-primary">
                  <span>Grand Total</span>
                  <span className="font-mono text-lg text-secondary">₹{grandTotal}</span>
                </div>

                <button
                  onClick={onProceedToCheckout}
                  className="w-full bg-primary hover:bg-secondary text-[#FFF9F2] font-sans text-xs uppercase tracking-widest font-extrabold py-3.5 px-4 rounded-xl shadow-md hover:shadow-xl transition-all hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <Sparkles size={14} className="fill-[#FFF9F2] text-[#FFF9F2]" />
                  Proceed to Sovereign Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
