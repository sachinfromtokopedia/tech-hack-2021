
import { Modal, Button } from 'antd';
import ImageConfigurationContext from '../context';
import { useContext } from "react";
import { Form, Input, Checkbox } from 'antd';

function AddProduct({ visibility, setVisibility }) {
    const { products, setProducts } = useContext(ImageConfigurationContext)

    const onSubmit = (value) => {
        // const idExist = products.filter(el => el.id === value.id).length ===0
        // if (!idExist) {
            setProducts([...products, value])

            setVisibility(false)
        // }
    };

    return <Modal title="Add Product" visible={visibility} onCancel={() => { setVisibility(false) }} footer={[]}>

        <Form
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onSubmit}
            onFinishFailed={() => { }}
            autoComplete="off"

        >

            <Form.Item
                label="id"
                name="id"
                rules={[
                    {
                        required: true,
                        message: 'Field is required',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="label"
                name="label"
                rules={[
                    {
                        required: true,
                        message: 'Field is required',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="cta"
                name="cta"
                rules={[
                    {
                        required: true,
                        message: 'Field is required',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Add
                </Button>
            </Form.Item>

        </Form>
    </Modal>
}

export default AddProduct;