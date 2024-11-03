import React, { createContext, useContext, useEffect, useState } from "react";
import { Product, ProductRequest } from "../types/product";
import {
  addProduct,
  deleteProduct,
  getProducts,
  getProductsWithVariants,
  searchProductByCategory_Id,
  searchProductByName,
  searchProductsByBrand_Id,
  updateProduct,
} from "../api/productApi";
import { Category } from "../types/category";
import { Brand } from "../types/brand";
import { Warranty } from "../types/warranty";
import { Variant, VariantRequest } from "../types/variant";
import { addVariant, updateVariant } from "../api/variantApi";
import {ProductWithVariants} from "../types/product";
import { VariantAttributeRequest } from "../types/variant_attribute";
import { addVariantAttribute } from "../api/variant_attributeApi";

interface ProductContextType {
  products: Product[];
  product: ProductRequest | undefined;
  handleProductChange: (key: keyof ProductRequest, value: any) => void;
  productWithVariants: ProductWithVariants[] | undefined;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  fetchProducts: () => Promise<void>;
  searchProductByCategoryId: (id: number) => Promise<void>;
  createProduct: (product: ProductRequest) => Promise<ProductRequest>;
  // editProduct: (id: number, product: Product) => Promise<void>;
  removeProduct: (id: number) => Promise<void>;
  searchProductsByName: (query: string) => Promise<void>;
  loading: boolean;
  selectedProduct: Product | null;
  setSelectedProduct: React.Dispatch<React.SetStateAction<Product | null>>;
  editDialogOpen: boolean;
  setEditDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  ProductVariants: ProductWithVariants| undefined;
  fetchProductsWithVariants: () => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [ProductVariants, setProductVariants] = useState<ProductWithVariants | undefined>(undefined);
  const [product, setProduct] = useState<ProductRequest>({
    id: 0, // Giá trị mặc định cho ID
    name: '',
    unit: '',
    image: '',
    weight:'',
    description: '',
    categoryId: 0,
    brandId: 0 ,
    warrantyId: 0,
    status: 'Đang giao dịch',
  });


  const [loading, setLoading] = useState(true);
  const [productWithVariants, setProductWithVariants] =
    useState<ProductWithVariants[]>();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      setProducts(data || []);
    } catch (error) {
      console.error("Error searching products:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleProductChange = (key: keyof ProductRequest, value: any) => {
    setProduct((prevProduct) => {
      if (!prevProduct) return prevProduct;
      return {
        ...prevProduct,
        [key]: value,
      };
    });
  };

  const createProduct = async (product: ProductRequest): Promise<ProductRequest> => {
   const response = await addProduct(product);
   fetchProductsWithVariants();
    return response;
  };
 

  // const editProduct = async (id: number, product: Product) => {
  //   await updateProduct(id, product);
  //   fetchProductsWithVariants();
  // };

  const removeProduct = async (id: number) => {
    await deleteProduct(id);
    fetchProductsWithVariants();
  };

  const searchProductsByName = async (query: string) => {
    setLoading(true);
    try {
      const data = await searchProductByName(query);
      setProducts(data || []);
    } catch (error) {
      console.error("Error searching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const searchProductByCategoryId = async (id: number) => {
    setLoading(true);
    try {
      const data = await searchProductByCategory_Id(id);
      setProducts(data || []);
      console.log(data?.length);
    } catch (error) {
      console.error("Error searching products:", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchProductsWithVariants = async () => {
    setLoading(true);
    try {
      const data = await getProductsWithVariants();
      setProductWithVariants(data || []);
    } catch (error) {
      console.error("Error searching products:", error);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchProducts();
    fetchProductsWithVariants();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        product,
        handleProductChange,
        productWithVariants,
        setProducts,
        fetchProducts,
        fetchProductsWithVariants,
        searchProductByCategoryId,
        selectedProduct,
        setSelectedProduct,
        editDialogOpen,
        setEditDialogOpen,
        createProduct,
 
        removeProduct,
        searchProductsByName,
        loading,
        ProductVariants
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};
