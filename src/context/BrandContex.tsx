import React, { createContext, useContext, useEffect, useState } from "react";
import { Brand } from "../types/brand";
import {
  addBrand,
  updateBrand,
  deleteBrand,
  getBrands,
  searchBrandByName,
  filterBrandByStatus,
  // searchBrandByCategory_Name,
  searchBrandByCategory_Id,
} from "../api/brandApi";


interface BrandContextType {
  brands: Brand[];
  fetchBrands: () => Promise<void>;
  createBrand: (brand: Brand) => Promise<void>;
  editBrand: (id: number, brand: Brand) => Promise<void>;
  removeBrand: (id: number) => Promise<void>;
  searchBrandsByName: (query: string) => Promise<void>;
  // searchBrandByCategoryName: (name: string) => Promise<void>;
  searchBrandByCategoryId: (id: number) => Promise<void>;
  filterBrandsByStatus: (status: string) => Promise<void>;
  loading: boolean;
  selectedBrand: Brand | null;
  setSelectedBrand: React.Dispatch<React.SetStateAction<Brand | null>>;
  editDialogOpen: boolean;
  setEditDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const BrandContext = createContext<BrandContextType | undefined>(undefined);

export const BrandProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const fetchBrands = async () => {
    setLoading(true);
    try {
      const data = await getBrands();
      setBrands(data || []);
    } catch (error) {
      console.error("Error fetching brands:", error);
    } finally {
      setLoading(false);
    }
  };

  const createBrand = async (brand: Brand) => {
    await addBrand(brand);
    fetchBrands();
  };

  const editBrand = async (id: number, brand: Brand) => {
    await updateBrand(id, brand);
    fetchBrands();
  };

  const removeBrand = async (id: number) => {
    await deleteBrand(id);
    fetchBrands();
  };

  const searchBrandsByName = async (query: string) => {
    setLoading(true);
    try {
      const data = await searchBrandByName(query);
      setBrands(data || []);
    } catch (error) {
      console.error("Error searching brands:", error);
    } finally {
      setLoading(false);
    }
  };

 
  const searchBrandByCategoryId = async (id: number) => {
    setLoading(true);
    try {
      const data = await searchBrandByCategory_Id(id);
      setBrands(data || []);
    } catch (error) {
      console.error("Error searching brands:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterBrandsByStatus = async (status: string) => {
    setLoading(true);
    try {
      const data = await filterBrandByStatus(status);
      setBrands(data || []);
    } catch (error) {
      console.error("Error filtering brands:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  return (
    <BrandContext.Provider
      value={{
        brands,
        selectedBrand,
        setSelectedBrand,
        editDialogOpen,
        setEditDialogOpen,
        fetchBrands,
        createBrand,
        editBrand,
        removeBrand,
        searchBrandsByName,
        filterBrandsByStatus,
        searchBrandByCategoryId,  
        loading,
      }}
    >
      {children}
    </BrandContext.Provider>
  );
};

export const useBrandContext = () => {
  const context = useContext(BrandContext);
  if (!context) {
    throw new Error("useBrandContext must be used within a BrandProvider");
  }
  return context;
};
