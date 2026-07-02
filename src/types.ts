export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  discountPrice?: number;
  rating: number;
  reviewsCount: number;
  description: string;
  benefits: string[];
  nutrition: {
    calories: string;
    protein: string;
    carbs: string;
    fat: string;
    fiber: string;
  };
  image: string;
  gallery: string[];
  stock: boolean;
  isFeatured: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
  discountPercent?: number;
  sizeOptions: string[];
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  itemCount: number;
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  date: string;
  author: string;
  image: string;
  readTime: string;
  views: number;
  likes: number;
  tags: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  comment: string;
  rating: number;
  avatar: string;
  isFeatured: boolean;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface FestivalCollection {
  id: string;
  name: string;
  description: string;
  image: string;
  themeColor: string;
  slug: string;
}

export interface CorporateGiftPackage {
  id: string;
  name: string;
  priceRange: string;
  description: string;
  contents: string[];
  minQuantity: number;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
}

export interface WishlistItem {
  product: Product;
}
