import React, { useEffect, useState } from "react";
import CustomDialog from "../Util/CustomDialog";
import SupplierForm from "./SupplierForm";
import { Supplier } from "../../../types/supplier";
import { useSupplierContext } from "../../../context/SupplierContext";
import LoadingSnackbar from "../Util/LoadingSnackbar"; // Import LoadingSnackbar
import { validateSupplier } from "../Util/validation/supplierValidation";
import {
  checkDuplicateEmail,
  checkDuplicatePhone,
  checkDuplicateSupplier,
} from "../../../api/supplierApi";

interface EditSupplierDialogProps {
  open: boolean;
  onClose: () => void;
}

const EditSupplierDialog: React.FC<EditSupplierDialogProps> = ({
  open,
  onClose,
}) => {
  const { selectedSupplier, editSupplier } = useSupplierContext();
  const [supplierData, setSupplierData] = useState<Supplier | null>(null);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    if (selectedSupplier) {
      setSupplierData(selectedSupplier);
    }
  }, [selectedSupplier]);

  const handleSave = async () => {
    if (supplierData) {
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
        await editSupplier(supplierData.id, supplierData);
        setSnackbarMessage("Cập nhật nhà cung cấp thành công!");
      } catch (error) {
        setSnackbarMessage("Cập nhật nhà cung cấp thất bại!");
      } finally {
        // Đợi 1 giây trước khi dừng loading
        setTimeout(() => {
          setLoading(false);
          setSnackbarOpen(true);
        }, 1000);
      }
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <CustomDialog
        open={open}
        onClose={onClose}
        title="Chi tiết Nhà Cung Cấp"
        onSave={handleSave}
      >
        {supplierData && (
          <>
            <SupplierForm data={supplierData} setData={setSupplierData} />
            <LoadingSnackbar
              loading={loading}
              snackbarOpen={snackbarOpen}
              snackbarMessage={snackbarMessage}
              onClose={handleSnackbarClose}
            />
          </>
        )}
      </CustomDialog>
    </>
  );
};

export default EditSupplierDialog;
