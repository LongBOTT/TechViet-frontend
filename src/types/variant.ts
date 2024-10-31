import { Product } from "./product";

export interface Variant {
  id: number;
  image: string;
  price: number;
  products: Product;
  quantity: number;
//   status: string;
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