import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InstaPostVideo } from '../../Redux/Slice_Posts';
import { Inputs } from '../Forms-Items/Inputs';
import { Row } from 'react-bootstrap'
import { Card, Form } from 'antd';
import { ButtonCreative } from '../Forms-Items/Button';
const Videos = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch<any>()

    const { UserData } = useSelector((state: any) => state.Post)

    const onFinishIG = (values: any) => {
        const value = { ...values, ['token']: UserData[0].access_token }
        dispatch(InstaPostVideo(value))
        form.resetFields()
    };
    return (
        <>
            <Card
                hoverable
                title="Instagram Post Videos"
                bordered={false}
                className='card-gradientIG text-white col-4'
            >
                <Form
                    form={form}
                    name="IG_Post_Videos"
                    onFinish={onFinishIG}
                    scrollToFirstError
                >
                    <Row>
                        <Inputs class="col-12" holder="Video URL" nam="Video_url" typs="url" />
                        <Inputs class="col-12" holder="Caption Videos" nam="Instacaption" typs="text" />
                        <Inputs class="col-12" holder="User ID" nam="user_id" typs="number" />
                        <Form.Item className='d-block w-100'>
                            <ButtonCreative title="Upload Video" type='submit' />
                        </Form.Item>
                    </Row>
                </Form>
            </Card>
        </>
    )
}
export default Videos

