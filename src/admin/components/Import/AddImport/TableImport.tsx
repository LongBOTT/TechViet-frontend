import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";

interface TableImportProps {
  entities: any[];
  loading: boolean;
  columns: Array<{ label: string; key: string; isImageColumn?: boolean }>;
  onRowClick?: (entity: any) => void;
}

const TableImport: React.FC<TableImportProps> = ({
  entities,
  loading,
  columns,
  onRowClick,
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <Box>
      <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
        <Table stickyHeader>
          <TableHead sx={{ backgroundColor: "rgb(244, 246, 248)" }}>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.key}
                  sx={{
                    textAlign: "center",
                    width: `${100 / columns.length}%`, // Đảm bảo mỗi cột có kích thước bằng nhau
                    flexGrow: 1,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  <CircularProgress />
                  <Typography variant="body2">Đang tải dữ liệu...</Typography>
                </TableCell>
              </TableRow>
            ) : entities.length > 0 ? (
              entities.map((entity) => (
                <TableRow
                  key={entity.id}
                  onClick={() => onRowClick && onRowClick(entity)}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#f0f0f0",
                      cursor: "pointer",
                    },
                  }}
                >
                  {columns.map((column) => (
                    <TableCell
                      key={column.key}
                      sx={{
                        textAlign: "center",
                        width: `${100 / columns.length}%`, // Đảm bảo mỗi cột có kích thước bằng nhau
                        flexGrow: 1,
                      }}
                    >
                      {column.isImageColumn ? (
                        <img
                          src={entity[column.key]}
                          alt={entity.name}
                          style={{ width: 40, height: 40, objectFit: "cover" }}
                        />
                      ) : (
                        entity[column.key]
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  <Typography variant="body2">
                    Không có dữ liệu để hiển thị.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TableImport;
