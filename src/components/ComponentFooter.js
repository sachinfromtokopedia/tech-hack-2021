import { Button, Layout, Row } from 'antd';
import ImageConfigurationContext from '../context';
import {  useContext } from 'react';
const { Footer} = Layout;

function ComponentFooter(){

    let { selectedRegions }= useContext(ImageConfigurationContext);
  
    return <Footer style={{ display:'flex' , justifyContent:'space-between' }}>
            
            <Button type="primary">Add more products</Button>            
            <Button type="primary" onClick={()=>{console.log("####" , selectedRegions)}}>Export</Button>            
    </Footer>
 
}

export default ComponentFooter;