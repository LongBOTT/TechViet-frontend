import React, { createContext, useContext, useEffect, useState } from "react";
import { Warranty } from "../types/warranty";
import {
  addWarranty,
  updateWarranty,
  deleteWarranty,
  getWarranties,
  searchWarrantyByName,
  filterWarrantyByDuration,
} from "../api/warrantyApi";

interface WarrantyContextType {
  warranties: Warranty[];
  fetchWarranties: () => Promise<void>;
  createWarranty: (warranty: Warranty) => Promise<void>;
  editWarranty: (id: number, warranty: Warranty) => Promise<void>;
  removeWarranty: (id: number) => Promise<void>;
  searchWarrantiesByName: (query: string) => Promise<void>;
  filterWarrantiesByDuration: (duration: number) => Promise<void>;
  loading: boolean;
  selectedWarranty: Warranty | null;
  setSelectedWarranty: React.Dispatch<React.SetStateAction<Warranty | null>>;
  editDialogOpen: boolean;
  setEditDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const WarrantyContext = createContext<WarrantyContextType | undefined>(undefined);

export const WarrantyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [warranties, setWarranties] = useState<Warranty[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedWarranty, setSelectedWarranty] = useState<Warranty | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const fetchWarranties = async () => {
    setLoading(true);
    try {
      const data = await getWarranties();
      setWarranties(data || []);
    } catch (error) {
      console.error("Error fetching warranties:", error);
    } finally {
      setLoading(false);
    }
  };

  const createWarranty = async (warranty: Warranty) => {
    await addWarranty(warranty);
    fetchWarranties();
  };

  const editWarranty = async (id: number, warranty: Warranty) => {
    await updateWarranty(id, warranty);
    fetchWarranties();
  };

  const removeWarranty = async (id: number) => {
    await deleteWarranty(id);
    fetchWarranties();
  };

  const searchWarrantiesByName = async (query: string) => {
    setLoading(true);
    try {
      const data = await searchWarrantyByName(query);
      setWarranties(data || []);
    } catch (error) {
      console.error("Error searching warranties:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterWarrantiesByDuration = async (duration: number) => {
    setLoading(true);
    try {
      const data = await filterWarrantyByDuration(duration);
      setWarranties(data || []);
    } catch (error) {
      console.error("Error filtering warranties:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWarranties();
  }, []);

  return (
    <WarrantyContext.Provider
      value={{
        warranties,
        selectedWarranty,
        setSelectedWarranty,
        editDialogOpen,
        setEditDialogOpen,
        fetchWarranties,
        createWarranty,
        editWarranty,
        removeWarranty,
        searchWarrantiesByName,
        filterWarrantiesByDuration,
        loading,
      }}
    >
      {children}
    </WarrantyContext.Provider>
  );
};

export const useWarrantyContext = () => {
  const context = useContext(WarrantyContext);
  if (!context) {
    throw new Error("useWarrantyContext must be used within a WarrantyProvider");
  }
  return context;
};
