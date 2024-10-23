import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Pagination,
  CircularProgress,
  Typography,
} from "@mui/material";

interface EntityTableProps {
  entities: any[];
  loading: boolean;
  columns: Array<{ label: string; key: string }>;
  onRowClick: (entity: any) => void;
}

const EntityTable: React.FC<EntityTableProps> = ({
  entities,
  loading,
  columns,
  onRowClick,
}) => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 12;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const paginatedEntities = entities.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.key}>{column.label}</TableCell>
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
            ) : paginatedEntities.length > 0 ? (
              paginatedEntities.map((entity) => (
                <TableRow
                  key={entity.id}
                  onClick={() => onRowClick(entity)}
                  sx={{
                    '&:hover': {
                      backgroundColor: '#f0f0f0',
                      cursor: 'pointer',
                    },
                  }}
                >
                  {columns.map((column) => (
                    <TableCell key={column.key}>{entity[column.key]}</TableCell>
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
        <Box sx={{ display: "flex", justifyContent: "center", margin: 2 }}>
          <Pagination
            count={Math.ceil(entities.length / rowsPerPage)}
            page={page}
            onChange={handleChangePage}
            color="primary"
          />
        </Box>
      </TableContainer>
    </Box>
  );
};

export default EntityTable;
