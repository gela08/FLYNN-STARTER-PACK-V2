
export interface Flavor {
  name: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'with-coffee' | 'no-coffee' | 'meal';
  image: string;
  hasFlavors?: boolean;
  gradient: string;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  flavor?: string;
  price: number;
  quantity: number;
}
