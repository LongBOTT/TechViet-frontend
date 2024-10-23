import { Product } from "./product";

export interface Variant {
  id: number;
  image: string;
  price: number;
  quantity: number;
  productID: number;
//   status: string;
}
