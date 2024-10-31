// // src/components/Variant.tsx

// import React, { useEffect, useState, useCallback } from "react";
// import {
//   Box,
//   Typography,
//   Switch,
//   IconButton,
//   TextField,
//   Divider,
//   Chip,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
// } from "@mui/material";
// import FilterDropdown from "../Util/FilterDropdown";
// import { category_attribute } from "../../../types/category_attribute";
// import { getCategoryAttributesByCategoryId } from "../../../api/category_attributeApi";
// import AddIcon from "@mui/icons-material/Add";
// import DeleteIcon from "@mui/icons-material/Delete";
// import UploadFileIcon from "@mui/icons-material/UploadFile";

// interface AttributeValues {
//   [key: string]: string[];
// }

// interface VariantData {
//   name: string;
//   image?: File | null;
//   quantity: number;
//   price: number;
//   minStock: number;
//   costPrice: number;
// }

// interface VariantProps {
//   categoryId: number | null; // Nhận categoryId từ bên ngoài
//   productName: string; // Tên sản phẩm để lấy tên viết tắt
// }

// const Variant: React.FC<VariantProps> = ({ categoryId, productName }) => {
//   const [isVariantsVisible, setIsVariantsVisible] = useState<boolean>(true);
//   const [attributesData, setAttributesData] = useState<category_attribute[]>([]);
//   const [selectedAttributes, setSelectedAttributes] = useState<category_attribute[]>([]);
//   const [selectedAttributeId, setSelectedAttributeId] = useState<string | null>(null);
//   const [resetFilter, setResetFilter] = useState<boolean>(false);
//   const [attributeValues, setAttributeValues] = useState<AttributeValues>({});
//   const [variants, setVariants] = useState<VariantData[]>([]);

//   // Lấy danh sách thuộc tính khi `categoryId` thay đổi
//   useEffect(() => {
//     if (categoryId !== null) {
//       const fetchAttributes = async () => {
//         const data = await getCategoryAttributesByCategoryId(categoryId);

//         // Kiểm tra các điều kiện dựa vào categoryId
//         const relevantAttributes = data?.filter(attr => {
//           const attrId = attr.attribute.id;
//           return categoryId === 1
//             ? [3, 24].includes(attrId) // Nếu categoryId là 1, chỉ lấy các thuộc tính có mã là 3 (màu sắc) và 24 (dung lượng)
//             : attrId === 3; // Nếu categoryId khác 1, chỉ lấy thuộc tính có mã là 3 (màu sắc)
//         }) || [];

//         setAttributesData(relevantAttributes);
//       };
//       fetchAttributes();
//     }
//   }, [categoryId]);

//   // Cập nhật danh sách phiên bản khi `attributeValues` thay đổi
//   useEffect(() => {
//     const updateVariants = () => {
//       const attributeKeys = Object.keys(attributeValues);
//       if (attributeKeys.length === 0) {
//         setVariants([]);
//         return;
//       }

//       const combinations = attributeKeys.reduce<string[][]>((acc, key) => {
//         const values = attributeValues[key];
//         if (acc.length === 0) {
//           return values.map((v) => [v]);
//         }
//         return acc.flatMap((combination) =>
//           values.map((v) => [...combination, v])
//         );
//       }, []);

//       // Lấy tên viết tắt của sản phẩm từ productName
//       const productPrefix = productName
//         ? productName.slice(0, 3).toUpperCase()
//         : "PRD";
//       const newVariants = combinations.map((combination) => ({
//         name: `${productPrefix}-${combination.join("-")}`,
//         image: null,
//         quantity: 0,
//         price: 0,
//         minStock: 0,
//         costPrice: 0,
//       }));

//       setVariants(newVariants);
//     };

//     updateVariants();
//   }, [attributeValues, productName]);

//   const handleToggleContentVisibility = useCallback(() => {
//     setIsVariantsVisible((prev) => !prev);
//   }, []);

//   const AttributeOptions = attributesData
//     .filter(attr => !selectedAttributes.some(selected => selected.attribute.id === attr.attribute.id))
//     .map(attr => ({
//       value: attr.attribute.id.toString(),
//       label: attr.attribute.name,
//     }));

//   const handleAttributeSelect = useCallback(
//     (attributeId: string) => {
//       const selected = attributesData.find(attr => attr.attribute.id.toString() === attributeId);
//       if (selected && !selectedAttributes.includes(selected)) {
//         setSelectedAttributes([...selectedAttributes, selected]);
//         setAttributeValues((prevValues) => ({
//           ...prevValues,
//           [attributeId]: [],
//         }));
//       }
//       setSelectedAttributeId(attributeId);
//       setResetFilter(true);
//     },
//     [attributesData, selectedAttributes]
//   );

//   useEffect(() => {
//     if (resetFilter) {
//       setSelectedAttributeId(null);
//       setResetFilter(false);
//     }
//   }, [resetFilter]);

//   const handleAddValue = useCallback((attributeId: string, value: string) => {
//     if (value.trim()) {
//       setAttributeValues((prevValues) => ({
//         ...prevValues,
//         [attributeId]: [...(prevValues[attributeId] || []), value.trim()],
//       }));
//     }
//   }, []);

//   const handleDeleteValue = useCallback(
//     (attributeId: string, valueToDelete: string) => {
//       setAttributeValues((prevValues) => ({
//         ...prevValues,
//         [attributeId]: prevValues[attributeId].filter(val => val !== valueToDelete),
//       }));
//     },
//     []
//   );

