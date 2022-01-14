import React from 'react';
import { Row, Col, Card, Button, Typography } from 'antd';

const { Paragraph, Title } = Typography

const SearchList = ({ searchList=[], selectProduct}) => {

  return (
    <Card title="Search Result" style={{"margin":"40px 0px", "width": "100%", height: "100%", minHeight:"70vh", position:"absolute", zIndex:"99", overflowY:"auto"}}>
      
      <Row>
      {
        searchList.map((val, key)=>{
          const { product} = val;
          const { imgUrl, label } = product||{};
          return <Col span={12} style={{display: "flex", justifyCntent: "center",flexDirection: "column",alignItems: "center"}} key={key}>
              <img src={imgUrl?.[0]??''} style={{height:"400px", width:"80%", display:"block", padding:"20px"}}/>
              <Paragraph>{label}</Paragraph>
              <Button type="primary" onClick={()=>selectProduct(val)}>Add</Button>
            </Col>
        })
      }
      {
        searchList.length==0 && <Title>No Product Found</Title>
      }
      </Row>
    </Card>
  );
};

export default SearchList;