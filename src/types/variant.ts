import { extend } from "lodash";
import { Product } from "./product";
import Variant from "../admin/components/Product/EditVariant";
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
  price: number;
  costPrice: number;
  productId: number;
}

export interface Variants extends VariantRequest {
  attributes: Variant_Attribute[];
}

