import React, { useState } from "react";
import CustomDialog from "../Util/CustomDialog";
import EntityForm from "../Util/EntityForm"; // Dùng form tái sử dụng
import LoadingSnackbar from "../Util/LoadingSnackbar";
import { useCategoryContext } from "../../../context/CategoryContext";
import { Category } from "../../../types/category";
import { checkDuplicateCategory } from "../../../api/categoryApi";

interface AddCategoryDialogProps {
  open: boolean;
  onClose: () => void;
}

const AddCategoryDialog: React.FC<AddCategoryDialogProps> = ({
  open,
  onClose,
}) => {
  const [categoryData, setcategoryData] = useState<Category>({
    id: 0,
    name: "", 
    status: "Đang hoạt động",
  });
  
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const { createCategory } = useCategoryContext();

  
  const CategoryFields = [
    { label: "Tên thể loại", name: "name" },
  ];

  // Xử lý validate và tạo thể loại
  const handleSave = async () => {
    // const validationError = validateCategory(categoryData);
    // if (validationError) {
    //   showSnackbar(validationError);
    //   return;
    // }

    setLoading(true);
    try {
      if (await isDuplicateCategory(categoryData)) return;
      await createCategory(categoryData);
      showSnackbar("Thêm thể loại thành công!");
    } catch (error) {
      showSnackbar("Thêm thể loại thất bại!");
    } finally {
      setTimeout(() => setLoading(false), 1000);
    }
  };

  // Hàm kiểm tra các trường hợp trùng lặp
  const isDuplicateCategory = async (data: Category) => {
    const duplicateCheckers = [
      { check: checkDuplicateCategory(data.name), message: "Tên thể loại đã tồn tại." },
  
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
      title="Thêm thể loại"
      onSave={handleSave}
    >
      <EntityForm data={categoryData} setData={setcategoryData} fields={CategoryFields} />
      <LoadingSnackbar
        loading={loading}
        snackbarOpen={snackbarOpen}
        snackbarMessage={snackbarMessage}
        onClose={handleSnackbarClose}
      />
    </CustomDialog>
  );
};

export default AddCategoryDialog;
