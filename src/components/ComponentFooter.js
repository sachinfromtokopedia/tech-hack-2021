import { Button, Layout, Row } from 'antd';
const { Footer} = Layout;

function ComponentFooter(){
    return <Footer style={{ display:'flex' , justifyContent:'space-between' }}>
            
            <Button type="primary">Add more products</Button>            
            <Button type="primary">Export</Button>            
    </Footer>
 
}

export default ComponentFooter;