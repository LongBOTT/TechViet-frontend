import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import CategoryPage from "./pages/Category/CategoryPage";
import { BASE, CATEGORY } from "./constants/routeConstants";
import { ProductProvider } from "./context/ProductContext";
import { SupplierProvider } from "./context/SupplierContext";
import { CategoryProvider } from "./context/CategoryContext";
import { BrandProvider } from "./context/BrandContex";
import ScrollToTopButton from "./components/Footer/ScrollToTopButton";

import PermanentDrawerLeft from "./admin/pages/HomePage";
import ProductPage from "./admin/pages/Product/ProductPage";
import CustomerPage from "./admin/pages/CustomerPage";
import DashboardPage from "./admin/pages/DashboardPage";
import DiscountPage from "./admin/pages/DiscountPage";
import OrderPage from "./admin/pages/OrderPage";
import OverviewPage from "./admin/pages/OverviewPage";
import SupplierPage from "./admin/pages/SupplierPage";
import WarrantyPage from "./admin/pages/WarrantyPage";
import AddProductPage from "./admin/pages/Product/AddProductPage";
import EditProductPage from "./admin/pages/Product/EditProductPage";
function App() {
  return (
    //   <Router>
    //     <NavBar />
    //     <Routes>
    //       <Route path={BASE} element={<Home/>} />
    //         <Route path={`${CATEGORY}/:id`} element={<CategoryPage/>} />
    //     </Routes>
    //     <Footer/>
    //       <ScrollToTopButton/>
    // </Router>

    <Router>
      <Routes>
        {/* Đặt PermanentDrawerLeft làm route cha */}
        <Route path="/" element={<PermanentDrawerLeft />}>
          <Route index element={<Navigate to="/overview" />} />
          <Route path="overview" element={<OverviewPage />} />
          <Route path="orders" element={<OrderPage />} />
          <Route
            path="products"
            element={
              <ProductProvider>
                <CategoryProvider>
                  <BrandProvider>
                    <ProductPage />
                  </BrandProvider>
                </CategoryProvider>
              </ProductProvider>
            }
          />
          <Route
            path="/AddProduct"
            element={
              <CategoryProvider>
                <BrandProvider>
                  <ProductProvider>
                    <AddProductPage />
                  </ProductProvider>
                </BrandProvider>
              </CategoryProvider>
            }
          />
          <Route
            path="/EditProduct/:id"
            element={
              <CategoryProvider>
                <BrandProvider>
                  <ProductProvider>
                    <EditProductPage />
                  </ProductProvider>
                </BrandProvider>
              </CategoryProvider>
            }
          />
          <Route
            path="suppliers"
            element={
              <SupplierProvider>
                <SupplierPage />
              </SupplierProvider>
            }
          />
          <Route path="warranty" element={<WarrantyPage />} />
          <Route path="customers" element={<CustomerPage />} />
          <Route path="discounts" element={<DiscountPage />} />
          <Route path="reports" element={<DashboardPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
