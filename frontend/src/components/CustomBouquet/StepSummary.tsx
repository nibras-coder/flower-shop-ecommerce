import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type {
  BouquetCatalog,
  CustomBouquetState,
  PricingBreakdown,
  OrderCustomerInfo,
  OrderResponse,
} from '../../types/bouquet';

interface StepSummaryProps {
  catalog: BouquetCatalog;
  state: CustomBouquetState;
  pricing: PricingBreakdown;
  onEditStep: (step: number) => void;
  onResetBouquet: () => void;
}

export const StepSummary: React.FC<StepSummaryProps> = ({
  catalog,
  state,
  pricing,
  onEditStep,
  onResetBouquet,
}) => {
  const navigate = useNavigate();

  const [customerInfo, setCustomerInfo] = useState<OrderCustomerInfo>({
    customerName: '',
    customerEmail: '',
    phone: '',
    customerAddress: '',
    deliveryWindow: 'Deliver before 5:00 PM',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);
  const [createdOrder, setCreatedOrder] = useState<OrderResponse | null>(null);

  // Selected Items Detail
  const selectedBases = Object.entries(state.baseFlowers)
    .filter(([_, qty]) => qty > 0)
    .map(([id, qty]) => {
      const item = catalog.baseFlowers.find((f) => f.id === id);
      return { item, quantity: qty, total: (item?.unitPrice || 0) * qty };
    });

  const selectedAccents = Object.entries(state.accentBlooms)
    .filter(([_, qty]) => qty > 0)
    .map(([id, qty]) => {
      const item = catalog.accentBlooms.find((f) => f.id === id);
      return { item, quantity: qty, total: (item?.unitPrice || 0) * qty };
    });

  const selectedWrap = catalog.wrappings.find((w) => w.id === state.wrappingId);
  const selectedRib = catalog.ribbons.find((r) => r.id === state.ribbonId);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerInfo.customerAddress.trim()) {
      setOrderError('Delivery address is required.');
      return;
    }

    setIsSubmitting(true);
    setOrderError(null);

    try {
      // Build order payload
      const orderPayload = {
        customerName: customerInfo.customerName.trim() || 'Valued Customer',
        customerEmail: customerInfo.customerEmail.trim(),
        phone: customerInfo.phone.trim(),
        customerAddress: customerInfo.customerAddress.trim(),
        deliveryWindow: customerInfo.deliveryWindow,
        totalPrice: pricing.totalPrice,
        customBouquet: {
          baseFlowers: selectedBases.map((b) => ({
            flowerId: b.item?.id || '',
            name: b.item?.name || '',
            unitPrice: b.item?.unitPrice || 0,
            quantity: b.quantity,
          })),
          accentBlooms: selectedAccents.map((a) => ({
            flowerId: a.item?.id || '',
            name: a.item?.name || '',
            unitPrice: a.item?.unitPrice || 0,
            quantity: a.quantity,
          })),
          wrapping: selectedWrap
            ? {
                wrappingId: selectedWrap.id,
                name: selectedWrap.name,
                price: selectedWrap.price,
                color: selectedWrap.color,
              }
            : undefined,
          ribbon: selectedRib
            ? {
                ribbonId: selectedRib.id,
                name: selectedRib.name,
                price: selectedRib.price,
                color: selectedRib.color,
              }
            : undefined,
          cardMessage: state.cardMessage,
        },
      };

      // Check if user has an existing auth token in localStorage (from teammate's auth flow)
      const token = localStorage.getItem('token') || localStorage.getItem('userInfo');
      let authToken = '';
      if (token) {
        try {
          const parsed = JSON.parse(token);
          authToken = parsed.token || token;
        } catch {
          authToken = token;
        }
      }

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
      }

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers,
        body: JSON.stringify(orderPayload),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({ message: 'Failed to place order' }));
        throw new Error(errData.message || `Server responded with ${response.status}`);
      }

      const orderResult: OrderResponse = await response.json();
      setCreatedOrder(orderResult);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Order processing failed';
      setOrderError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="glass-panel p-6 rounded-2xl bg-white/70 border border-white/60">
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-800">
          Bouquet Review & Final Order
        </h2>
        <p className="text-slate-600 text-sm mt-1">
          Review your bespoke botanical arrangement before submitting your order to our master florists.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Visual Bouquet Breakdown */}
        <div className="lg:col-span-7 space-y-6">
          {/* Floral Stems Card */}
          <div className="glass-panel p-6 rounded-3xl bg-white/80 border border-white/60 shadow-lg">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100">
              <h3 className="font-serif text-xl font-bold text-slate-800">
                Arrangement Composition ({pricing.totalStems} stems)
              </h3>
              <button
                type="button"
                onClick={() => onEditStep(1)}
                className="text-xs font-bold text-primary hover:underline cursor-pointer"
              >
                Edit Stems
              </button>
            </div>

            {/* Focal Flowers */}
            <div className="mb-6">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Focal Flowers ({selectedBases.reduce((a, b) => a + b.quantity, 0)} stems)
              </p>
              <div className="space-y-3">
                {selectedBases.map(({ item, quantity, total }) => (
                  <div
                    key={item?.id}
                    className="flex items-center justify-between p-3 bg-slate-50/80 rounded-xl border border-slate-100"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item?.image}
                        alt={item?.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-bold text-sm text-slate-800">{item?.name}</p>
                        <p className="text-xs text-slate-500">
                          {quantity} stems × ${item?.unitPrice.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <span className="font-black text-sm text-slate-800">${total.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Accent Blooms & Greenery */}
            {selectedAccents.length > 0 && (
              <div className="mb-4">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Accent Blooms & Foliage ({selectedAccents.reduce((a, b) => a + b.quantity, 0)} stems)
                </p>
                <div className="space-y-3">
                  {selectedAccents.map(({ item, quantity, total }) => (
                    <div
                      key={item?.id}
                      className="flex items-center justify-between p-3 bg-slate-50/80 rounded-xl border border-slate-100"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item?.image}
                          alt={item?.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-bold text-sm text-slate-800">{item?.name}</p>
                          <p className="text-xs text-slate-500">
                            {quantity} stems × ${item?.unitPrice.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <span className="font-black text-sm text-slate-800">${total.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Packaging & Card Preview */}
          <div className="glass-panel p-6 rounded-3xl bg-white/80 border border-white/60 shadow-lg">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100">
              <h3 className="font-serif text-xl font-bold text-slate-800">Wrapping & Presentation</h3>
              <button
                type="button"
                onClick={() => onEditStep(3)}
                className="text-xs font-bold text-primary hover:underline cursor-pointer"
              >
                Edit Wrapping
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Wrapping Paper</span>
                <p className="font-bold text-sm text-slate-800 mt-1">{selectedWrap?.name}</p>
                <p className="text-xs font-semibold text-primary mt-0.5">${selectedWrap?.price.toFixed(2)}</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Ribbon Accent</span>
                <p className="font-bold text-sm text-slate-800 mt-1">{selectedRib?.name || 'None'}</p>
                <p className="text-xs font-semibold text-accent mt-0.5">
                  {selectedRib ? `$${selectedRib.price.toFixed(2)}` : 'Complimentary'}
                </p>
              </div>
            </div>

            {state.cardMessage && (
              <div className="p-4 bg-[#fcfaf7] border border-[#e8dfd5] rounded-2xl">
                <span className="text-xs font-serif italic text-slate-500">Cotton Card Message:</span>
                <p className="font-serif italic text-sm text-slate-800 mt-1">"{state.cardMessage}"</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Checkout & Delivery Form */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl bg-white/90 border border-white/60 shadow-xl">
            <h3 className="font-serif text-2xl font-bold text-slate-900 mb-2">Delivery Details</h3>
            <p className="text-xs text-slate-500 mb-6">
              Enter recipient address for prompt hand delivery by our couriers.
            </p>

            <form onSubmit={handleOrderSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Recipient Name *
                </label>
                <input
                  type="text"
                  name="customerName"
                  required
                  placeholder="e.g. Eleanor Vance"
                  value={customerInfo.customerName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Delivery Address *
                </label>
                <input
                  type="text"
                  name="customerAddress"
                  required
                  placeholder="e.g. 742 Evergreen Terrace, Springfield"
                  value={customerInfo.customerAddress}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+1 (555) 019-2834"
                    value={customerInfo.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="customerEmail"
                    placeholder="name@domain.com"
                    value={customerInfo.customerEmail}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Preferred Delivery Window
                </label>
                <select
                  name="deliveryWindow"
                  value={customerInfo.deliveryWindow}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-primary"
                >
                  <option value="Deliver morning (9:00 AM - 12:00 PM)">Morning (9:00 AM - 12:00 PM)</option>
                  <option value="Deliver afternoon (1:00 PM - 5:00 PM)">Afternoon (1:00 PM - 5:00 PM)</option>
                  <option value="Deliver evening (5:00 PM - 8:00 PM)">Evening (5:00 PM - 8:00 PM)</option>
                </select>
              </div>

              {/* Price Calculation Table */}
              <div className="pt-4 mt-6 border-t border-slate-200 space-y-2 text-sm text-slate-600">
                <div className="flex justify-between">
                  <span>Focal Stems Subtotal</span>
                  <span className="font-semibold text-slate-800">${pricing.baseSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Accent Blooms Subtotal</span>
                  <span className="font-semibold text-slate-800">${pricing.accentSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Wrapping & Ribbon</span>
                  <span className="font-semibold text-slate-800">
                    ${(pricing.wrappingPrice + pricing.ribbonPrice).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Handcrafted Greeting Card</span>
                  <span className="font-semibold text-emerald-600">Complimentary ($0.00)</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-slate-200 text-lg font-bold text-slate-900">
                  <span>Grand Total</span>
                  <span className="text-2xl text-primary font-black">${pricing.totalPrice.toFixed(2)}</span>
                </div>
              </div>

              {orderError && (
                <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200 font-medium">
                  {orderError}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-4 h-14 bg-primary text-white font-bold text-lg rounded-2xl shadow-xl shadow-primary/30 hover:bg-pink-600 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Validating & Submitting...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Place Custom Bouquet Order
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {createdOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
          <div className="glass-panel bg-white/95 rounded-3xl p-8 max-w-lg w-full border border-white/60 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-secondary/15 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h3 className="font-serif text-3xl font-bold text-center text-slate-800 mb-1">
              Order Confirmed!
            </h3>
            <p className="text-center text-sm text-slate-500 mb-6">
              Our florists have received your custom bouquet order and are beginning arrangement.
            </p>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 mb-6 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Order Reference:</span>
                <span className="font-mono font-bold text-slate-800">
                  {createdOrder.orderNumber || createdOrder._id}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Delivery Status:</span>
                <span className="bg-secondary/20 text-secondary font-bold text-xs px-2.5 py-0.5 rounded-full">
                  {createdOrder.status}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Recipient:</span>
                <span className="font-medium text-slate-800">{createdOrder.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Address:</span>
                <span className="font-medium text-slate-800 text-right max-w-[200px] truncate">
                  {createdOrder.customerAddress}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-200 text-base font-bold">
                <span>Total Paid:</span>
                <span className="text-primary font-black">${createdOrder.totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  onResetBouquet();
                  setCreatedOrder(null);
                }}
                className="flex-1 py-3 px-4 rounded-xl border border-slate-300 font-bold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer text-sm"
              >
                Build Another Bouquet
              </button>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="flex-1 py-3 px-4 rounded-xl bg-primary text-white font-bold hover:bg-pink-600 shadow-md transition-colors cursor-pointer text-sm"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
