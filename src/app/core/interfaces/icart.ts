export interface Icart {
}
export interface Icart {
  cartItems: CartItem[];
  user: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
}

interface CartItem {
  title: string;
  product: string;
  quantity: number;
  imageCover: string;
  color: string;
  size: string;
  price: number;
  _id: string;
}