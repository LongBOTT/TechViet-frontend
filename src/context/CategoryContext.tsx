// src/context/CategoryContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { Category } from "../types/category";
import {
  addCategory,
  updateCategory,
  deleteCategory,
  getCategories,
  searchCategoryByName,
  filterCategoryByStatus,
} from "../api/categoryApi";

interface CategoryContextType {
  categories: Category[];
  fetchCategories: () => Promise<void>;
  createCategory: (category: Category) => Promise<void>;
  editCategory: (id: number, category: Category) => Promise<void>;
  removeCategory: (id: number) => Promise<void>;
  searchCategoriesByName: (query: string) => Promise<void>;
  filterCategoriesByStatus: (status: string) => Promise<void>;
  loading: boolean;
  selectedCategory: Category | null;
  setSelectedCategory: React.Dispatch<React.SetStateAction<Category | null>>;
  editDialogOpen: boolean;
  setEditDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CategoryContext = createContext<CategoryContextType | undefined>(
  undefined
);

export const CategoryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await getCategories();
      setCategories(data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const createCategory = async (category: Category) => {
    await addCategory(category);
    fetchCategories();
  };

  const editCategory = async (id: number, category: Category) => {
    await updateCategory(id, category);
    fetchCategories();
  };

  const removeCategory = async (id: number) => {
    await deleteCategory(id);
    fetchCategories();
  };

  const searchCategoriesByName = async (query: string) => {
    setLoading(true);
    try {
      const data = await searchCategoryByName(query);
      setCategories(data || []); 
    } catch (error) {
      console.error("Error searching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterCategoriesByStatus = async (status: string) => {
    setLoading(true);
    try {
      const data = await filterCategoryByStatus(status);
      setCategories(data || []);
    } catch (error) {
      console.error("Error filtering categories:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider
      value={{
        categories,
        selectedCategory,
        setSelectedCategory,
        editDialogOpen,
        setEditDialogOpen,
        fetchCategories,
        createCategory,
        editCategory,
        removeCategory,
        searchCategoriesByName,
        filterCategoriesByStatus,
        loading,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategoryContext = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error(
      "useCategoryContext must be used within a CategoryProvider"
    );
  }
  return context;
};
