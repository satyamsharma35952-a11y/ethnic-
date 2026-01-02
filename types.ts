
export interface Product {
  id: string;
  name: string;
  category: 'Anarkali' | 'Straight' | 'Short' | 'A-Line' | 'Ethnic Set';
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  colors: string[];
  sizes: string[];
  isNew?: boolean;
  isBestSeller?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'Processing' | 'Shipped' | 'In Transit' | 'Delivered';
  trackingNumber: string;
}

export type View = 'home' | 'shop' | 'product' | 'cart' | 'profile' | 'checkout' | 'orders';
