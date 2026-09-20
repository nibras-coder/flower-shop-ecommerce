export interface FlowerItem {
  id: string;
  name: string;
  color: string;
  unitPrice: number;
  description: string;
  image: string;
  meanings?: string;
  category?: string;
}

export interface WrappingItem {
  id: string;
  name: string;
  price: number;
  color: string;
  description: string;
  image: string;
}

export interface RibbonItem {
  id: string;
  name: string;
  price: number;
  color: string;
}

export interface BouquetCatalog {
  baseFlowers: FlowerItem[];
  accentBlooms: FlowerItem[];
  wrappings: WrappingItem[];
  ribbons: RibbonItem[];
}

export interface CustomBouquetState {
  baseFlowers: Record<string, number>; // flowerId -> quantity
  accentBlooms: Record<string, number>; // flowerId -> quantity
  wrappingId: string;
  ribbonId: string;
  cardMessage: string;
  occasion: string;
}

export interface PricingBreakdown {
  baseSubtotal: number;
  accentSubtotal: number;
  wrappingPrice: number;
  ribbonPrice: number;
  totalStems: number;
  totalPrice: number;
}

export interface AIRatingAccent {
  flowerId: string;
  name: string;
  suggestedQuantity: number;
  reason: string;
}

export interface AISuggestionResponse {
  provider?: string;
  theme: string;
  colorHarmony: string;
  recommendedAccents: AIRatingAccent[];
  recommendedWrappingId?: string;
  floristAdvice: string;
}

export interface OrderCustomerInfo {
  customerName: string;
  customerEmail: string;
  phone: string;
  customerAddress: string;
  deliveryWindow: string;
}

export interface OrderResponse {
  _id: string;
  orderNumber?: string;
  customerAddress: string;
  customerName?: string;
  customerEmail?: string;
  phone?: string;
  status: 'Pending' | 'Processing' | 'Out for Delivery' | 'Delivered';
  items?: string;
  totalPrice: number;
  deliveryWindow?: string;
  createdAt: string;
  customBouquet?: {
    baseFlowers: Array<{ flowerId: string; name: string; unitPrice: number; quantity: number }>;
    accentBlooms: Array<{ flowerId: string; name: string; unitPrice: number; quantity: number }>;
    wrapping?: { wrappingId: string; name: string; price: number; color?: string };
    ribbon?: { ribbonId: string; name: string; price: number; color?: string };
    cardMessage?: string;
  };
}
