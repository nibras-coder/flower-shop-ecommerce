import React, { useState, useEffect } from 'react';

type OrderStatus = 'Assigned' | 'Picked Up' | 'En Route' | 'Delivered';

interface Order {
  id: string;
  customerName: string;
  address: string;
  status: OrderStatus;
  items: string;
  fragility: string;
  deliveryWindow: string;
  phone: string;
  lat: number;
  lng: number;
}

const mockDeliveries: Order[] = [
  {
    id: 'ORD-1001',
    customerName: 'Alice Smith',
    address: '123 Rose Garden Ln, Springville',
    status: 'En Route',
    items: '2x Red Roses Bouquet',
    fragility: '🌹 Fragile - Keep upright, do not stack',
    deliveryWindow: 'Deliver before 2:30 PM',
    phone: '+1 (555) 123-4567',
    lat: 40.7128,
    lng: -74.0060
  },
  {
    id: 'ORD-1002',
    customerName: 'Bob Jones',
    address: '456 Tulip Ave, Springville',
    status: 'Assigned',
    items: '1x Sunflower Arrangement',
    fragility: '🌻 Handle with care',
    deliveryWindow: 'Deliver between 3:00 PM - 5:00 PM',
    phone: '+1 (555) 987-6543',
    lat: 40.7300,
    lng: -73.9950
  },
  {
    id: 'ORD-1003',
    customerName: 'Carol White',
    address: '789 Orchid Blvd, Springville',
    status: 'Assigned',
    items: '1x Premium Orchid Pot',
    fragility: '🌸 Extremely fragile - Temperature sensitive',
    deliveryWindow: 'Deliver before 6:00 PM',
    phone: '+1 (555) 555-5555',
    lat: 40.7400,
    lng: -73.9800
  }
];

const statusSteps: OrderStatus[] = ['Assigned', 'Picked Up', 'En Route', 'Delivered'];

