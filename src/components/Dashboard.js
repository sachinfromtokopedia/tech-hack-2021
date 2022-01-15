import React, { useEffect, useState, useContext } from 'react';
import {useNavigate} from 'react-router-dom'
import { Layout, Input, Card, Typography, Row, Col, Button, Tooltip, List } from 'antd';
import RegionSelect from "react-region-select";
import { CloseCircleFilled, UpSquareFilled } from "@ant-design/icons";

import Select from "react-select";
import ImageConfigurationContext from '../context';
import { PRODUCT_LIST } from "../constant.js";
import SearchListModal from "./SearchList.js";

import { toast } from "react-toastify";
import { DeleteFilled, InfoCircleFilled } from "@ant-design/icons";
const { Title } = Typography;
const { Header, Content } = Layout;

const { Search } = Input;


const Dashboard = () => {
  let { selectedProduct : mainProduct ,setProducts } = useContext(ImageConfigurationContext);
  // const [mainProduct, setMainProduct] = useState(null);
  const [taggedProducts, setTaggedProducts] = useState([]);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [searchList, setSearchList] = useState(PRODUCT_LIST);
  const[showSearchList, setSearchListVisibility] = useState(false);
  const[showSearchBar, setShowSearchBar] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const navigate = useNavigate();

  const [selectedProductConfig, setSelectedProductConfig] = useState({});

  // production logger
  // let console = {
  //   log: (data) => {
  //   },
  // };
  const [productOption, setProductOptions] = useState(
    PRODUCT_LIST.map((el) => {
      return { label: el.product.label, value: el };
    })
  );

  // const deleteProduct = ()=>{
  //   setMainProduct(null);
  //   setTaggedProducts([]);
  // }

  const tagProducts = (product)=>{
    const region = selectedRegions?.[0] || {};
    const newTaggedProducts = [...taggedProducts, {...product, x: region.x, y: region.y, width: region.width, height: region.height }]
    setTaggedProducts(newTaggedProducts);
    setSelectedRegions([])
    setShowSearchBar(false)
  }

  const handleNavigate =()=>{
    setProducts(taggedProducts);
    navigate('/shop')
  }

  const removeTaggedProduct= (productId) => {
    const newTaggedProducts = taggedProducts.filter(el => el.productId != productId )
    setTaggedProducts(newTaggedProducts);
  }

 const showSearchForTag = () => {
  setShowSearchBar(true)
 }

  const onSearch = () => { };

  // const deleteProduct = () => {
  //   setMainProduct(null);
  //   setTaggedProducts([]);
  // };

  const handleInputChange = (e) => {
    const { value } = e.target;
    const newSearchList = PRODUCT_LIST.filter((productInfo) => {
      const {
        product: { label },
      } = productInfo;
      if (label.toLocaleLowerCase().includes(value)) {
        return true;
      }
      return false;
    });
    setSearchVal(value);
    setSearchList(newSearchList);
  };

  const toggleSearchListVisibility = () => {
    setSearchListVisibility((val) => !val);
  };

  const exportData = () => {
    // normalizing data
    if (Object.keys(selectedProductConfig).length !== selectedRegions.length) {
      toast("Please select all products!");
      return 0;
    }

    let result = selectedRegions.map((el) => {
      return { ...el, ...selectedProductConfig[el.data.index] };
    });

    console.log(result);
  };

  // const selectProduct = (info) => {
  //   if (!mainProduct) {
  //     setMainProduct(info);
  //   }
  //   toggleSearchListVisibility();
  // };

  const regionRenderer = (regionProps) => {
    // if(!selectedProduct) return;

    if (!regionProps.isChanging) {
      return (
        <>
          {/* <div style={{ position: "absolute", left: "100%", top: "-17px" }}>
            <DeleteFilled
              style={{ color: "red" }}
              onClick={() => {
                setSelectedRegions(
                  selectedRegions.filter(
                    (el) => el.data.index !== regionProps.data.index
                  )
                );

                console.log(
                  "****selected products",
                  selectedProductConfig[regionProps.data.index],
                  regionProps.data.index
                );

                let selectedProducts = { ...selectedProductConfig };
                delete selectedProducts[regionProps.data.index];
                setSelectedProductConfig(selectedProducts);
              }}
            />
          </div> */}
          <div style={{ position: "absolute", left: "0%", bottom: "0", width: '100%' }}>{renderTaggingUI()}</div>
        </>
      );
    } else {
      console.log(regionProps);
    }
  };

  function onRegionChange(regions) {
    //showSearchForTag(true)
    setSelectedRegions(
      regions.map((el) => {
        return { ...el, product: el.product };
      })
    );
  }

  const handleClose = () => {
    toggleSearchListVisibility();
    setSearchList(PRODUCT_LIST);
    setSearchVal("");
  };

  const selectTaggedItem = () => {

  }

  const { product, productWidth, productHeight } = mainProduct||{};
  const { imgUrl:mainImg} = product||{};

  const regionStyle = {
    background: "rgba(0, 255, 0, 0.5)",
    zIndex: 99
  }

  const renderDefaultProductList = () => {
    return(
      <List
        bordered
        dataSource={PRODUCT_LIST}
        renderItem={item => (
          <List.Item style={{ background: 'white'}} onClick={() => tagProducts(item)}>
            <div style={{ display: 'flex'}} onClick={selectTaggedItem}>
            <img style={{ marginRight: '10px'}}src={item.product.imgUrl} width='20px' height='20px'></img>
            <div>{item.product.label}</div></div>
          </List.Item>
        )}
      />
    )
  }
  const renderTaggingUI = () => {
  return(
    <div style={{position: 'absolute', zIndex: '100', width: '100%'}}> 
        <div style={{background: 'white', minWidth: '150px', width: '100%'}}>
          <Search placeholder='Search Product to Tag'/>
          {renderDefaultProductList()}
        </div>
      {/* } */}
      </div>
  )
  }

  return <Layout style={{ height: "100vh", width: "100vw" , background: 'white'}}>
  <Header className="header">
    <div className="logo"></div>
    <Title level={2} style={{ color:'#FFF', justifyContent: 'center', display: 'flex', alignItems:'center', height:'100%' }}>Image Mapper</Title>
  </Header>
  <Row><Button style={{
        position: 'absolute',
        right: '0',
        margin: '16px',
        background: 'green',
        color: 'white',
  }} onClick={handleNavigate}>Save</Button></Row>
      <Row>
        <Col span={24} style={{display: "flex", justifyContent: "space-around", margin:"100px 0px 40px 0px",position: 'relative'}}>
          <div style={{ position: 'relative'}}>{mainProduct ?  
            <Tooltip placement="bottom" trigger={['hover']} overlay={<span>Select a section on image to tag</span>}>
              <div style={{position: 'absolute', top: '10px', left: '10px', zIndex: '100', background: 'green', color: 'white', borderRadius: '6px', padding: '6px'}}>Tag More Products</div>
            </Tooltip> : null
          }
          {
            mainProduct?
            <RegionSelect
            maxRegions={100}
            regions={selectedRegions}
            regionStyle={regionStyle}
            onChange={onRegionChange}
            regionRenderer={regionRenderer}
            style={{ height: "100%", width: "100%" ,display:'flex'  , justifyContent : "center"}}
            constraint={true}
          >
            <img src={mainImg} style={{ width:productWidth, height:productHeight }} />
          </RegionSelect>
            :null
          }  </div>
          <div style={{ width: '350px'}}>
            {mainProduct ? 
              <List
                style={{ width: '100%'}}
              header={<div style={{ fontWeight: 'bold'}}>Tagged Products</div>}
                bordered
                dataSource={taggedProducts}
                renderItem={item => (
                  <List.Item style={{ background: 'white', width: '100%'}}>
                    <div style={{ display: 'flex'}}>
                      <img style={{ marginRight: '10px'}}src={item.product.imgUrl} width='20px' height='20px'></img>
                      <div>{item.product.label}</div>
                    </div>
                    <div style={{ color: 'red', fontWeight: 'bold'}} onClick={()=> removeTaggedProduct(item.productId)}>X</div>
                  </List.Item>
              )}
          />: null}
          </div>
        </Col>
      </Row>
    {/* </Card>
  </Content> */}
</Layout>
}

export default Dashboard