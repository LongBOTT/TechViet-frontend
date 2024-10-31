import { Product } from "./product";

export interface Variant {
  id: number;
  name: string;
  image: string;
  quantity: number;
  minStock: number;
  costPrice: number;
  price: number;
  products: Product;
  status: string;
}
//src/types/variant.ts
export interface VariantDTO {
  id: number;
  name: string;
  image: string;
  quantity: number;
  price: number;
  minStock: number;
  costPrice: number;
  productId: number;
}