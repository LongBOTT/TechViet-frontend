import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import CategoryPage from './pages/Home/CategoryPage';
import { BASE, CATEGORY_PAGE } from './constants/routeConstants';
import { ProductProvider } from './context/ProductContex';
import ScrollToTopButton from './components/Footer/ScrollToTopButton';



function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path={BASE} element={<Home/>} />
        <Route path={CATEGORY_PAGE} element={
          <ProductProvider>
              <CategoryPage categoryName={CATEGORY_PAGE}/>
          </ProductProvider>} />
      </Routes>
      <Footer/>
        <ScrollToTopButton/>
    </Router>
   );
 
}

export default App;
