import React, { useEffect, useState } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Paper,
} from "@mui/material";
import { Variant } from "../../types/variant";
import { Variant_Attribute } from "../../types/variant_attribute";
import { searchVariant_AttributeByVariant } from "../../api/variant_attributeApi";

interface SpecificationsTableProps {
  variants: Variant[];
}

const CompareSpecificationsTable: React.FC<SpecificationsTableProps> = ({
  variants,
}) => {
  const [attributesList, setAttributesList] = useState<Variant_Attribute[][]>(
    []
  );

  useEffect(() => {
    const fetchAttributes = async () => {
      const allAttributes = await Promise.all(
        variants.map(async (variant) => {
          const attributes = await searchVariant_AttributeByVariant(variant.id);
          return attributes ?? [];
        })
      );
      setAttributesList(allAttributes);
    };

    fetchAttributes();
  }, [variants]);

  // Tìm các `parent` duy nhất để tạo nhóm hàng
  const parentAttributes = [
    ...new Set(
      attributesList
        .flat()
        .map((attribute) => attribute.attribute.parent)
        .filter((parent) => parent !== undefined)
    ),
  ];

  return (
    <Paper elevation={3} sx={{ p: 3, margin: "50px" }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        So sánh thông số kỹ thuật
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: "bold", width: "200px" }}>
              Thông số
            </TableCell>
            {variants.map((variant, index) => (
              <TableCell
                key={index}
                style={{ fontWeight: "bold", textAlign: "center" }}
              >
                {variant.name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Hàng chứa hình ảnh và tên sản phẩm */}
          <TableRow>
            <TableCell style={{ fontWeight: "bold" }}>
              Hình ảnh & Tên sản phẩm
            </TableCell>
            {variants.map((variant, index) => (
              <TableCell key={index} align="center">
                <img
                  src={variant.products.image}
                  alt={variant.products.name}
                  style={{
                    width: "100px",
                    height: "auto",
                    marginBottom: "10px",
                  }}
                />
                <Typography variant="body1" fontWeight="bold">
                  {variant.products.name}
                </Typography>
              </TableCell>
            ))}
          </TableRow>

          {/* Hiển thị các thuộc tính */}
          {parentAttributes.map((parent) => (
            <React.Fragment key={`parent-${parent}`}>
              <TableRow>
                <TableCell
                  colSpan={variants.length + 1}
                  style={{ backgroundColor: "#f5f5f5" }}
                >
                  <Typography variant="body1" fontWeight="bold">
                    {parent}
                  </Typography>
                </TableCell>
              </TableRow>
              {attributesList[0]
                .filter((attribute) => attribute.attribute.parent === parent)
                .map((attribute) => (
                  <TableRow key={`attribute-${attribute.attribute.name}`}>
                    <TableCell>{attribute.attribute.name}</TableCell>
                    {attributesList.map((attributes, index) => {
                      const value =
                        attributes.find(
                          (attr) =>
                            attr.attribute.name === attribute.attribute.name
                        )?.value ?? "-";
                      return (
                        <TableCell key={`value-${index}`} align="center">
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default CompareSpecificationsTable;
