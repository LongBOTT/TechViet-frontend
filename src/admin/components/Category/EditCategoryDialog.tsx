import React, { useEffect, useState } from "react";
import CustomDialog from "../Util/CustomDialog";
import EntityForm from "../Util/EntityForm";
import LoadingSnackbar from "../Util/LoadingSnackbar";
import  validateCategory from "../Util/validation/categoryValidation";
import { checkDuplicateCategory } from "../../../api/categoryApi";
import { Category } from "../../../types/category";
import { useCategoryContext } from "../../../context/CategoryContext";

interface editCategoryDialogProps {
  open: boolean;
  onClose: () => void;
}

const editCategoryDialog: React.FC<editCategoryDialogProps> = ({
  open,
  onClose,
}) => {
  const { selectedCategory, editCategory } = useCategoryContext();
  const [categoryData, setCategoryData] = useState<Category | null>(null);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Cập nhật dữ liệu khi thể loại được chọn thay đổi
  useEffect(() => {
    if (selectedCategory) {
      setCategoryData(selectedCategory);
    }
  }, [selectedCategory]);

  // Hàm hiển thị thông báo lỗi
  const showSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const isDuplicateCategory = async (data: Category) => {
    const duplicateCheckers = [
      {
        check: checkDuplicateCategory(data.name),
        message: "Tên thể loại đã tồn tại.",
        field: "name",
      },
    ];

    for (const checker of duplicateCheckers) {
      const result = await checker.check;
      if (result && result.id !== data.id) {
        // Nếu ID của thể loại trùng lặp không giống với ID của thể loại hiện tại
        showSnackbar(checker.message);
        setLoading(false);
        return true;
      }
    }
    return false;
  };

  // Lưu dữ liệu sau khi kiểm tra trùng lặp và validate
  const handleSave = async () => {
    if (categoryData) {
      const validationError = validateCategory(categoryData);
      if (validationError) {
        showSnackbar(validationError);
        return;
      }

      setLoading(true);
      try {
        if (await isDuplicateCategory(categoryData)) return;
        await editCategory(categoryData.id, categoryData);
        showSnackbar("Cập nhật thể loại thành công!");
      } catch (error) {
        showSnackbar("Cập nhật thể loại thất bại!");
      } finally {
        setTimeout(() => setLoading(false), 1000);
      }
    }
  };

  const handleSnackbarClose = () => setSnackbarOpen(false);

  // Cấu trúc form cho các trường nhập liệu
  const categoryFields = [{ label: "Tên thể loại", name: "name" }];

  return (
    <CustomDialog
      open={open}
      onClose={onClose}
      title="Thể loại"
      onSave={handleSave}
    >
      {categoryData && (
        <>
          <EntityForm
            data={categoryData}
            setData={setCategoryData}
            fields={categoryFields}
          />
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

export default editCategoryDialog;
