export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  categoryId: string;
  subCategory: string;
  unit: string;
  price: number;
  mrp: number;
  discountPercentage?: number;
  image: string;
  images?: string[]; // multi-image gallery
  deliveryTime: string; // e.g., "8 MINS", "10 MINS"
  description: string;
  shelfLife?: string;
  manufacturer?: string;
  countryOfOrigin?: string;
  keyFeatures?: string[];
  inStock: boolean;
  packSizes?: { unit: string; price: number; mrp: number }[];
  rating?: number;
  ratingCount?: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  image: string;
  subCategories: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedUnit?: string;
}

export interface LocationInfo {
  title: string;
  address: string;
  city: string;
  deliveryTime: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  linkToCategory?: string;
  tag?: string;
}
