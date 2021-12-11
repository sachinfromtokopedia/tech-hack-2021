
import { Layout } from 'antd';
import Sidebar from "./Sidebar";
import ComponentFooter from "./ComponentFooter";
import Playground from './Playground';

function Main() {
    return <Layout style={{ height: "100vh" }}>
        <Sidebar />
        <Layout>
            <Playground />
            <ComponentFooter />
        </Layout>
    </Layout>
}

export default Main;