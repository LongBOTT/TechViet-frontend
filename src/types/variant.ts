import { extend } from "lodash";
import { Product } from "./product";
import Variant from "../admin/components/Product/Variant";
import { Variant_Attribute } from "./variant_attribute";

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
export interface VariantRequest {
  id: number;
  name: string;
  image: string;
  quantity: number;
  available: number;
  price: number;
  minStock: number;
  costPrice: number;
  productId: number;
  status: string;

}

export interface Variant extends VariantRequest {
  attributes: Variant_Attribute[];
}

