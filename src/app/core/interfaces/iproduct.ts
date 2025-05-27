export interface IProduct {
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  sold: number;
  price: number;
  colors: any[];
  sizes: any[];
  imageCover: string;
  images: string[];
  category: Category;
  subcategories: any[];
  ratingsQuantity: number;
  createdAt: string;
  updatedAt: string;
  id: string;
}

interface Category {
  _id: string;
  name: string;
}
