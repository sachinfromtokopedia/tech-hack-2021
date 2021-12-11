
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Button, Layout, Menu } from 'antd';
import { products } from '../db';
const { Sider } = Layout;


const Sidebar = ()=>{

    return  <Sider
    theme="dark"
    breakpoint="lg"
    collapsedWidth="0"
    onBreakpoint={broken => {
      console.log(broken);
    }}
    onCollapse={(collapsed, type) => {
      console.log(collapsed, type);
    }}
   
  >
    <Menu theme={"dark"} mode="inline" style={{marginTop : 30}}>
    <Menu.Item>
        <p><h3 style={{color : "white"}}>Select product to tag</h3></p>
      </Menu.Item>
      <hr/>
    {products.map(el=>{
        return <Menu.Item key={el.key} style={{marginTop:20}}>
        <p>{el.label}</p>
      </Menu.Item>
    })}
    
    
    </Menu>
  </Sider>;


}

export default Sidebar;