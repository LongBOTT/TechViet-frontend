import { Variant } from "./variant";

export interface CartItem extends Variant {
  buyQuantity: number;
  color: string
}