//   const handleKeyDown = useCallback(
//     (event: React.KeyboardEvent, attributeId: string) => {
//       if (event.key === "Enter") {
//         event.preventDefault();
//         const target = event.target as HTMLInputElement;
//         handleAddValue(attributeId, target.value);
//         target.value = "";
//       }
//     },
//     [handleAddValue]
//   );

//   const handleImageChange = (index: number, file: File | null) => {
//     setVariants((prev) =>
//       prev.map((v, i) => (i === index ? { ...v, image: file } : v))
//     );
//   };

//   const handleRemoveAttribute = useCallback((attributeId: number) => {
//     setSelectedAttributes((prev) =>
//       prev.filter((attr) => attr.attribute.id !== attributeId)
//     );
//     setAttributeValues((prevValues) => {
//       const updatedValues = { ...prevValues };
//       delete updatedValues[attributeId.toString()];
//       return updatedValues;
//     });
//   }, []);

//   const handleRemoveVariant = (index: number) => {
//     setVariants((prevVariants) => prevVariants.filter((_, i) => i !== index));
//   };

//   return (
//     <Box
//       sx={{
//         bgcolor: "rgb(255, 255, 255)",
//         boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
//         borderRadius: "5px",
//         padding: "20px",
//         width: "100%",
//         margin: "20px auto",
//       }}
//     >
//       <Box sx={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
//         <Typography sx={{ fontFamily: "Roboto", fontWeight: "bold", marginRight: "8px" }}>
//           Phiên bản
//         </Typography>
//         <Switch
//           checked={isVariantsVisible}
//           onChange={handleToggleContentVisibility}
//           color="primary"
//         />
//       </Box>

//       {isVariantsVisible && (
//         <Box
//           sx={{
//             padding: "20px",
//             border: "1px solid #ddd",
//             borderRadius: "5px",
//             backgroundColor: "#f9f9f9",
//           }}
//         >
//           <Box sx={{ display: "flex", alignItems: "center", gap: 1, width: "100%", marginBottom: 2 }}>
//             <FilterDropdown
//               label="Chọn thuộc tính"
//               options={AttributeOptions}
//               onFilterChange={handleAttributeSelect}
//               resetFilter={resetFilter}
//               sx={{ width: "100%" }}
//             />
//             <IconButton color="primary" aria-label="add attribute">
//               <AddIcon />
//             </IconButton>
//           </Box>

//           {selectedAttributes.map(attr => (
//             <Box key={attr.attribute.id} sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
//               <Typography sx={{ width: "30%", fontFamily: "Roboto" }}>{attr.attribute.name}</Typography>
//               <Box sx={{ display: "flex", flexWrap: "wrap", width: "60%", gap: 1 }}>
//                 {attributeValues[attr.attribute.id.toString()]?.map((value, index) => (
//                   <Chip key={index} label={value} onDelete={() => handleDeleteValue(attr.attribute.id.toString(), value)} color="primary" />
//                 ))}
//                 <TextField placeholder="Nhập ký tự và nhấn enter" variant="outlined" size="small" sx={{ flexGrow: 1 }} onKeyDown={(e) => handleKeyDown(e, attr.attribute.id.toString())} />
//               </Box>
//               <IconButton color="secondary" onClick={() => handleRemoveAttribute(attr.attribute.id)}>
//                 <DeleteIcon />
//               </IconButton>
//             </Box>
//           ))}

//           <Divider sx={{ marginY: 2 }} />

//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Tên phiên bản</TableCell>
//                 <TableCell>Hình ảnh</TableCell>
//                 <TableCell>Số lượng</TableCell>
//                 <TableCell>Giá nhập</TableCell>
//                 <TableCell>Định mức tồn kho</TableCell>
//                 <TableCell>Giá bán</TableCell>
//                 <TableCell>Xóa</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {variants.map((variant, index) => (
//                 <TableRow key={index}>
//                   <TableCell>{variant.name}</TableCell>
//                   <TableCell>
//                     {variant.image ? (
//                       <Box component="img" src={URL.createObjectURL(variant.image)} alt="Ảnh đã chọn" sx={{ width: 60, height: 60, borderRadius: "5px", objectFit: "cover" }} />
//                     ) : (
//                       <IconButton color="primary" component="label">
//                         <UploadFileIcon />
//                         <input type="file" hidden accept="image/*" onChange={(e) => handleImageChange(index, e.target.files ? e.target.files[0] : null)} />
//                       </IconButton>
//                     )}
//                   </TableCell>
//                   <TableCell>
//                     <TextField variant="outlined" size="small" type="number" value={variant.quantity} onChange={(e) => setVariants((prev) => prev.map((v, i) => i === index ? { ...v, quantity: +e.target.value } : v))} />
//                   </TableCell>
//                   <TableCell>
//                     <TextField variant="outlined" size="small" type="number" value={variant.costPrice} onChange={(e) => setVariants((prev) => prev.map((v, i) => i === index ? { ...v, costPrice: +e.target.value } : v))} />
//                   </TableCell>
//                   <TableCell>
//                     <TextField variant="outlined" size="small" type="number" value={variant.minStock} onChange={(e) => setVariants((prev) => prev.map((v, i) => i === index ? { ...v, minStock: +e.target.value } : v))} />
//                   </TableCell>
//                   <TableCell>
//                     <TextField variant="outlined" size="small" type="number" value={variant.price} onChange={(e) => setVariants((prev) => prev.map((v, i) => i === index ? { ...v, price: +e.target.value } : v))} />
//                   </TableCell>
//                   <TableCell>
//                     <IconButton color="secondary" onClick={() => handleRemoveVariant(index)}>
//                       <DeleteIcon />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default Variant;
