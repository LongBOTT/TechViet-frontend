import React, { useState } from "react";
import CustomDialog from "../Util/CustomDialog";
import EntityForm from "../Util/EntityForm"; // Dùng form tái sử dụng
import { Warranty } from "../../../types/warranty";
import LoadingSnackbar from "../Util/LoadingSnackbar";

import { addWarranty } from "../../../api/warrantyApi";

interface AddWarrantyPolicyDialogProps {
  open: boolean;
  onClose: () => void;
}

const AddWarrantyPolicyDialog: React.FC<AddWarrantyPolicyDialogProps> = ({
  open,
  onClose,
}) => {
  const [warrantyData, setWarrantyData] = useState<Warranty>({
    id: 0,
    name: "",
    value: 0,
    unit: "",
    note: "",
  });
  
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const warrantyFields = [
    { label: "Tên chính sách", name: "name" },
    { label: "Thời gian", name: "value" },
    { label: "Đơn vị", name: "unit" },
    { label: "Ghi chú", name: "note" },
  ];

  // Xử lý validate và tạo nhà cung cấp
  const handleSave = async () => {
   
    setLoading(true);
    try {
      await addWarranty(warrantyData);
      showSnackbar("Thêm chính sách bảo hành thành công!");
    } catch (error) {
      showSnackbar("Thêm chính sách bảo hành thất bại!");
    } finally {
      setTimeout(() => setLoading(false), 1000);
    }
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
      title="Thêm chính sách bảo hành"
      onSave={handleSave}
    >
      <EntityForm data={warrantyData} setData={setWarrantyData} fields={warrantyFields} />
      <LoadingSnackbar
        loading={loading}
        snackbarOpen={snackbarOpen}
        snackbarMessage={snackbarMessage}
        onClose={handleSnackbarClose}
      />
    </CustomDialog>
  );
};

export default AddWarrantyPolicyDialog;
