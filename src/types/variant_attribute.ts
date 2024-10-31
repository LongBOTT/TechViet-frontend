import { Attribute } from "./attribute";
import { Variant } from "./variant";

export interface Variant_Attribute {
  id: number;
  variant: Variant;
  attribute: Attribute;
  value: string;

}
export interface VariantAttributeDTO {
  variantID: number;
  attributeID: number;
  value: string;
}