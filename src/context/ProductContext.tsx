import React, { createContext, useContext, useEffect, useState } from "react";
import { Product, ProductRequest, ProductWithVariants } from "../types/product";
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

interface ProductContextType {
  products: Product[];
  product: ProductRequest | undefined;
  handleProductChange: (key: keyof ProductRequest, value: any) => void;
  variant: Variant | undefined;
  handleVariantChange: (key: keyof Variant, value: any) => void;
  addVariant: (variant: VariantRequest) => Promise<VariantRequest>;
  editVariant: (id: number, variant: Variant) => Promise<Variant>;
  deleteVariant: (id: number) => Promise<void>;
  productWithVariants: ProductWithVariants[] | undefined;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  fetchProducts: () => Promise<void>;
  searchProductByCategoryId: (id: number) => Promise<void>;
  createProduct: (product: ProductRequest) => Promise<ProductRequest>;
  editProduct: (id: number, product: Product) => Promise<void>;
  removeProduct: (id: number) => Promise<void>;
  searchProductsByName: (query: string) => Promise<void>;
  loading: boolean;
  selectedProduct: Product | null;
  setSelectedProduct: React.Dispatch<React.SetStateAction<Product | null>>;
  editDialogOpen: boolean;
  setEditDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<ProductRequest>({
    id: 0, // Giá trị mặc định cho ID
    name: '',
    unit: '',
    image: '',
    weight: 0,
    description: '',
    categoryId: 0,
    brandId: 0 ,
    warrantyId: 0,
    status: 'Đang giao dịch',
  });
  const [variant, setVariant] = useState<Variant>({
    id: 0, // Giá trị mặc định cho ID
    name: '',
    image: '',
    quantity: 0,
    minStock: 0,
    costPrice: 0,
    price: 0,
    products: {} as Product,
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

  const handleVariantChange = (key: keyof Variant, value: any) => {
    setVariant((prevVariant) => {
      if (!prevVariant) return prevVariant;
      return {
        ...prevVariant,
        [key]: value,
      };
    });
  }
  const createProduct = async (product: ProductRequest): Promise<ProductRequest> => {
   const response = await addProduct(product);
   fetchProductsWithVariants();
    return response;
  };

  const editProduct = async (id: number, product: Product) => {
    await updateProduct(id, product);
    fetchProductsWithVariants();
  };

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
    // Quản lý Variant
    const createVariant = async (variant: VariantRequest) => {
      const data = await addVariant(variant);
      fetchProductsWithVariants(); 
      return data;
    };
  
    const editVariant = async (id: number, variant: Variant) => {
      const data = await updateVariant(id, variant);
      fetchProductsWithVariants(); 
      return data;
    };
  
    const deleteVariant = async (id: number) => {
      const data = await deleteVariant(id);
      fetchProductsWithVariants(); 
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
        variant,
        handleVariantChange,
        addVariant: createVariant,
        editVariant,
        deleteVariant,
        setProducts,
        fetchProducts,
        searchProductByCategoryId,
        selectedProduct,
        setSelectedProduct,
        editDialogOpen,
        setEditDialogOpen,
        createProduct,
        editProduct,
        removeProduct,
        searchProductsByName,
        loading,
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
