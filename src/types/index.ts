export interface Product {
  id: string;
  name: string;
  slug: string;
  category: 'Suits' | 'Sarees';
  price: number;
  originalPrice?: number;
  images: string[];
  description: string;
  sizes: string[];
  stock: number;
  isNew: boolean;
  isFeatured: boolean;
  keywords: string[];
  rating: number;
  details: string[];
  fabricCare: string[];
  shippingInfo: string;
  returnPolicy: string;
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  quantity: number;
}

export interface WishlistItem {
  product: Product;
}

export interface Order {
  orderNumber: string;
  customerDetails: {
    fullName: string;
    mobileNumber: string;
    email: string;
    address: string;
    landmark?: string;
    city: string;
    state: string;
    pinCode: string;
  };
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    size: string;
    image: string;
  }[];
  paymentMethod: string;
  subtotal: number;
  shipping: number;
  total: number;
  date: string;
}
