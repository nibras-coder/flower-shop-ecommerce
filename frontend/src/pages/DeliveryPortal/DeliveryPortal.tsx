import React, { useState } from 'react';

// Mock data
const mockDeliveries = [
  {
    id: 'ORD-1001',
    customerName: 'Alice Smith',
    address: '123 Rose Garden Ln, Springville',
    status: 'Out for Delivery',
    items: '2x Red Roses Bouquet',
  },
  {
    id: 'ORD-1002',
    customerName: 'Bob Jones',
    address: '456 Tulip Ave, Springville',
    status: 'Pending',
    items: '1x Sunflower Arrangement',
  },
];

const DeliveryPortal: React.FC = () => {
  const [deliveries, setDeliveries] = useState(mockDeliveries);

  const markAsDelivered = (id: string) => {
    setDeliveries(deliveries.map((delivery) => 
      delivery.id === id ? { ...delivery, status: 'Delivered' } : delivery
    ));
    // Here we would dispatch an API call to PUT /api/orders/:id/deliver
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Mobile Header */}
      <div className="bg-primary text-white p-4 sticky top-0 z-10 shadow-md">
        <h1 className="text-xl font-bold">Driver Portal</h1>
        <p className="text-sm opacity-80">Today's Route</p>
      </div>

      <div className="p-4 space-y-4">
        {deliveries.map((delivery) => (
          <div key={delivery.id} className="bg-white rounded-xl shadow-xs border border-gray-100 p-4">
            <div className="flex justify-between items-start mb-2">
              <span className="font-bold text-gray-800">{delivery.id}</span>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                delivery.status === 'Delivered' 
                  ? 'bg-green-100 text-green-700' 
                  : delivery.status === 'Out for Delivery'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-yellow-100 text-yellow-700'
              }`}>
                {delivery.status}
              </span>
            </div>
            
            <h3 className="text-lg font-bold text-gray-900 mb-1">{delivery.customerName}</h3>
            <p className="text-gray-600 text-sm mb-3 flex items-start gap-1">
              <svg className="w-4 h-4 mt-0.5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              {delivery.address}
            </p>
            <p className="text-gray-500 text-sm mb-4">Items: {delivery.items}</p>

            {delivery.status !== 'Delivered' && (
              <button 
                onClick={() => markAsDelivered(delivery.id)}
                className="w-full bg-green-500 text-white font-bold py-3 rounded-xl shadow-xs active:bg-green-600 transition-colors flex justify-center items-center gap-2 touch-manipulation"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Mark as Delivered
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeliveryPortal;
