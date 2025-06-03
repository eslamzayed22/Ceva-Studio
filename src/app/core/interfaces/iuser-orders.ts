
export interface IuserOrders {
  shippingAddress: ShippingAddress;
  _id: string;
  user: User;
  cartItems: CartItem[];
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  createdAt: string;
  updatedAt: string;
  paidAt?: string;
  deliveredAt?: string;
}

interface CartItem {
  product: Product | null;
  quantity: number;
  color?: string;
  size: string;
  price: number;
  _id: string;
}

interface Product {
  _id: string;
  title: string;
  imageCover: string;
  category: Category;
  id: string;
}

interface Category {
  _id: string;
  name: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
  postalCode: string;
}