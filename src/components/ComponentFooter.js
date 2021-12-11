import { Button, Layout, Row } from 'antd';
const { Footer} = Layout;

function ComponentFooter(){
    return <Footer style={{ textAlign: 'center' }}>
            
            <Button>Add more products</Button>            
            <Button>Export</Button>            
    </Footer>
 
}

export default ComponentFooter;