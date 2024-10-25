import React, { createContext, useContext, useEffect, useState } from "react";
import { Product } from "../types/product";
import {

  getProducts,
  searchProductByCategory_Id,
  searchProductsByBrand_Id,

} from "../api/productApi";

interface ProductContextType {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>
  fetchProducts: () => Promise<void>;
  // createProduct: (product: Product) => Promise<void>;
  // editProduct: (id: number, product: Product) => Promise<void>;
  // removeProduct: (id: number) => Promise<void>;
  // searchProductsByName: (query: string) => Promise<void>;
  searchProductByCategoryId: (id: number) => Promise<void>;
  // filterProductsByStatus: (status: string) => Promise<void>;
  loading: boolean;
  // selectedProduct: Product | null;
  // setSelectedProduct: React.Dispatch<React.SetStateAction<Product | null>>;
  // editDialogOpen: boolean;
  // setEditDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

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

  // const createProduct = async (product: Product) => {
  //   await addProduct(product);
  //   fetchProducts();
  // };

  // const editProduct = async (id: number, product: Product) => {
  //   await updateProduct(id, product);
  //   fetchProducts();
  // };

  // const removeProduct = async (id: number) => {
  //   await deleteProduct(id);
  //   fetchProducts();
  // };

  // const searchProductsByName = async (query: string) => {
  //   setLoading(true);
  //   try {
  //     const data = await searchProductByName(query);
  //     setProducts(data || []);
  //   } catch (error) {
  //     console.error("Error searching products:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const searchProductByCategoryId = async (id: number) => {
    setLoading(true);
    try {
      const data = await searchProductByCategory_Id (id);
      setProducts(data || []);
      console.log(data?.length)
    } catch (error) {
      console.error("Error searching products:", error);
    } finally {
      setLoading(false);
    }
  };


  // useEffect(() => {
  //   fetchProducts();
  // }, []);
  
  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        // selectedProduct,
        // setSelectedProduct,
        // editDialogOpen,
        // setEditDialogOpen,
        fetchProducts,
        // createProduct,
        // editProduct,
        // removeProduct,
        // searchProductsByName,
        // filterProductsByStatus,
        searchProductByCategoryId,
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
