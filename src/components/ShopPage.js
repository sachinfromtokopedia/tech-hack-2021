import React, { useState, useContext } from "react";
import { Layout, Modal, message, List, Avatar, Menu, Dropdown } from "antd";
import { RightSquareFilled, HeartFilled, createFromIconfontCN } from '@ant-design/icons';

import { Card } from "antd";
import ImageMapper from "react-image-mapper";
import ImageConfigurationContext from "../context";
import "./style.css";

const IconFont = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/font_1788044_0dwu4guekcwr.js', // icon-javascript, icon-java, icon-shoppingcart (overrided)
    '//at.alicdn.com/t/font_1788592_a5xf2bdic3u.js', // icon-shoppingcart, icon-python
  ],
});


const { Content } = Layout;
const { Meta } = Card;

//mock data

let imageData = [
  {
      "productId": 2,
      "type": "main",
      "productHeight": "500px",
      "productWidth": "600px",
      "product": {
          "key": 2,
          "imgUrl": [
              "https://imagetagger-sachinfromtokopedia.vercel.app/dummy.jpeg"
          ],
          "label": "Speaker",
          "cta": "https://tokopedia.com/",
          "description": "list of all speakers,...."
      },
      "x": 72.36397058823529,
      "y": 63.020833333333336,
      "width": 22.82352941176471,
      "height": 14.583333333333321
  },
  {
      "productId": 3,
      "type": "speaker",
      "productHeight": "600px",
      "productWidth": "600px",
      "product": {
          "key": 4,
          "imgUrl": [
              "https://images.tokopedia.net/img/cache/700/VqbcmM/2021/11/1/f1cefab2-ac5a-4038-bc0c-4dcf047fa4b9.jpg.webp?ect=4g",
              "https://images.tokopedia.net/img/cache/700/VqbcmM/2021/6/8/cbe8d530-a0c8-4566-87e5-7e4208c6cfdf.jpg.webp?ect=4g",
              "https://images.tokopedia.net/img/cache/700/product-1/2020/6/30/24768793/24768793_235040aa-63d2-4567-a289-84fbe9a3545b_500_500.webp?ect=4g"
          ],
          "label": "Bluetooth Wireless",
          "cta": "https://tokopedia.com/",
          "description": "list of all speakers,...."
      },
      "x": 53.54044117647059,
      "y": 61.71875,
      "width": 12.23529411764705,
      "height": 16.145833333333343
  }
]

