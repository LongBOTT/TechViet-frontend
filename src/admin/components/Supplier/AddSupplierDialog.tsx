import React, { useState } from 'react';
import CustomDialog from '../Util/CustomDialog';
import SupplierForm from './SupplierForm';

interface SupplierDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: any) => void; // Hàm xử lý lưu dữ liệu
}

const SupplierDialog: React.FC<SupplierDialogProps> = ({ open, onClose, onSave }) => {
  const [supplierData, setSupplierData] = useState({}); // Dữ liệu nhà cung cấp

  const handleSave = () => {
    onSave(supplierData);  // Gọi hàm onSave để lưu dữ liệu
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

export default SupplierDialog;
