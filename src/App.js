import { useState } from 'react';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import Sidebar from "./components/Sidebar";
import ComponentFooter from "./components/ComponentFooter";
import Playground from './components/Playground';
import ImageConfigurationContext from "./context";
function App() {

  const [selectedProduct , setSelectedProduct] = useState(null);
  const [selectedRegions , setSelectedRegions] = useState([]);

  return <ImageConfigurationContext.Provider value={{selectedProduct , setSelectedProduct , selectedRegions , setSelectedRegions}}>
    <Layout style={{ height: "100vh" }}>
      <Sidebar />
      <Layout>
        <Playground />
        <ComponentFooter />

      </Layout>
    </Layout>
  </ImageConfigurationContext.Provider>
}

export default App;
