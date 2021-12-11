import { Button, Layout, Row } from 'antd';
import ImageConfigurationContext from '../context';
import {  useContext } from 'react';
import AddProduct from './AddProduct';
import { useState } from 'react';
const { Footer} = Layout;

function ComponentFooter(){

    const [addProductVisibility , setAddProductVisibility ] = useState(false);

    let { selectedRegions , setSelectedRegions }= useContext(ImageConfigurationContext);
  
    return <Footer style={{ display:'flex' , justifyContent:'space-between' }}>

                {/* add product modal */}
                   <AddProduct visibility={addProductVisibility} setVisibility={setAddProductVisibility}/>
                {/*  */}

            <Button type="primary" onClick={()=>{setAddProductVisibility(true)}}>Add more products</Button>    
            <Button type="danger" onClick={()=>{setSelectedRegions([])}}>Clear all</Button>            
            <Button type="secondary" onClick={()=>{console.log("####" , selectedRegions)}}>Export</Button>            
    </Footer>
 
}

export default ComponentFooter;