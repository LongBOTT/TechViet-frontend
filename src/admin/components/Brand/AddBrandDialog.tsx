import React, { useState } from "react";
import CustomDialog from "../Util/CustomDialog";
import EntityForm from "../Util/EntityForm"; // Dùng form tái sử dụng
import { Brand } from "../../../types/brand";
import { useBrandContext } from "../../../context/BrandContex";
import LoadingSnackbar from "../Util/LoadingSnackbar";
import { validateBrand } from "../Util/validation/brandValidation";
import { checkDuplicateBrand } from "../../../api/brandApi";

interface AddBrandDialogProps {
  open: boolean;
  onClose: () => void;
}

const AddBrandDialog: React.FC<AddBrandDialogProps> = ({
  open,
  onClose,
}) => {
  const [brandData, setBrandData] = useState<Brand>({
    id: 0,
    name: "", 
    status: "Đang hoạt động",
  });
  
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const { createBrand } = useBrandContext();

  const brandFields = [
    { label: "Tên thương hiệu", name: "name" },
  ];

  // Xử lý validate và tạo nhà cung cấp
  const handleSave = async () => {
    const validationError = validateBrand(brandData);
    if (validationError) {
      showSnackbar(validationError);
      return;
    }

    setLoading(true);
    try {
      if (await isDuplicateBrand(brandData)) return;
      await createBrand(brandData);
      showSnackbar("Thêm nhà cung cấp thành công!");
    } catch (error) {
      showSnackbar("Thêm nhà cung cấp thất bại!");
    } finally {
      setTimeout(() => setLoading(false), 1000);
    }
  };

  // Hàm kiểm tra các trường hợp trùng lặp
  const isDuplicateBrand = async (data: Brand) => {
    const duplicateCheckers = [
      { check: checkDuplicateBrand(data.name), message: "Tên thương hiệu đã tồn tại." },
  
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
      <EntityForm data={brandData} setData={setBrandData} fields={brandFields} />
      <LoadingSnackbar
        loading={loading}
        snackbarOpen={snackbarOpen}
        snackbarMessage={snackbarMessage}
        onClose={handleSnackbarClose}
      />
    </CustomDialog>
  );
};

export default AddBrandDialog;
