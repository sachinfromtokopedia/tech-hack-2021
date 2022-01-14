import React, { useState } from "react";
import { Layout, Modal, message, List, Avatar } from "antd";
import { Card } from "antd";
import ImageMapper from "react-image-mapper";
import "./style.css";

const { Content } = Layout;
const { Meta } = Card;

//mock data

let imageData = [
  {
    type: "speaker",
    height: "500px",
    width: "600px",
    product: {
      key: 3,
      imgUrl: [
        "https://images.tokopedia.net/img/cache/700/VqbcmM/2021/11/1/f1cefab2-ac5a-4038-bc0c-4dcf047fa4b9.jpg.webp?ect=4g",
        "https://images.tokopedia.net/img/cache/700/VqbcmM/2021/6/8/cbe8d530-a0c8-4566-87e5-7e4208c6cfdf.jpg.webp?ect=4g",
        "https://images.tokopedia.net/img/cache/700/product-1/2020/6/30/24768793/24768793_235040aa-63d2-4567-a289-84fbe9a3545b_500_500.webp?ect=4g",
      ],
      label: "Bluetooth Wireless",
      cta: "https://tokopedia.com/",
      description: "list of all speakers,....",
      height: 44,
      width: 14,
      x: 62,
      y: 31.4,
    },
  },
];

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

  const percentage = (partialValue, totalValue) => {
    return (totalValue * partialValue) / 100;
  };
  const getCoords = (productData) => {
    const { x, y, width, height } = productData;
    let a = percentage(width, 600) / 2;
    let centerX = percentage(x, 600) + a;
    let b = percentage(height, 500) / 2;
    let centerY = percentage(y, 500) + b;
    return [centerX, centerY, 8];
  };
  const generateAreas = () => {
    const areaList = imageData.map((item) => {
      const { key, label } = item.product;
      return {
        name: key,
        shape: "circle",
        coords: getCoords(item.product),
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
    const foundData = imageData.find((item) => item?.product?.key === id);
    setModalContent({
      ...foundData.product,
    });
    toggleModal(true);
  };

  const removeFromCart = (id = 0) => {
    const removeIndexKey = id ? id : modalContent.key;
    const updatedData = cartData.filter((item) => item.key !== removeIndexKey);
    setCartData(updatedData);
    toggleModal(false);
    message.success(`${modalContent.label} removed from Cart`, 0.5);
  };

  return (
    <>
      <Content style={{ margin: "24px 16px 0" }} className="shop-page">
        <Card title={`Shop page`} style={{ padding: 5, height: "100%" ,position:"relative"}}>
          <ImageMapper
            src={"/dummy.jpeg"}
            width={600}
            height={500}
            map={generateAreas()}
            onClick={(area) => updateModalContent(area.name)}
            onMouseEnter={(area) => setHoverArea(area)}
            onMouseLeave={() => setHoverArea(null)}
          />
          {hoveredArea && (
            <span
              className="tooltip"
              style={{ ...getTipPosition(hoveredArea) }}
            >
              {hoveredArea && hoveredArea.title}
            </span>
          )}
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
