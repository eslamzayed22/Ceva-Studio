export interface IuserData {}
export interface IuserData {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  active: boolean;
  wishlist: string[];
  addresses: Address[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  phone: string;
}

interface Address {
  alias: string;
  details: string;
  phone: string;
  city: string;
  postalCode: string;
  _id: string;
}
