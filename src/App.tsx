import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import NavBar from "./customer/components/NavBar/NavBar";
import { Banner } from "./customer/pages/Home/Banner";
import CategoryMenu from "./customer/pages/Home/CategoryMenu";
import { Box } from "@mui/material";
import Footer from "./customer/components/Footer/Footer";
import Home from "./customer/pages/Home/Home";
import ListBrandComponent from "./admin/components/ListBrandComponent";
import HomePage from "./admin/components/HomePage";
import AddSupplierComponent from "./admin/components/Supplier/DiaglogAddSupplier";


function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      {/* Header */}
      {/* <NavBar/> */}
      {/* Home */}
      {/* <Home/> */}

      {/* Footer */}
      {/* <Footer/> */}
      <HomePage />
    </div>
  );
}

export default App;
