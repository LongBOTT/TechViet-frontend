import axios from 'axios';

const API_URL = 'http://localhost:8088/api/suppliers';

export interface Supplier {
  id?: string;
  supplierCode?: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  status: string;
}

export const getAllSuppliers = () => axios.get<Supplier[]>(API_URL);

export const addSupplier = (supplier: Supplier) => axios.post(API_URL, supplier);

export const updateSupplier = (id: string, supplier: Supplier) => axios.put(`${API_URL}/${id}`, supplier);

export const deleteSupplier = (id: string) => axios.delete(`${API_URL}/${id}`);
