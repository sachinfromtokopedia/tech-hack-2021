import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { Row, Col, Card, Button, Typography, Layout, Input } from 'antd';

import ImageConfigurationContext from '../context';
import { PRODUCT_LIST } from '../constant.js';

const { Header, Content } = Layout;
const { Paragraph, Title } = Typography

const SearchList = () => {
  let navigate = useNavigate();

  let { setSelectedProduct } = useContext(ImageConfigurationContext);

  const handleClick = (val)=>{
    setSelectedProduct(val);
    navigate('/dashboard')
  }
  return (
    <Layout style={{ height: "100%", width: "100vw" }}>
  <Header className="header">
    <div className="logo"></div>
    <Title level={2} style={{ color:'#FFF', justifyContent: 'center', display: 'flex', alignItems:'center', height:'100%' }}>Image Mapper</Title>
  </Header>
  <Content style={{ margin: '24px', minHeight: 280 }}>
    <Card style={{"width": "100%"}}>
      
      <Row>
      {
        PRODUCT_LIST.map((val, key)=>{
          const { product} = val;
          const { imgUrl, label } = product||{};
          return <Col span={12} style={{display: "flex", justifyCntent: "center",flexDirection: "column",alignItems: "center"}} key={key}>
              <img src={imgUrl?.[0]??''} style={{height:"400px", width:"80%", display:"block", padding:"20px"}}/>
              <Paragraph>{label}</Paragraph>
              <Button type="primary" onClick={()=>handleClick(val)}>Tag</Button>
            </Col>
        })
      }
      {
        PRODUCT_LIST.length==0 && <Title>No Product Found</Title>
      }
      </Row>
    </Card>
    </Content>
  </Layout>
  );
};

export default SearchList;