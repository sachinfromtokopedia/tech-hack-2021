
import { useState, useEffect } from 'react';
import { Layout } from 'antd';
import RegionSelect from "react-region-select";
import { Card } from 'antd';
import { DeleteFilled } from '@ant-design/icons';

const { Content } = Layout;
function Playground() {

    const [regions, setRegions] = useState([]);

    function onChange(regions) {
        setRegions(regions)
    }

   
    function regionRenderer(regionProps) {
        console.log("region propd" , regionProps);
        if (!regionProps.isChanging) {
            return (
                <div style={{ position: "absolute", right: "50%", top :"50%"}} title={"Apple glasses"}>
                    <DeleteFilled  style={{color : "red"}}onClick={()=>{setRegions(regions.filter(el=>el.data.index!==regionProps.data.index))}}/>
                </div>
            );
        }
    }

    let regionStyle = {
        background: "rgba(0, 255, 0, 0.5)",
        zIndex: 99
    }

    return <Content style={{ margin: '24px 16px 0' }}>
        <Card title="Playground" style={{ padding: 5, height: "100%" }}>
            <RegionSelect
                maxRegions={10}
                regions={regions}
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