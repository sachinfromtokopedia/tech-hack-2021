
import { useState, useContext } from 'react';
import { Layout } from 'antd';
import RegionSelect from "react-region-select";
import { Card } from 'antd';
import { DeleteFilled, InfoCircleFilled } from '@ant-design/icons';
import ImageConfigurationContext from '../context';

const { Content } = Layout;

function Playground() {

    let { selectedProduct,products, setSelectedRegions, selectedRegions } = useContext(ImageConfigurationContext);


    function onChange(regions) {
        console.log("on change called")
        setSelectedRegions(regions.map(el => {
            return { ...el, product: el.product ? el.product : selectedProduct }
        }))
    }

    

    function regionRenderer(regionProps) {   
        
        if(!selectedProduct) return;
        
        if (!regionProps.isChanging) {
            return (
                <div style={{ position: "absolute", right: "50%", bottom: "-1.5em" }} >
                    <DeleteFilled style={{ color: "red" }} onClick={() => { setSelectedRegions(selectedRegions.filter(el => el.data.index !== regionProps.data.index)) }} />
                    {/* <InfoCircleFilled title={getRegionLabel(regionProps.data.index)} onClick={() => { }} /> */}
                    {/* <p>{getRegionLabel(regionProps.data.index)}</p> */}
                </div>
            );
        } else {
            console.log(regionProps)
        }
    }

    let regionStyle = {
        background: "rgba(0, 255, 0, 0.5)",
        zIndex: 99
    }

    return <Content style={{ margin: '24px 16px 0' }}>
        <Card title={`Tag : ${selectedProduct && selectedProduct.label ? selectedProduct.label : ""}`} style={{ padding: 5, height: "100%" }}>
           
            <RegionSelect
                maxRegions={products.length}
                regions={selectedRegions}
                regionStyle={regionStyle}
                onChange={onChange}
                regionRenderer={regionRenderer}
                style={{ height: "100%", width: "100%" }}
                constraint={true}

           >
                <img src={"/dummy.jpeg"} style={{ width: "100%", height: "100%" }} />
            </RegionSelect>

        </Card>

    </Content>

}

export default Playground;