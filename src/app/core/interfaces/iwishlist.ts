
export interface Iwishlist {
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  sold: number;
  price: number;
  colors: string[];
  sizes: string[];
  imageCover: string;
  images: string[];
  category: Category;
  subcategories: any[];
  ratingsQuantity: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}

interface Category {
  _id: string;
  name: string;
}