import React, { useEffect, useState } from "react";
import CustomDialog from "../Util/CustomDialog";
import EntityForm from "../Util/EntityForm"; 
import LoadingSnackbar from "../Util/LoadingSnackbar";
import { validateBrand } from "../Util/validation/brandValidation";
import { checkDuplicateBrand, updateBrand } from "../../../api/brandApi";
import { Brand } from "../../../types/brand";
import { useBrandContext } from "../../../context/BrandContex";

interface EditSupplierDialogProps {
  open: boolean;
  onClose: () => void;
}

const EditSupplierDialog: React.FC<EditSupplierDialogProps> = ({ open, onClose }) => {
  const { selectedBrand, editBrand } = useBrandContext();
  const [brandData, setBrandData] = useState<Brand | null>(null);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Cập nhật dữ liệu khi nhà cung cấp được chọn thay đổi
  useEffect(() => {
    if (selectedBrand) {
      setBrandData(selectedBrand);
    }
  }, [selectedBrand]);

  // Hàm hiển thị thông báo lỗi
  const showSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const isDuplicateBrand = async (data: Brand) => {
    const duplicateCheckers = [
      {
        check: checkDuplicateBrand(data.name),
        message: "Tên thương hiệu đã tồn tại.",
        field: "name",
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
    if (brandData) {
      const validationError = validateBrand(brandData);
      if (validationError) {
        showSnackbar(validationError);
        return;
      }

      setLoading(true);
      try {
        if (await isDuplicateBrand(brandData)) return;
        await updateBrand(brandData.id, brandData);
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
  const brandFields = [
    { label: "Tên thương hiệu", name: "name" },
   
  ];

  return (
    <CustomDialog open={open} onClose={onClose} title="Thương hiệu" onSave={handleSave}>
      {brandData && (
        <>
          <EntityForm data={brandData} setData={setBrandData} fields={brandFields} />
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
