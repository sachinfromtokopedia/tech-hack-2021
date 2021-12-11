import 'antd/dist/antd.css';
import { Layout } from 'antd';
import Sidebar from "./components/Sidebar";
import ComponentFooter from "./components/ComponentFooter";
import Playground from './components/Playground';

function App() {
  return  <Layout style={{height : "100vh"}}>
 <Sidebar/>
  <Layout>
    <Playground/>
    <ComponentFooter/>

  </Layout>
</Layout>
}

export default App;