function ShopPage() {
  const [hoveredArea, setHoverArea] = useState(null);
  const [showModal, toggleModal] = useState(false);
  const [cartData, setCartData] = useState([]);
  const [modalContent, setModalContent] = useState({
    key: 0,
    label: "",
    cta: "",
    imgUrl: [],
    description: "",
  });
  let { selectedProduct, products: subproducts } = useContext(
    ImageConfigurationContext
  );
console.log(subproducts)
  const percentage = (partialValue, totalValue) => {
    return (totalValue * partialValue) / 100;
  };
  const getCoords = (productData) => {
    const { productHeight, productWidth, x, y, width, height } = productData;
    let a = percentage(width, productWidth) / 2;
    let centerX = percentage(x, productWidth) + a;
    let b = percentage(height, productHeight) / 2;
    let centerY = percentage(y, productHeight) + b;
    return [centerX, centerY, 8];
  };
  const generateAreas = () => {
    const areaList = subproducts.map((item) => {
      const { key, label } = item.product;

      return {
        name: key,
        shape: "circle",
        coords: getCoords(item),
        preFillColor: "cyan",
        title: label,
      };
    });

    return {
      name: "my-map",
      areas: areaList,
    };
  };

  const getTipPosition = (area) => {
    return { top: `${area.center[1]}px`, left: `${area.center[0]}px` };
  };
  const addtoCart = () => {
    const updatedData = JSON.parse(JSON.stringify(cartData));
    if (!updatedData.some((item) => item.key === modalContent.key)) {
      updatedData.push({ ...modalContent });
      setCartData(updatedData);
    }
    toggleModal(false);
    message.success(`${modalContent.label} added to Cart`, 0.5);
  };

  const updateModalContent = (id) => {
    console.log(id);
    const foundData = subproducts.find((item) => item?.product?.key === id);
    setModalContent({
      ...foundData.product,
    });
    //toggleModal(true);
  };
console.log({hoveredArea, modalContent});
  const removeFromCart = (id = 0) => {
    const removeIndexKey = id ? id : modalContent.key;
    const updatedData = cartData.filter((item) => item.key !== removeIndexKey);
    setCartData(updatedData);
    toggleModal(false);
    message.success(`${modalContent.label} removed from Cart`, 0.5);
  };
  const { product, productWidth, productHeight } = selectedProduct || {};
  const { imgUrl: mainImg } = product || {};
  return (
    <>
      <Content style={{ margin: "24px 16px 0" }} className="shop-page">
        <Card
          title={`Shop page`}
          style={{ padding: 5, height: "100%", position: "relative" }}
        >
          <div style={{position:"relative"}}>
          <ImageMapper
            src={mainImg}
            width={productWidth}
            height={productHeight}
            map={generateAreas()}
            //onClick={(area) => updateModalContent(area.name)}
            onFocus={(area) => updateModalContent(area.name)}
            onMouseEnter={(area) => {
              updateModalContent(area.name);
              setHoverArea(area)}}
            onImageClick={() => setHoverArea(null)}

          >
           </ImageMapper> 
          {hoveredArea && (
            <span
              className="tooltip"
              style={{ ...getTipPosition(hoveredArea) }}
            >
              <Menu style={{display: "flex", flexDirection:"column"}}>
                <Menu.Item onClick={()=>{
          
                  window.open(modalContent.cta, '_blank')
                  setHoverArea(null);
                }}>
                  <span style={{fontWeight: 800, color: 'black', marginRight:"12px", display: "inline-block"}}>{modalContent.label}</span>
                  <RightSquareFilled style={{ cursor:'pointer'}}/>
                </Menu.Item>
                <Menu style={{display: "flex", justifyContent:"space-around", width:"100%", padding: "2px 4px 8px", color:"red", fontSize:"12px", fontWeight:"600"}}>
                {/* <span><HeartFilled /></span> */}
                <span onClick={()=>addtoCart(modalContent.key)}>Add to Cart <IconFont type="icon-shoppingcart" /></span>  
                </Menu>
                
              </Menu>
            </span>
          )}
          </div>
          <List
            size="small"
            dataSource={cartData}
            header={<div>Sub items in cart:</div>}
            renderItem={(listItem) => {
              return (
                <List.Item
                  actions={[
                    <img
                      src={"/remove.png"}
                      key="remove-image"
                      onClick={() => removeFromCart(listItem.key)}
                      alt="remove-product"
                      width={22}
                    />,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={listItem.imgUrl[0]} />}
                    title={listItem.label}
                    description={listItem.description}
                  />
                </List.Item>
              );
            }}
          />
        </Card>
      </Content>
      <Modal
        title={"Add to Cart"}
        visible={showModal}
        onOk={addtoCart}
        onCancel={() => toggleModal(false)}
        okText={"Add"}
        bodyStyle={{
          overflowY: "scroll",
          display: "flex",
          flexWrap: "wrap",
          height: "402px",
          justifyContent: "space-between",
        }}
      >
        {modalContent.imgUrl.map((productImage) => (
          <Card
            hoverable
            style={{ width: 212, marginBottom: "10px" }}
            cover={<img src={productImage} alt="subImage" />}
          >
            <Meta
              title={modalContent.label}
              description={modalContent.description}
            />
          </Card>
        ))}
      </Modal>
    </>
  );
}

export default ShopPage;
