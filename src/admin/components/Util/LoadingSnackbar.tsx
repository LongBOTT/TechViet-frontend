// src/components/Util/LoadingSnackbar.tsx
import React from "react";
import { Snackbar, Alert, CircularProgress } from "@mui/material";

interface LoadingSnackbarProps {
  loading: boolean;
  snackbarOpen: boolean;
  snackbarMessage: string;
  onClose: () => void;
}

const LoadingSnackbar: React.FC<LoadingSnackbarProps> = ({
  loading,
  snackbarOpen,
  snackbarMessage,
  onClose,
}) => {
  return (
    <>
      {loading && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "'rgba(0, 0, 0, 0.8)'",
            zIndex: 1000,
          }}
        >
          <CircularProgress />
          <span style={{ marginLeft: "8px" }}>Saving...</span>
        </div>
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000} // Tự động ẩn sau 3 giây
        onClose={onClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={onClose} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default LoadingSnackbar;
