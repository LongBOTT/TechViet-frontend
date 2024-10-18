//src/admin/components/Supplier/AddSupplierDialog.tsx
import React, { useState } from "react";
import CustomDialog from "../Util/CustomDialog";
import SupplierForm from "./SupplierForm";
import { Supplier } from "../../../types/supplier";
import { useSupplierContext } from "../../../context/SupplierContext";
import LoadingSnackbar from "../Util/LoadingSnackbar";
import { validateSupplier } from "../Util/validation/supplierValidation";
import { checkDuplicateEmail, checkDuplicatePhone, checkDuplicateSupplier } from "../../../api/supplierApi";

interface AddSupplierDialogProps {
  open: boolean;
  onClose: () => void;
}

const AddSupplierDialog: React.FC<AddSupplierDialogProps> = ({
  open,
  onClose,
}) => {
  const [supplierData, setSupplierData] = useState<Supplier>({
    id: 0,
    name: "",
    phone: "",
    email: "",
    address: "",
    status: "Đang giao dịch",
  });
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const { createSupplier } = useSupplierContext();
  const handleSave = async () => {
    // Kiểm tra dữ liệu nhà cung cấp trước khi gửi API
    const validationError = validateSupplier(supplierData);
    if (validationError) {
      setSnackbarMessage(validationError);
      setSnackbarOpen(true);
      return;
    }
    setLoading(true); // Bắt đầu loading
    try {
      const isDuplicate = await checkDuplicateSupplier(supplierData.name);
      if (isDuplicate) {
        setSnackbarMessage("Tên nhà cung cấp đã tồn tại.");
        setSnackbarOpen(true);
        setLoading(false);
        return;
      }
      const isDuplicateEmail = await checkDuplicateEmail(supplierData.email);
      if (isDuplicateEmail) {
        setSnackbarMessage("Email đã tồn tại.");
        setSnackbarOpen(true);
        setLoading(false);
        return;
      }
      const isDuplicatePhone = await checkDuplicatePhone(supplierData.phone);
      if (isDuplicatePhone) {
        setSnackbarMessage("Số điện thoại đã tồn tại.");
        setSnackbarOpen(true);
        setLoading(false);
        return;
      }
      await createSupplier(supplierData);
      setSnackbarMessage("Thêm nhà cung cấp thành công!");
    } catch (error) {
      setSnackbarMessage("Thêm nhà cung cấp thất bại!");
    } finally {
      // Đợi 1 giây trước khi dừng loading
      setTimeout(() => {
        setLoading(false);
        setSnackbarOpen(true);
      }, 1000);
    }
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <CustomDialog
      open={open}
      onClose={onClose}
      title="Thêm Nhà Cung Cấp"
      onSave={handleSave}
    >
      <>
        <SupplierForm data={supplierData} setData={setSupplierData} />
        <LoadingSnackbar
          loading={loading}
          snackbarOpen={snackbarOpen}
          snackbarMessage={snackbarMessage}
          onClose={handleSnackbarClose}
        />
      </>
    </CustomDialog>
  );
};

export default AddSupplierDialog;
