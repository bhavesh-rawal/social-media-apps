import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InstaPostImage } from '../../Redux/Slice_Posts';
import { Inputs } from '../Forms-Items/Inputs';
import { Row } from 'react-bootstrap'
import { Card, Form } from 'antd';
import { ButtonCreative } from '../Forms-Items/Button';

const Photos = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch<any>()
    const { UserData } = useSelector((state: any) => state.Post)

    const onFinishIG = (values: any) => {
        const value = { ...values, ['token']: UserData[0].access_token }
        dispatch(InstaPostImage(value))
        form.resetFields()
    };
    return (
        <>
            <Card
                hoverable
                title="Instagram Post Photos"
                bordered={false}
                className='card-gradientIG col-4'
            >
                <Form
                    form={form}
                    name="IG_Post_Images"
                    onFinish={onFinishIG}
                    scrollToFirstError
                >
                    <Row>
                        <Inputs class="col-12" holder="Image URL" nam="InstaImage" typs="url" />
                        <Inputs class="col-12" holder="Caption Photos" nam="Instacaption" typs="text" />
                        <Inputs class="col-12 text-white" holder="User ID" nam="user_id" typs="number" />
                        <Form.Item className='d-block w-100'>
                            <ButtonCreative title="Upload Image" type='submit' />
                        </Form.Item>
                    </Row>
                </Form>
            </Card>
        </>
    )
}

export default Photos
