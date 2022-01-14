import { useState } from 'react';
import 'antd/dist/antd.css';
import ImageConfigurationContext from "./context";
import { productList } from "./db";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Main
  from './components/Main';
import ShopPage from './components/ShopPage';
import Dashboard from './components/Dashboard';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductList from './components/ProductList';

function App() {
  toast.configure()
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [products, setProducts] = useState(productList)

  return <ImageConfigurationContext.Provider value={{ selectedProduct, setSelectedProduct, selectedRegions, setSelectedRegions, products, setProducts }}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/list" element={<ProductList />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/shop" element={<ShopPage />} />
      </Routes>
    </BrowserRouter>


  </ImageConfigurationContext.Provider>
}

export default App;
