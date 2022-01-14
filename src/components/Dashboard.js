import React, { useEffect, useState } from "react";
import {
  Layout,
  Input,
  Card,
  Typography,
  Row,
  Col,
  Button,
  notification,
} from "antd";
import RegionSelect from "react-region-select";
import { CloseCircleFilled } from "@ant-design/icons";

import Select from "react-select";
import { PRODUCT_LIST } from "../constant.js";
import SearchListModal from "./SearchList.js";

import { toast } from "react-toastify";
import { DeleteFilled, InfoCircleFilled } from "@ant-design/icons";
const { Title } = Typography;
const { Header, Content } = Layout;

const { Search } = Input;

const Dashboard = () => {
  const [mainProduct, setMainProduct] = useState(null);
  const [taggedProducts, setTaggedProducts] = useState([]);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [searchList, setSearchList] = useState(PRODUCT_LIST);
  const [showSearchList, setSearchListVisibility] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  // console.log("****",  )

  const [selectedProductConfig, setSelectedProductConfig] = useState({});

  const [productOption, setProductOptions] = useState(
    PRODUCT_LIST.map((el) => {
      return { label: el.product.label, value: el };
    })
  );

  const onSearch = () => {};
  const deleteProduct = () => {
    setMainProduct(null);
    setTaggedProducts([]);
  };

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

  const selectProduct = (info) => {
    if (!mainProduct) {
      setMainProduct(info);
    }
    toggleSearchListVisibility();
  };

  const regionRenderer = (regionProps) => {
    // if(!selectedProduct) return;

    if (!regionProps.isChanging) {
      return (
        <>
          <div style={{ position: "absolute", left: "100%", top: "-17px" }}>
            <DeleteFilled
              style={{ color: "red" }}
              onClick={() => {
                setSelectedRegions(
                  selectedRegions.filter(
                    (el) => el.data.index !== regionProps.data.index
                  )
                );

                console.log("****selected products" , selectedProductConfig[regionProps.data.index] , regionProps.data.index)

                let selectedProducts = { ...selectedProductConfig };
                delete selectedProducts[regionProps.data.index];
                setSelectedProductConfig(selectedProducts);
              }}
            />
            {/* <InfoCircleFilled title={getRegionLabel(regionProps.data.index)} onClick={() => { }} /> */}
            {/* <p>{getRegionLabel(regionProps.data.index)}</p> */}
          </div>
          <div
            style={{ position: "absolute", width: "100%", bottom: "-1.5em" }}
          >
            <Select
              options={productOption}
              onChange={(data) => {
                console.log("haha" , selectedProductConfig);
                setSelectedProductConfig({
                  ...selectedProductConfig,
                  [regionProps.data.index]: data.value,
                });
              }}
            />
          </div>
        </>
      );
    } else {
      console.log(regionProps);
    }
  };

  useEffect(()=>{

    console.log("!!!!" , selectedProductConfig)
  } , [selectedProductConfig])

  function onRegionChange(regions) {
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

  const { product, width, height } = mainProduct || {};
  const { imgUrl: mainImg } = product || {};

  const regionStyle = {
    background: "rgba(0, 255, 0, 0.5)",
    zIndex: 99,
  };

  return (
    <Layout style={{ height: "100vh", width: "100vw" }}>
      <Header className="header">
        <div className="logo"></div>
        <Title
          level={2}
          style={{
            color: "#FFF",
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
            height: "100%",
          }}
        >
          Image Mapper
        </Title>
      </Header>
      <Content style={{ margin: "24px", minHeight: 280 }}>
        <Card style={{ height: "100%", width: "100%", overflowY: "auto" }}>
          <Row>
            <Col span={12}>
              <Search
                placeholder={
                  mainProduct ? "Search Tagged Product" : "Seach Main Product"
                }
                onFocus={toggleSearchListVisibility}
                onSearch={onSearch}
                value={searchVal}
                onChange={handleInputChange}
                style={{ width: "100%" }}
              />
            </Col>
            <Col span={4} offset={8}>
              <Button type="primary" onClick={exportData}>
                Export data
              </Button>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              {showSearchList && (
                <SearchListModal
                  searchList={searchList}
                  selectProduct={selectProduct}
                />
              )}
            </Col>
          </Row>
          {showSearchList && (
            <CloseCircleFilled
              style={{
                margin: "20px",
                position: "absolute",
                height: "62px",
                right: "20px",
                width: "2em",
                color: "red",
              }}
              onClick={handleClose}
            />
          )}

          <Row>
            <Col
              span={24}
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "100px 0px 40px 0px",
              }}
            >
              {mainProduct ? (
                <RegionSelect
                  maxRegions={100}
                  regions={selectedRegions}
                  regionStyle={regionStyle}
                  onChange={onRegionChange}
                  regionRenderer={regionRenderer}
                  style={{ height: "100%", width: "100%" }}
                  constraint={true}
                >
                  <img src={mainImg?.[0] ?? ""} style={{ width, height }} />
                </RegionSelect>
              ) : null}
            </Col>
          </Row>
          <Row>
            <Col>
              {mainProduct ? (
                <Button onClick={deleteProduct}>Delete Product</Button>
              ) : null}
            </Col>
          </Row>
        </Card>
      </Content>
    </Layout>
  );
};

export default Dashboard;
