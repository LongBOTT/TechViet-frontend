import React, { createContext, useContext, useEffect, useState } from "react";
import { Product } from "../types/product";
import {

  getProducts,
  searchProductByCategory_Name,
  searchProductsByBrand_Id,

} from "../api/productApi";

interface ProductContextType {
  products: Product[];
  fetchProducts: () => Promise<void>;
  // createProduct: (product: Product) => Promise<void>;
  // editProduct: (id: number, product: Product) => Promise<void>;
  // removeProduct: (id: number) => Promise<void>;
  // searchProductsByName: (query: string) => Promise<void>;
  searchProductByCategoryName: (name: string) => Promise<void>;
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

  const searchProductByCategoryName = async (name: string) => {
    setLoading(true);
    try {
      const data = await searchProductByCategory_Name (name);
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
        searchProductByCategoryName,
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
