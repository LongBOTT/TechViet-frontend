import React, { createContext, useContext, useEffect, useState } from "react";
import { Customer } from "../types/customer";
import {
  addCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomers,
  searchCustomerByName,
  filterCustomerByCity,
} from "../api/customerApi";

interface CustomerContextType {
  customers: Customer[];
  fetchCustomers: () => Promise<void>;
  createCustomer: (customer: Customer) => Promise<void>;
  editCustomer: (id: number, customer: Customer) => Promise<void>;
  removeCustomer: (id: number) => Promise<void>;
  searchCustomersByName: (query: string) => Promise<void>;
  filterCustomersByCity: (city: string) => Promise<void>;
  loading: boolean;
  selectedCustomer: Customer | null;
  setSelectedCustomer: React.Dispatch<React.SetStateAction<Customer | null>>;
  editDialogOpen: boolean;
  setEditDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

export const CustomerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const data = await getCustomers();
      setCustomers(data || []);
    } catch (error) {
      console.error("Error fetching customers:", error);
    } finally {
      setLoading(false);
    }
  };

  const createCustomer = async (customer: Customer) => {
    await addCustomer(customer);
    fetchCustomers();
  };

  const editCustomer = async (id: number, customer: Customer) => {
    await updateCustomer(id, customer);
    fetchCustomers();
  };

  const removeCustomer = async (id: number) => {
    await deleteCustomer(id);
    fetchCustomers();
  };

  const searchCustomersByName = async (query: string) => {
    setLoading(true);
    try {
      const data = await searchCustomerByName(query);
      setCustomers(data || []);
    } catch (error) {
      console.error("Error searching customers:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterCustomersByCity = async (city: string) => {
    setLoading(true);
    try {
      const data = await filterCustomerByCity(city);
      setCustomers(data || []);
    } catch (error) {
      console.error("Error filtering customers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <CustomerContext.Provider
      value={{
        customers,
        selectedCustomer,
        setSelectedCustomer,
        editDialogOpen,
        setEditDialogOpen,
        fetchCustomers,
        createCustomer,
        editCustomer,
        removeCustomer,
        searchCustomersByName,
        filterCustomersByCity,
        loading,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomerContext = () => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error("useCustomerContext must be used within a CustomerProvider");
  }
  return context;
};
