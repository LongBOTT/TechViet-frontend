import React, { useState } from 'react';
import CustomDialog from '../Util/CustomDialog';
import SupplierForm from './SupplierForm';
import { Supplier } from "../../../types/supplier";
import { addSupplier } from '../../../api/supplierApi';

interface AddSupplierDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: Supplier) => void; // Hàm callback sau khi lưu thành công, nhận dữ liệu nhà cung cấp
}

const AddSupplierDialog: React.FC<AddSupplierDialogProps> = ({
  open,
  onClose,
  onSave,
}) => {
  const [supplierData, setSupplierData] = useState<Supplier>({
    name: "",
    phone: "",
    email: "",
    address: "",
    status: "Đang giao dịch",
  });

  const handleSave = async () => {
    try {
      await addSupplier(supplierData); // Gọi API thêm nhà cung cấp
      onSave(supplierData); // Gọi hàm callback với dữ liệu nhà cung cấp sau khi lưu thành công
      onClose(); 
    } catch (error) {
      console.error("Lỗi khi thêm nhà cung cấp:", error);
    }
  };

  return (
    <CustomDialog
      open={open}
      onClose={onClose}
      title="Thêm Nhà Cung Cấp"
      onSave={handleSave}
    >
      <SupplierForm data={supplierData} setData={setSupplierData} />
    </CustomDialog>
  );
};

export default AddSupplierDialog;
