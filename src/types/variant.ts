import { Product } from "./product";

export interface Variant {
  id: number;
  image: string;
  price: number;
  products: Product;
  quantity: number;
//   status: string;
}
