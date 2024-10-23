import React, { useEffect, useState } from "react";
import CustomDialog from "../Util/CustomDialog";
import EntityForm from "../Util/EntityForm"; 
import { useSupplierContext } from "../../../context/SupplierContext";
import LoadingSnackbar from "../Util/LoadingSnackbar";
import { validateSupplier } from "../Util/validation/supplierValidation";
import { checkDuplicateEmail, checkDuplicatePhone, checkDuplicateSupplier } from "../../../api/supplierApi";
import { Supplier } from "../../../types/supplier";

interface EditSupplierDialogProps {
  open: boolean;
  onClose: () => void;
}

const EditSupplierDialog: React.FC<EditSupplierDialogProps> = ({ open, onClose }) => {
  const { selectedSupplier, editSupplier } = useSupplierContext();
  const [supplierData, setSupplierData] = useState<Supplier | null>(null);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Cập nhật dữ liệu khi nhà cung cấp được chọn thay đổi
  useEffect(() => {
    if (selectedSupplier) {
      setSupplierData(selectedSupplier);
    }
  }, [selectedSupplier]);

  // Hàm hiển thị thông báo lỗi
  const showSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const isDuplicateSupplier = async (data: Supplier) => {
    const duplicateCheckers = [
      {
        check: checkDuplicateSupplier(data.name),
        message: "Tên nhà cung cấp đã tồn tại.",
        field: "name",
      },
      {
        check: checkDuplicateEmail(data.email),
        message: "Email đã tồn tại.",
        field: "email",
      },
      {
        check: checkDuplicatePhone(data.phone),
        message: "Số điện thoại đã tồn tại.",
        field: "phone",
      },
    ];
  
    for (const checker of duplicateCheckers) {
      const result = await checker.check;
      if (result && result.id !== data.id) {
        // Nếu ID của nhà cung cấp trùng lặp không giống với ID của nhà cung cấp hiện tại
        showSnackbar(checker.message);
        setLoading(false);
        return true;
      }
    }
    return false;
  };
  

  // Lưu dữ liệu sau khi kiểm tra trùng lặp và validate
  const handleSave = async () => {
    if (supplierData) {
      const validationError = validateSupplier(supplierData);
      if (validationError) {
        showSnackbar(validationError);
        return;
      }

      setLoading(true);
      try {
        if (await isDuplicateSupplier(supplierData)) return;

        await editSupplier(supplierData.id, supplierData);
        showSnackbar("Cập nhật nhà cung cấp thành công!");
      } catch (error) {
        showSnackbar("Cập nhật nhà cung cấp thất bại!");
      } finally {
        setTimeout(() => setLoading(false), 1000);
      }
    }
  };

  const handleSnackbarClose = () => setSnackbarOpen(false);

  // Cấu trúc form cho các trường nhập liệu
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

  return (
    <CustomDialog open={open} onClose={onClose} title="Chi tiết Nhà Cung Cấp" onSave={handleSave}>
      {supplierData && (
        <>
          <EntityForm data={supplierData} setData={setSupplierData} fields={supplierFields} />
          <LoadingSnackbar
            loading={loading}
            snackbarOpen={snackbarOpen}
            snackbarMessage={snackbarMessage}
            onClose={handleSnackbarClose}
          />
        </>
      )}
    </CustomDialog>
  );
};

export default EditSupplierDialog;
