//src/admin/components/Product/ProductContent.tsx
import * as React from "react";
import Box from "@mui/material/Box";
import { useProductContext } from "../../../context/ProductContex";
import SearchBox from "../Util/Search";
import { Paper, TableContainer } from "@mui/material";
import EntityTable from "../Util/EntityTable";
import EntityTabs from "../Util/EntityTabs";
import AllProducts from "./AllProducts";
import IMEI from "./IMEI";

const ProductContent: React.FC = () => {
  const { products, searchProductsByName } = useProductContext();

  const [currentTab, setCurrentTab] = React.useState("Tất cả sản phẩm"); // Trạng thái tab hiện tại
  const handleTabChange = (tabLabel: string) => {
    setCurrentTab(tabLabel); // Cập nhật tab hiện tại khi tab thay đổi
  };
  const tabs = [
    {
      label: "Tất cả sản phẩm",
      content: <AllProducts />,
    },
    {
      label: "Serial/IMEI",
      content: <IMEI/>,
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: "white", // Điều chỉnh màu nền để phù hợp với thiết kế
       
      }}
    >
      <EntityTabs tabs={tabs} onTabChange={handleTabChange} />
    </Box>
  );
};

export default ProductContent;