const DeliveryPortal: React.FC = () => {
  const [deliveries, setDeliveries] = useState<Order[]>(mockDeliveries);
  const [isOnDuty, setIsOnDuty] = useState(true);
  const [activeTab, setActiveTab] = useState<'Queue' | 'Completed'>('Queue');
  const [showPOD, setShowPOD] = useState(false);
  const [deliveringId, setDeliveringId] = useState<string | null>(null);

  const currentOrder = deliveries.find(d => d.status !== 'Delivered');
  const queueOrders = deliveries.filter(d => d.status !== 'Delivered' && d.id !== currentOrder?.id);
  const completedOrders = deliveries.filter(d => d.status === 'Delivered');

  const advanceStatus = (id: string) => {
    const order = deliveries.find(d => d.id === id);
    if (!order) return;

    if (order.status === 'En Route') {
      setDeliveringId(id);
      setShowPOD(true);
      return;
    }

    setDeliveries(prev => prev.map(o => {
      if (o.id === id) {
        const currentIndex = statusSteps.indexOf(o.status);
        if (currentIndex < statusSteps.length - 1) {
          return { ...o, status: statusSteps[currentIndex + 1] };
        }
      }
      return o;
    }));
  };

  const confirmDeliveryPOD = () => {
    if (!deliveringId) return;
    setDeliveries(prev => prev.map(o => o.id === deliveringId ? { ...o, status: 'Delivered' } : o));
    setShowPOD(false);
    setDeliveringId(null);
  };

  return (
    <div className="min-h-screen bg-slate-900 font-sans text-slate-800 flex flex-col lg:flex-row overflow-hidden relative">
      {/* 
        MAIN STAGE (Map Background)
        On mobile, this acts as the background. On desktop, it takes up the right 75% of the screen.
      */}
      <div className="absolute inset-0 lg:static lg:flex-1 h-screen relative bg-slate-800 overflow-hidden z-0 lg:z-10 order-2 lg:order-2">
        {/* Mock Interactive Map Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-60 mix-blend-luminosity" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2000&auto=format&fit=crop')" }}
        ></div>
        
        {/* Map UI Elements */}
        <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent opacity-80 pointer-events-none"></div>
        
        {/* Floating Weather & Dispatch Widget */}
        <div className="absolute top-6 right-6 hidden lg:flex flex-col gap-3 items-end z-20">
          <div className="glass-panel bg-white/20 backdrop-blur-xl border border-white/20 rounded-2xl p-4 text-white shadow-2xl flex items-center gap-3">
            <span className="text-3xl">☀️</span>
            <div>
              <p className="font-bold">72°F - Clear</p>
              <p className="text-xs opacity-80">Optimal floral transport</p>
            </div>
          </div>
          <div className="glass-panel bg-primary/80 backdrop-blur-xl border border-white/20 rounded-2xl p-4 text-white shadow-2xl max-w-xs animate-bounce">
            <p className="text-xs font-bold uppercase tracking-wider mb-1 opacity-80">Dispatch Alert</p>
            <p className="text-sm font-medium">Traffic clearing on 5th Ave. Proceed with standard route.</p>
          </div>
        </div>

        {/* Current Stop Hero Card (Floating on Map) */}
        <div className="absolute inset-x-0 bottom-0 lg:bottom-auto lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 p-4 z-30 lg:w-[32rem]">
          {currentOrder ? (
            <div className="glass-panel bg-white/80 backdrop-blur-2xl rounded-3xl p-6 lg:p-8 border-2 border-white/60 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] relative overflow-hidden transition-all transform lg:hover:scale-[1.02] duration-500">
              <div className="absolute top-0 left-0 w-2 h-full bg-primary"></div>
              
              <div className="flex justify-between items-start mb-4">
                <span className="text-sm font-bold text-slate-500 tracking-widest">{currentOrder.id}</span>
                <span className="bg-red-100 text-red-600 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 animate-pulse border border-red-200 shadow-sm">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  {currentOrder.deliveryWindow}
                </span>
              </div>

              <h2 className="text-4xl font-serif font-bold text-slate-900 leading-tight mb-4 drop-shadow-sm">
                {currentOrder.customerName}
              </h2>

              <div className="bg-orange-50/80 border border-orange-200/50 rounded-2xl p-4 mb-6 shadow-inner">
                <p className="text-sm font-bold text-orange-800 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                  {currentOrder.fragility}
                </p>
                <p className="text-sm text-orange-700/80 mt-1 font-medium ml-7">{currentOrder.items}</p>
              </div>

              <div className="mb-8">
                <p className="text-xs text-slate-500 mb-2 font-bold uppercase tracking-widest">Delivery Address</p>
                <p className="text-xl font-medium text-slate-800 leading-snug">{currentOrder.address}</p>
                
                <div className="flex gap-3 mt-4">
                  <button className="flex-[2] bg-secondary text-white font-bold py-3.5 rounded-xl shadow-lg shadow-secondary/30 flex items-center justify-center gap-2 hover:bg-emerald-600 active:scale-95 transition-all">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    Navigate
                  </button>
                  <button className="flex-1 bg-white border-2 border-slate-200 text-slate-700 font-bold py-3.5 rounded-xl shadow-sm flex items-center justify-center gap-2 hover:bg-slate-50 active:scale-95 transition-all">
                    Call
                  </button>
                  <button className="flex-1 bg-white border-2 border-slate-200 text-slate-700 font-bold py-3.5 rounded-xl shadow-sm flex items-center justify-center gap-2 hover:bg-slate-50 active:scale-95 transition-all">
                    SMS
                  </button>
                </div>
              </div>

              {/* Status Progression */}
              <div className="mb-8 relative px-2">
                <div className="absolute top-3 left-2 w-[calc(100%-16px)] h-1.5 bg-slate-200 rounded-full z-0"></div>
                <div 
                  className="absolute top-3 left-2 h-1.5 bg-primary rounded-full z-0 transition-all duration-700 ease-out shadow-[0_0_10px_rgba(236,72,153,0.5)]"
                  style={{ width: `${(statusSteps.indexOf(currentOrder.status) / (statusSteps.length - 1)) * 100}%` }}
                ></div>
                <div className="flex justify-between relative z-10">
                  {statusSteps.map((step, idx) => (
                    <div key={step} className="flex flex-col items-center gap-2">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-4 transition-all duration-700 ${
                        statusSteps.indexOf(currentOrder.status) >= idx 
                          ? 'bg-primary border-white text-white shadow-md shadow-primary/40 scale-110' 
                          : 'bg-white border-slate-200 text-transparent'
                      }`}>
                        {statusSteps.indexOf(currentOrder.status) > idx && (
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg>
                        )}
                      </div>
                      <span className={`text-[11px] font-bold tracking-wide ${statusSteps.indexOf(currentOrder.status) >= idx ? 'text-primary drop-shadow-xs' : 'text-slate-400'}`}>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => advanceStatus(currentOrder.id)}
                className="w-full h-16 bg-primary text-white font-bold text-xl rounded-2xl shadow-xl shadow-primary/40 hover:bg-pink-600 hover:shadow-primary/60 active:scale-[0.98] transition-all flex items-center justify-center gap-3 overflow-hidden relative group"
              >
                <div className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                {currentOrder.status === 'En Route' ? 'Complete Drop-off' : `Update: ${statusSteps[statusSteps.indexOf(currentOrder.status) + 1]}`}
              </button>
            </div>
          ) : (
            <div className="glass-panel bg-white/80 backdrop-blur-2xl rounded-3xl p-12 text-center border-2 border-white/60 shadow-2xl">
              <div className="w-24 h-24 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                <svg className="w-12 h-12 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-3xl font-serif font-bold text-slate-800 mb-3">Shift Complete!</h3>
              <p className="text-slate-500 text-lg font-medium">All deliveries have been executed flawlessly.</p>
            </div>
          )}
        </div>
      </div>

      {/* 
        SIDEBAR 
        On mobile, this overlays the map with a glass effect. On desktop, it's a solid sidebar.
      */}
      <div className="w-full lg:w-[400px] h-screen bg-white/90 lg:bg-background backdrop-blur-2xl lg:backdrop-blur-none border-r border-slate-200/50 shadow-2xl flex flex-col z-20 order-1 lg:order-1 relative lg:static shrink-0 overflow-y-auto pb-32 lg:pb-0">
        
        {/* Header & Metrics */}
        <div className="p-6 bg-white border-b border-slate-100 shadow-xs sticky top-0 z-30">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-bold text-xl">AR</span>
              </div>
              <div>
                <h1 className="font-bold text-xl text-slate-800">Alex Rodriguez</h1>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full inline-block mt-1 ${isOnDuty ? 'bg-secondary/20 text-secondary' : 'bg-slate-200 text-slate-500'}`}>
                  {isOnDuty ? '🟢 On Duty' : '⚫ Offline'}
                </span>
              </div>
            </div>
            <button 
              onClick={() => setIsOnDuty(!isOnDuty)}
              className="bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl text-sm font-bold text-slate-700 transition-colors"
            >
              Toggle
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Earned Today</p>
              <p className="text-2xl font-black text-slate-800">$142.50</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Success Rate</p>
              <p className="text-2xl font-black text-secondary">100%</p>
            </div>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="p-4 bg-slate-50/50 border-b border-slate-100">
          <div className="flex bg-slate-200/50 p-1 rounded-xl">
            {(['Queue', 'Completed'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${
                  activeTab === tab 
                    ? 'bg-white text-primary shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {tab} 
                <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${activeTab === tab ? 'bg-primary/10 text-primary' : 'bg-slate-200'}`}>
                  {tab === 'Queue' ? queueOrders.length : completedOrders.length}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* List Content */}
        <div className="p-4 flex-1">
          {activeTab === 'Queue' && (
            <div className="space-y-4">
              {queueOrders.length > 0 ? queueOrders.map((order, idx) => (
                <div key={order.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-slate-200 group-hover:bg-accent transition-colors"></div>
                  <div className="flex justify-between items-start mb-2 pl-2">
                    <span className="font-bold text-lg text-slate-800">{order.customerName}</span>
                    <span className="text-xs font-bold text-accent bg-accent/10 px-2 py-1 rounded-md">{order.deliveryWindow}</span>
                  </div>
                  <p className="text-sm text-slate-500 font-medium pl-2">{order.address}</p>
                </div>
              )) : (
                <div className="text-center py-12">
                  <p className="text-slate-400 font-medium">No upcoming deliveries in queue.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'Completed' && (
            <div className="space-y-4">
              {completedOrders.length > 0 ? completedOrders.map(order => (
                <div key={order.id} className="bg-slate-50 p-5 rounded-2xl border border-slate-100 flex justify-between items-center opacity-70 hover:opacity-100 transition-opacity">
                  <div>
                    <span className="block font-bold text-slate-700 line-through decoration-slate-300">{order.customerName}</span>
                    <span className="text-xs font-medium text-slate-500 mt-1 block">{order.id}</span>
                  </div>
                  <div className="bg-secondary/10 text-secondary px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    Delivered
                  </div>
                </div>
              )) : (
                <div className="text-center py-12">
                  <p className="text-slate-400 font-medium">No completed deliveries yet.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Proof of Delivery (POD) Modal UI */}
      {showPOD && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="glass-panel bg-white/90 backdrop-blur-2xl rounded-3xl p-8 w-full max-w-lg border border-white/50 shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="text-2xl font-serif font-bold text-slate-900 mb-2">Proof of Delivery</h3>
            <p className="text-slate-500 text-sm mb-6 font-medium">Please capture a signature or photo to finalize.</p>
            
            <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl h-48 flex flex-col items-center justify-center mb-6 hover:bg-slate-100 transition-colors cursor-pointer group">
              <svg className="w-10 h-10 text-slate-400 mb-2 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
              <span className="text-sm font-bold text-slate-500">Tap to Sign or Capture Photo</span>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setShowPOD(false)}
                className="flex-1 bg-white border-2 border-slate-200 text-slate-700 font-bold py-3.5 rounded-xl hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDeliveryPOD}
                className="flex-[2] bg-primary text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary/30 hover:bg-pink-600 transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Confirm Delivery
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryPortal;
