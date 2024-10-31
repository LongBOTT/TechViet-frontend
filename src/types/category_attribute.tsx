import  {Attribute}from './attribute'; // Adjust the import path as necessary
import { Category } from "./category";
export interface category_attribute {
    id: number; 
    category_id: Category; 
    attribute: Attribute; 
  }