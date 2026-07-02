import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, CheckCircle, Truck, CreditCard, ShoppingBag, ShieldCheck, Star } from "lucide-react";
import { CartItem } from "../types";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onClearCart: () => void;
  subtotal: number;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  cart,
  onClearCart,
  subtotal,
}: CheckoutModalProps) {
  const [step, setStep] = useState(1); // 1 = Details/Shipping, 2 = Payment, 3 = Confirmation
  
  // Form states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");
  
  const [deliveryType, setDeliveryType] = useState("standard"); // standard, express
  const [paymentOption, setPaymentOption] = useState("upi"); // upi, card, cod
  
  // Errors
  const [error, setError] = useState("");
  
  const handleNextStep = () => {
    setError("");
    if (step === 1) {
      if (!fullName || !email || !phone || !address || !city || !pincode || !state) {
        setError("Please complete all required shipping fields.");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      // Complete order
      setStep(3);
    }
  };

  const handleCloseSuccess = () => {
    onClearCart();
    setStep(1);
    onClose();
  };

  const deliveryCost = deliveryType === "express" ? 250 : subtotal > 1499 ? 0 : 150;
  const codFee = paymentOption === "cod" ? 50 : 0;
  const totalAmount = subtotal + deliveryCost + codFee;
  const orderId = `STAR-2026-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="checkout-modal-root" className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            id="checkout-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={step === 3 ? handleCloseSuccess : onClose}
            className="fixed inset-0 bg-black"
          />

          {/* Modal Card container */}
          <motion.div
            id="checkout-card"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-[#FFF9F2] w-full max-w-4xl rounded-2xl shadow-2xl relative overflow-hidden flex flex-col md:flex-row border border-secondary/25 z-50 max-h-[90vh] md:max-h-[85vh]"
          >
            {/* Close Button */}
            {step !== 3 && (
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-1.5 hover:bg-secondary/15 text-primary/60 hover:text-secondary rounded-full transition-all cursor-pointer z-10"
              >
                <X size={18} />
              </button>
            )}

            {/* Step 3: SUCCESS CONFIRMATION PANEL */}
            {step === 3 ? (
              <div id="success-panel" className="w-full p-8 md:p-12 flex flex-col items-center text-center justify-center gap-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 100 }}
                  className="w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center text-secondary border border-secondary/30 shadow-inner"
                >
                  <CheckCircle size={54} className="stroke-[1.5]" />
                </motion.div>

                <div>
                  <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-secondary font-extrabold mb-2 block">
                    Royal Patronage Confirmed
                  </span>
                  <h3 className="font-serif text-2xl font-black text-primary">
                    Your Order Has Been Placed!
                  </h3>
                  <p className="font-sans text-xs text-primary/65 mt-2 max-w-lg leading-relaxed">
                    Thank you for choosing Star Dry Fruits. A summary of your premium purchase and a digital copy of the tax invoice has been sent to your email.
                  </p>
                </div>

                <div className="bg-white border border-secondary/15 rounded-xl p-5 w-full max-w-md text-left flex flex-col gap-3 font-sans text-xs shadow-sm">
                  <div className="flex justify-between border-b border-secondary/5 pb-2.5">
                    <span className="text-primary/50 font-medium">Order Reference ID</span>
                    <span className="font-mono font-bold text-primary">{orderId}</span>
                  </div>
                  <div className="flex justify-between border-b border-secondary/5 pb-2.5">
                    <span className="text-primary/50 font-medium">Recipient Name</span>
                    <span className="font-semibold text-primary">{fullName}</span>
                  </div>
                  <div className="flex justify-between border-b border-secondary/5 pb-2.5">
                    <span className="text-primary/50 font-medium">Delivery Landmark</span>
                    <span className="text-primary/80 truncate max-w-[250px]">{address}, {city}</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-primary/50 font-medium">Total Billed amount</span>
                    <span className="font-mono font-bold text-secondary">₹{totalAmount}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-[#C89B3C] font-semibold bg-primary/5 px-4 py-2 rounded-lg border border-secondary/15">
                  <Truck size={14} />
                  <span>Our Logistics concierge will reach out on WhatsApp to coordinate hand-off.</span>
                </div>

                <button
                  onClick={handleCloseSuccess}
                  className="bg-primary hover:bg-secondary text-[#FFF9F2] font-sans text-xs uppercase tracking-widest font-extrabold py-3.5 px-8 rounded-xl cursor-pointer transition-colors"
                >
                  Return to Boutique
                </button>
              </div>
            ) : (
              <>
                {/* LEFT COLUMN: Main checkout Form */}
                <div id="checkout-left" className="flex-1 p-6 md:p-8 overflow-y-auto">
                  <div className="mb-6">
                    <h3 className="font-serif text-xl font-bold text-primary">Sovereign Checkout</h3>
                    <div className="flex gap-4 font-sans text-[10px] uppercase font-bold mt-2.5">
                      <span className={`pb-1 border-b-2 ${step === 1 ? "text-secondary border-secondary" : "text-primary/40 border-transparent"}`}>
                        1. Shipping Coordinates
                      </span>
                      <span className={`pb-1 border-b-2 ${step === 2 ? "text-secondary border-secondary" : "text-primary/40 border-transparent"}`}>
                        2. Payment Settlement
                      </span>
                    </div>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-xs mb-4">
                      {error}
                    </div>
                  )}

                  {/* STEP 1: SHIPPING FORM */}
                  {step === 1 && (
                    <div id="checkout-step-1" className="flex flex-col gap-4 text-left">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="font-sans text-[10px] uppercase tracking-wider font-bold text-primary/70">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Recipient's Name"
                            className="bg-white border border-secondary/20 rounded-lg px-3 py-2 font-sans text-xs focus:outline-none focus:border-primary"
                            required
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="font-sans text-[10px] uppercase tracking-wider font-bold text-primary/70">
                            Mobile Contact *
                          </label>
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+91 XXXXX XXXXX"
                            className="bg-white border border-secondary/20 rounded-lg px-3 py-2 font-sans text-xs focus:outline-none focus:border-primary"
                            required
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="font-sans text-[10px] uppercase tracking-wider font-bold text-primary/70">
                          Email Coordinates *
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="client@luxury.com"
                          className="bg-white border border-secondary/20 rounded-lg px-3 py-2 font-sans text-xs focus:outline-none focus:border-primary"
                          required
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="font-sans text-[10px] uppercase tracking-wider font-bold text-primary/70">
                          Complete Residence Address *
                        </label>
                        <input
                          type="text"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="Apartment, Bungalow No., Landmark"
                          className="bg-white border border-secondary/20 rounded-lg px-3 py-2 font-sans text-xs focus:outline-none focus:border-primary"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div className="flex flex-col gap-1.5">
                          <label className="font-sans text-[10px] uppercase tracking-wider font-bold text-primary/70">
                            City *
                          </label>
                          <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="Mumbai"
                            className="bg-white border border-secondary/20 rounded-lg px-3 py-2 font-sans text-xs focus:outline-none focus:border-primary"
                            required
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="font-sans text-[10px] uppercase tracking-wider font-bold text-primary/70">
                            State *
                          </label>
                          <input
                            type="text"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            placeholder="Maharashtra"
                            className="bg-white border border-secondary/20 rounded-lg px-3 py-2 font-sans text-xs focus:outline-none focus:border-primary"
                            required
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="font-sans text-[10px] uppercase tracking-wider font-bold text-primary/70">
                            Pin Code *
                          </label>
                          <input
                            type="text"
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value)}
                            placeholder="400001"
                            className="bg-white border border-secondary/20 rounded-lg px-3 py-2 font-sans text-xs focus:outline-none focus:border-primary"
                            required
                          />
                        </div>
                      </div>

                      <div className="h-[1px] bg-secondary/15 my-2" />

                      {/* Delivery Mode Choice */}
                      <div className="flex flex-col gap-2.5">
                        <span className="font-sans text-[10px] uppercase tracking-wider font-bold text-primary/70 block">
                          Select Delivery Preference
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <label className={`border rounded-xl p-3 flex items-start gap-3 cursor-pointer transition-all ${deliveryType === "standard" ? "border-primary bg-primary/5" : "border-secondary/20 bg-white"}`}>
                            <input
                              type="radio"
                              name="delivery"
                              checked={deliveryType === "standard"}
                              onChange={() => setDeliveryType("standard")}
                              className="mt-1 accent-primary"
                            />
                            <div>
                              <span className="font-sans text-xs font-bold text-primary block">
                                Express Ground Delivery
                              </span>
                              <span className="font-sans text-[10px] text-primary/50 block mt-0.5">
                                Metros: 2-3 Days | Rest: 4-5 Days
                              </span>
                              <span className="font-mono text-[10px] text-secondary font-bold block mt-1">
                                {subtotal > 1499 ? "Complimentary" : "₹150"}
                              </span>
                            </div>
                          </label>

                          <label className={`border rounded-xl p-3 flex items-start gap-3 cursor-pointer transition-all ${deliveryType === "express" ? "border-primary bg-primary/5" : "border-secondary/20 bg-white"}`}>
                            <input
                              type="radio"
                              name="delivery"
                              checked={deliveryType === "express"}
                              onChange={() => setDeliveryType("express")}
                              className="mt-1 accent-primary"
                            />
                            <div>
                              <span className="font-sans text-xs font-bold text-primary block">
                                Royal Air Dispatch
                              </span>
                              <span className="font-sans text-[10px] text-primary/50 block mt-0.5">
                                Guaranteed 24-48 Hours Delivery
                              </span>
                              <span className="font-mono text-[10px] text-secondary font-bold block mt-1">
                                +₹250
                              </span>
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: PAYMENT FORM */}
                  {step === 2 && (
                    <div id="checkout-step-2" className="flex flex-col gap-4 text-left">
                      <span className="font-sans text-[10px] uppercase tracking-wider font-bold text-primary/70">
                        Choose Sovereign Settlement
                      </span>

                      <div className="flex flex-col gap-3">
                        {/* UPI */}
                        <label className={`border rounded-xl p-3.5 flex items-start gap-3 cursor-pointer transition-all ${paymentOption === "upi" ? "border-primary bg-primary/5" : "border-secondary/10 bg-white"}`}>
                          <input
                            type="radio"
                            name="payment"
                            checked={paymentOption === "upi"}
                            onChange={() => setPaymentOption("upi")}
                            className="mt-1 accent-primary"
                          />
                          <div className="flex-1">
                            <span className="font-sans text-xs font-bold text-primary flex items-center gap-1.5">
                              <CreditCard size={14} className="text-secondary" />
                              Instant UPI Transfer (Paytm / GooglePay / PhonePe)
                            </span>
                            <p className="font-sans text-[10px] text-primary/55 mt-0.5">
                              Settles instantly via secure bank mandate. Smooth processing.
                            </p>
                          </div>
                        </label>

                        {/* CARD */}
                        <label className={`border rounded-xl p-3.5 flex items-start gap-3 cursor-pointer transition-all ${paymentOption === "card" ? "border-primary bg-primary/5" : "border-secondary/10 bg-white"}`}>
                          <input
                            type="radio"
                            name="payment"
                            checked={paymentOption === "card"}
                            onChange={() => setPaymentOption("card")}
                            className="mt-1 accent-primary"
                          />
                          <div className="flex-1">
                            <span className="font-sans text-xs font-bold text-primary flex items-center gap-1.5">
                              <CreditCard size={14} className="text-secondary" />
                              Premium Credit or Debit Card (Visa / Mastercard / Amex)
                            </span>
                            <p className="font-sans text-[10px] text-primary/55 mt-0.5">
                              PCI-DSS Compliant 256-bit static authorization.
                            </p>
                          </div>
                        </label>

                        {/* COD */}
                        <label className={`border rounded-xl p-3.5 flex items-start gap-3 cursor-pointer transition-all ${paymentOption === "cod" ? "border-primary bg-primary/5" : "border-secondary/10 bg-white"}`}>
                          <input
                            type="radio"
                            name="payment"
                            checked={paymentOption === "cod"}
                            onChange={() => setPaymentOption("cod")}
                            className="mt-1 accent-primary"
                          />
                          <div className="flex-1">
                            <span className="font-sans text-xs font-bold text-primary flex items-center gap-1.5">
                              <Truck size={14} className="text-secondary" />
                              Sovereign Cash on Delivery (COD)
                            </span>
                            <p className="font-sans text-[10px] text-primary/55 mt-0.5">
                              Pay in cash or credit card upon delivery (+₹50 logistics processing fee).
                            </p>
                          </div>
                        </label>
                      </div>

                      {/* Static Secure Badge */}
                      <div className="bg-[#FFF9F2] border border-secondary/15 rounded-xl p-4 flex gap-3 items-center mt-4">
                        <ShieldCheck size={28} className="text-secondary flex-shrink-0" />
                        <p className="font-sans text-[10px] text-primary/65 leading-relaxed">
                          Your security is our absolute priority. The transactional layer is fully sandbox isolated and represents a production-grade Shopify/Custom proxy presentation.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons for Checkout */}
                  <div className="flex gap-3 mt-8">
                    {step === 2 && (
                      <button
                        onClick={() => setStep(1)}
                        className="flex-1 bg-white border border-secondary text-primary font-sans text-xs uppercase tracking-widest font-bold py-3.5 px-4 rounded-xl cursor-pointer hover:bg-secondary/5 transition-all"
                      >
                        Back to Address
                      </button>
                    )}
                    <button
                      onClick={handleNextStep}
                      className="flex-1 bg-primary hover:bg-secondary text-[#FFF9F2] font-sans text-xs uppercase tracking-widest font-extrabold py-3.5 px-4 rounded-xl cursor-pointer shadow-md transition-all hover:scale-[1.01]"
                    >
                      {step === 1 ? "Proceed to Payment" : "Authenticate & Place Order"}
                    </button>
                  </div>
                </div>

                {/* RIGHT COLUMN: Order Summary Sidebar */}
                <div id="checkout-right" className="w-full md:w-80 bg-white border-t md:border-t-0 md:border-l border-secondary/15 p-6 md:p-8 overflow-y-auto flex flex-col justify-between">
                  <div>
                    <h4 className="font-serif text-sm font-bold text-primary border-b border-secondary/5 pb-2 mb-4">
                      Order Summary
                    </h4>

                    <div className="flex flex-col gap-4 max-h-[220px] overflow-y-auto pr-1">
                      {cart.map((item) => {
                        const basePrice = item.product.discountPrice || item.product.price;
                        let sizeMultiplier = 1;
                        if (item.selectedSize === "500g") sizeMultiplier = 1.8;
                        if (item.selectedSize === "1kg") sizeMultiplier = 3.2;
                        const itemPrice = Math.round(basePrice * sizeMultiplier);

                        return (
                          <div key={`${item.product.id}-${item.selectedSize}`} className="flex gap-3 text-left">
                            <div className="w-10 h-10 rounded border border-secondary/5 bg-cream overflow-hidden flex-shrink-0">
                              <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <div className="flex-grow min-w-0">
                              <h5 className="font-serif text-[11px] font-extrabold text-primary truncate">
                                {item.product.name}
                              </h5>
                              <div className="flex justify-between items-center mt-1">
                                <span className="font-sans text-[9px] text-primary/50 uppercase">
                                  {item.selectedSize} × {item.quantity}
                                </span>
                                <span className="font-sans text-[11px] font-bold text-primary">
                                  ₹{itemPrice * item.quantity}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="border-t border-secondary/10 pt-4 mt-6 flex flex-col gap-2.5 font-sans text-xs">
                    <div className="flex justify-between text-primary/70">
                      <span>Subtotal</span>
                      <span className="font-mono">₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between text-primary/70">
                      <span>Delivery Fee</span>
                      <span className="font-mono">
                        {deliveryCost === 0 ? "Free" : `₹${deliveryCost}`}
                      </span>
                    </div>
                    {paymentOption === "cod" && (
                      <div className="flex justify-between text-primary/70">
                        <span>COD Cash Fee</span>
                        <span className="font-mono">₹50</span>
                      </div>
                    )}
                    <div className="h-[1px] bg-secondary/5 my-1" />
                    <div className="flex justify-between items-center text-primary font-bold">
                      <span className="font-serif text-sm">Grand Total</span>
                      <span className="font-mono text-base text-secondary">₹{totalAmount}</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
