import { Attribute } from "./attribute";
import { Variant } from "./variant";

export interface Variant_Attribute {
  id: number;
  variant: Variant;
  attribute: Attribute;
  value: string;

}
export interface VariantAttributeRequest {
  variantId: number;
  attributeId: number;
  value: string;
}