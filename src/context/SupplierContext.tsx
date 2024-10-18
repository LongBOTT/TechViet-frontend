// src/context/SupplierContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { Supplier } from "../types/supplier";
import {
  addSupplier,
  updateSupplier,
  deleteSupplier,
  getSuppliers,
  searchSupplierByName,
  filterSupplierByStatus,
} from "../api/supplierApi";

interface SupplierContextType {
  suppliers: Supplier[];
  fetchSuppliers: () => Promise<void>;
  createSupplier: (supplier: Supplier) => Promise<void>;
  editSupplier: (id: number, supplier: Supplier) => Promise<void>;
  removeSupplier: (id: number) => Promise<void>;
  searchSuppliersByName: (query: string) => Promise<void>;
  filterSuppliersByStatus: (status: string) => Promise<void>;
  loading: boolean;
  selectedSupplier: Supplier | null;
  setSelectedSupplier: React.Dispatch<React.SetStateAction<Supplier | null>>;
  editDialogOpen: boolean;
  setEditDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SupplierContext = createContext<SupplierContextType | undefined>(
  undefined
);

export const SupplierProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  

  const fetchSuppliers = async () => {
    setLoading(true);
    try {
      const data = await getSuppliers();
      setSuppliers(data || []);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    } finally {
      setLoading(false);
    }
  };

  const createSupplier = async (supplier: Supplier) => {
    await addSupplier(supplier);
    fetchSuppliers();
  };

  const editSupplier = async (id: number, supplier: Supplier) => {
    await updateSupplier(id, supplier);
    fetchSuppliers();
  };

  const removeSupplier = async (id: number) => {
    await deleteSupplier(id);
    fetchSuppliers();
  };

  const searchSuppliersByName = async (query: string) => {
    setLoading(true);
    try {
      const data = await searchSupplierByName(query);
      setSuppliers(data || []); // Cập nhật danh sách nhà cung cấp sau khi tìm kiếm
    } catch (error) {
      console.error("Error searching suppliers:", error);
    } finally {
      setLoading(false);
    }
  };
  const filterSuppliersByStatus = async (status: string) => {
    setLoading(true);
    try {
      const data = await filterSupplierByStatus(status);
      setSuppliers(data || []); // Cập nhật danh sách nhà cung cấp sau khi lọc
    } catch (error) {
      console.error("Error filtering suppliers:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSuppliers();
  }, []);

  return (
    <SupplierContext.Provider
      value={{
        suppliers,
        selectedSupplier,
        setSelectedSupplier,
        editDialogOpen,
        setEditDialogOpen,
        fetchSuppliers,
        createSupplier,
        editSupplier,
        removeSupplier,
        searchSuppliersByName,
        filterSuppliersByStatus,
        loading,
      }}
    >
      {children}
    </SupplierContext.Provider>
  );
};

export const useSupplierContext = () => {
  const context = useContext(SupplierContext);
  if (!context) {
    throw new Error(
      "useSupplierContext must be used within a SupplierProvider"
    );
  }
  return context;
};
