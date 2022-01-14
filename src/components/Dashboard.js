import React, { useState } from 'react';
import { Layout, Input, Card, Typography, Row, Col, Button } from 'antd';
import RegionSelect from "react-region-select";
import { CloseCircleFilled } from '@ant-design/icons';

import { PRODUCT_LIST } from '../constant.js';
import SearchListModal from './SearchList.js';
const { Title } = Typography
const { Header, Content } = Layout;
const { Search } = Input;

const Dashboard =()=>{
  const[mainProduct, setMainProduct] = useState(null);
  const[taggedProducts, setTaggedProducts] = useState([]);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [searchList, setSearchList] = useState(PRODUCT_LIST);
  const[showSearchList, setSearchListVisibility] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  const onSearch = (val)=>{
    
  }

  const deleteProduct = ()=>{
    setMainProduct(null);
    setTaggedProducts([]);
  }

  const handleInputChange = (e)=>{
    const { value } = e.target;
    const newSearchList = PRODUCT_LIST.filter((productInfo)=>{
      const { product: {label}} = productInfo;
      if(label.toLocaleLowerCase().includes(value)){
        return true
      }
      return false;
    })
    setSearchVal(value);
    setSearchList(newSearchList);
  }

  const toggleSearchListVisibility = ()=>{
    setSearchListVisibility(val=>!val);
  }

  const uploadImage = ()=>{

  }

  const selectProduct = (info)=>{
    if(!mainProduct){
      setMainProduct(info);
    }
    toggleSearchListVisibility();
  }

  const regionRenderer = (regions)=>{
    console.log(regions);
    setSelectedRegions(regions.map(el => {
      return { ...el, product: el.product ? el.product : mainProduct }
  }))
  }

  const onRegionChange = (val)=>{
    console.log('region change');
    console.log(val);
  }

  const handleClose = ()=>{
    toggleSearchListVisibility();
    setSearchList(PRODUCT_LIST);
    setSearchVal('')
  }

  const { product, width, height } = mainProduct||{};
  const { imgUrl:mainImg} = product||{};

const regionStyle = {
  background: "rgba(0, 255, 0, 0.5)",
  zIndex: 99
}

  return <Layout style={{ height: "100vh", width: "100vw" }}>
  <Header className="header">
    <div className="logo"></div>
    <Title level={2} style={{ color:'#FFF', justifyContent: 'center', display: 'flex', alignItems:'center', height:'100%' }}>Image Mapper</Title>
  </Header>
  <Content style={{ margin: '24px', minHeight: 280 }}>
    <Card style={{ height: "100%", width: '100%', overflowY: "auto" }}>
      
      <Row>
        <Col span={12}>
          <Search placeholder={mainProduct?"Search Tagged Product":"Seach Main Product"} onFocus={toggleSearchListVisibility} onSearch={onSearch} value={searchVal} onChange={handleInputChange} style={{ width: '100%' }} />
        </Col>
        <Col span={4} offset={8}>
          <Button type="primary" onClick={uploadImage}>Upload Button</Button>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          {
            showSearchList && <SearchListModal searchList={searchList} selectProduct={selectProduct}/>
          }
        </Col>
      </Row>
      {
        showSearchList && <CloseCircleFilled style={{margin:"20px", position: 'absolute',height: '62px',right: '20px',width: '2em',color: 'red'}} onClick={handleClose}/>
      }
      
      <Row>
        <Col span={24} style={{display: "flex", justifyContent: "center", margin:"100px 0px 40px 0px"}}>
          {
            mainProduct?
            <RegionSelect
                maxRegions={null}
                regions={selectedRegions}
                regionStyle={regionStyle}
                onChange={onRegionChange}
                regionRenderer={regionRenderer}
                style={{ height: "100%", width: "100%" }}
                constraint={true}

           >
                <img src={mainImg?.[0]??''} style={{width, height}}/>
            </RegionSelect>
            :null
          }  
        </Col>
      </Row>
      <Row>
        <Col>
        {
          mainProduct?<Button onClick={deleteProduct}>Delete Product</Button>:null
        }        
        </Col>
      </Row>
    </Card>
  </Content>
</Layout>
}

export default Dashboard
