import React, { useEffect, useState } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@mui/material";
import { Variant } from "../../types/variant";
import { Variant_Attribute } from "../../types/variant_attribute";
import { searchVariant_AttributeByVariant } from "../../api/variant_attributeApi";
import { searchVariantByProduct } from "../../api/variantApi";
import { forEach } from "lodash";

interface Specifications {
  general: {
    origin: string;
    launchDate: string;
    warranty: string;
  };
  design: {
    dimensions: string;
    weight: string;
    waterResistance?: string;
  };
  processor: {
    cpu: string;
  };
  display: {
    size: string;
    type: string;
    resolution: string;
  };
  battery: {
    capacity: string;
  };
  os: string;
}

interface SpecificationsTableProps {
  variant?: Variant;
}

const SpecificationsTable: React.FC<SpecificationsTableProps> = ({
 variant
}) => {
  const [isSpecificationsExpanded, setIsSpecificationsExpanded] =
    useState(false);
  const [attributes, setAttributes] = useState<Variant_Attribute[]>([]);
 useEffect(() => {
   const fetchAttributeData = async () => {
     try {
       if (variant) {
         // Fetch and sort variants
        //  const variantList = await searchVariantByProduct(variant.products.id);
        //  variantList?.sort((a, b) => a.id - b.id);

        //  if (variantList) {
           let attributeList: Variant_Attribute[] = [];
          //  if (variant.id === variantList[0]?.id) {
          //    // If selected variant is the first, fetch attributes directly
          //    attributeList =
          //      (await searchVariant_AttributeByVariant(variant.id)) ?? [];
          //  } else {
          //    // Fetch attributes of the first variant
          //    attributeList =
          //      (await searchVariant_AttributeByVariant(variantList[0].id)) ??
          //      [];
          //    // Fetch and append attributes of the selected variant
          //    const selectedAttributes = await searchVariant_AttributeByVariant(
          //      variant.id
          //    );
          //    attributeList = [
          //      ...attributeList.filter(
          //        (attr) =>
          //          !(selectedAttributes ?? []).some(
          //            (selAttr) => selAttr.attribute.id === attr.attribute.id
          //          )
          //      ),
          //      ...(selectedAttributes ?? []),
          //    ];
          //    // Kiểm tra nếu phần tử có cùng attribbute_id thì lấy của selectedAttributes
          //  }

          attributeList =
            (await searchVariant_AttributeByVariant(variant.id)) ?? [];
           // Filter out the "Màu sắc" attribute
          //  attributeList = attributeList.filter(
          //    (attr) => attr.attribute.name !== "Màu sắc"
          //  );
           attributeList.sort((a, b) => a.attribute.id - b.attribute.id);
           // Set final attribute list
           setAttributes(attributeList ?? []);
           console.log(attributeList);
         }
         // Check if the current variant is the first in the sorted list
      //  }
     } catch (error) {
       console.error("Failed to fetch attribute data:", error);
     }
   };

   fetchAttributeData();
}, [variant]);

const renderData = () => {
  const parentAttributes = [
    ...new Set(attributes.map((attribute) => attribute.attribute.parent)),
  ].filter((parent) => parent !== undefined);

  // Determine maximum number of rows to display
  const maxRows = isSpecificationsExpanded ? parentAttributes.length : 3;
  const displayedAttributes = parentAttributes.slice(0, maxRows);

  return (
    <>
      {displayedAttributes.map((parent) => (
        <React.Fragment key={`parent-${parent}`}>
          <TableRow>
            <TableCell
              colSpan={2}
              variant={"head"}
              style={{ fontWeight: "bold", fontSize: "20px" }}
            >
              {parent}
            </TableCell>
          </TableRow>
          {attributes
            .filter((attribute) => attribute.attribute.parent === parent)
            .map((attribute) => (
              <TableRow
                key={`attribute-${parent}-${attribute.attribute.name}-${attribute.value}`}
              >
                <TableCell style={{ width: "50%" }}>
                  {attribute.attribute.name}
                </TableCell>
                <TableCell style={{ width: "50%" }}>
                  {attribute.value}
                </TableCell>
              </TableRow>
            ))}
        </React.Fragment>
      ))}
      {parentAttributes.length > 3 && (
        <TableRow>
          <TableCell colSpan={2} align="center">
            <Button
              variant="text"
              color="primary"
              onClick={() =>
                setIsSpecificationsExpanded(!isSpecificationsExpanded)
              }
              sx={{ mt: 1 }}
            >
              {isSpecificationsExpanded ? "Rút gọn" : "Xem thêm"}
            </Button>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};




return (
    <div>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Thông số kỹ thuật
      </Typography>
      <Table size="small" >
        <TableBody >
         {renderData()}
        </TableBody>
      </Table>
    </div>
  );
};

export default SpecificationsTable;
