
import { Layout } from 'antd';
import { Card } from 'antd';
import ImageMapper from "react-image-mapper";

const { Content } = Layout;


//mock data

let data = [
    {
        "x": 71.16724738675958,
        "y": 54.11548651252408,
        "width": 26.306620209059233,
        "height": 34.87475915221581,
        "new": false,
        "data": {
            "index": 0
        },
        "isChanging": false,
        "product": {
            "key": 1,
            "label": "Apple glasses",
            "cta": "https://tokopedia.com/"
        }
    },
    {
        "x": 4.616724738675958,
        "y": 47.94978323699422,
        "width": 18.815331010452958,
        "height": 36.416184971098275,
        "new": false,
        "data": {
            "index": 1
        },
        "isChanging": false,
        "product": {
            "ket": 2,
            "label": "Alexa",
            "cta": "https://tokopedia.com/"
        }
    }
]


let MAP = {
    name: "my-map",
    areas: [
          { name: "1", shape: "rect", coords: [68 , 46 , 500 , 500], preFillColor: "pink" },
        // { name: "1", shape: "rect", coords: [1846, 1836, 500, 500], preFillColor: "pink" },
    ]
}


function ShopPage() {
    return <Content style={{ margin: '24px 16px 0' }}>
        <Card title={`Shop page`} style={{ padding: 5, height: "100%" }}>
            <ImageMapper src={"/dummy.jpeg"} map={MAP} imgWidth={1920}
                   width={window.innerWidth}
                    onLoad={() => { console.log("loaded>>>") }}
                    onClick={area => { console.log("clicked", area) }}
                    onMouseEnter={area => { console.log("mouse enter", area) }}
                    onMouseLeave={area => { console.log("on mouse leave", area) }}
                    onMouseMove={(area, _, evt) => { console.log("mouse move") }}
                    onImageClick={evt => { console.log("image clicked") }}
                    onImageMouseMove={evt => { console.log("image mouse move") }}
                />
            {
                // this.state.hoveredArea &&
                // <span className="tooltip"
                //     style={{ ...this.getTipPosition(this.state.hoveredArea) }}>
                //     {this.state.hoveredArea && this.state.hoveredArea.name}
                // </span>
            }
            {/* <img src={"/dummy.jpeg"} usemap="#workmap"style={{ width: "100%", height: "100%" }} />

            <map name="workmap">
                <area shape="rect" coords="0,0,270,350" alt="Computer" href="computer.htm" />
                <area shape="rect" coords="290,172,333,250" alt="Phone" href="phone.htm" />
                <area shape="circle" coords="337,300,44" alt="Cup of coffee" href="coffee.htm" />
            </map> */}
        </Card>
    </Content>

}

export default ShopPage;