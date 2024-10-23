import React, { useState } from "react";
import CustomDialog from "../Util/CustomDialog";
import EntityForm from "../Util/EntityForm"; // Dùng form tái sử dụng
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

  const supplierFields = [
    { label: "Tên nhà cung cấp", name: "name" },
    { label: "Số điện thoại", name: "phone" },
    { label: "Email", name: "email" },
    { label: "Địa chỉ", name: "address" },
    {
      label: "Trạng thái",
      name: "status",
      type: "select",
      options: [
        { value: "Đang giao dịch", label: "Đang giao dịch" },
        { value: "Ngưng giao dịch", label: "Ngưng giao dịch" },
      ],
    },
  ];

  // Xử lý validate và tạo nhà cung cấp
  const handleSave = async () => {
    const validationError = validateSupplier(supplierData);
    if (validationError) {
      showSnackbar(validationError);
      return;
    }

    setLoading(true);
    try {
      if (await isDuplicateSupplier(supplierData)) return;
      
      await createSupplier(supplierData);
      showSnackbar("Thêm nhà cung cấp thành công!");
    } catch (error) {
      showSnackbar("Thêm nhà cung cấp thất bại!");
    } finally {
      setTimeout(() => setLoading(false), 1000);
    }
  };

  // Hàm kiểm tra các trường hợp trùng lặp
  const isDuplicateSupplier = async (data: Supplier) => {
    const duplicateCheckers = [
      { check: checkDuplicateSupplier(data.name), message: "Tên nhà cung cấp đã tồn tại." },
      { check: checkDuplicateEmail(data.email), message: "Email đã tồn tại." },
      { check: checkDuplicatePhone(data.phone), message: "Số điện thoại đã tồn tại." },
    ];

    for (const checker of duplicateCheckers) {
      if (await checker.check) {
        showSnackbar(checker.message);
        setLoading(false);
        return true;
      }
    }
    return false;
  };

  // Hiển thị Snackbar
  const showSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => setSnackbarOpen(false);

  return (
    <CustomDialog
      open={open}
      onClose={onClose}
      title="Thêm Nhà Cung Cấp"
      onSave={handleSave}
    >
      <EntityForm data={supplierData} setData={setSupplierData} fields={supplierFields} />
      <LoadingSnackbar
        loading={loading}
        snackbarOpen={snackbarOpen}
        snackbarMessage={snackbarMessage}
        onClose={handleSnackbarClose}
      />
    </CustomDialog>
  );
};

export default AddSupplierDialog;
