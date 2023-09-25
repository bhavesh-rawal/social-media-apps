import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postTweet } from '../../Redux/Slice_Posts';
import { Inputs } from '../Forms-Items/Inputs';
import { Row } from 'react-bootstrap'
import { Card, Form } from 'antd';

const Tweet = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch<any>()

    const onFinishIG = (values: any) => {
        const value = { ...values }
        dispatch(postTweet(value))
        form.resetFields()
    };
    return (
        <>
            <Card
                hoverable
                title="Twitter Post Tweet"
                bordered={true}
                style={{ backgroundColor: "#FFFDF9" }}
            >
                   <Form
                    form={form}
                    name="Twitter_Post_Tweet"
                    onFinish={onFinishIG}
                    scrollToFirstError
                >
                    <Row>
                        <Inputs class="col-6" holder="Tweet" nam="tweet" typs="text" />
                        {/* <Inputs class="col-6" holder="Caption" nam="Instacaption" typs="text" />
                                <Inputs class="col-6" holder="Image URL" nam="InstaImage" typs="url" /> */}
                        <Form.Item className='d-block w-100'>
                            <button type="submit" className='btn btn-outline-secondary'>Upload Tweet on Twitter</button>
                        </Form.Item>
                    </Row>
                </Form>
            </Card>
        </>
    )
}

export default Tweet
