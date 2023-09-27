import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postTweet } from '../../Redux/Slice_Posts';
import { Inputs } from '../Forms-Items/Inputs';
import { Row } from 'react-bootstrap'
import { Card, Form } from 'antd';
import { ButtonCreative } from '../Forms-Items/Button';

const Tweet = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch<any>()

    const onFinishTW = (values: any) => {
        const value = { ...values }
        dispatch(postTweet(value))
        form.resetFields()
    };
    return (
        <>
            <Card
                hoverable
                title="Twitter Post Tweet"
                bordered={false}
                style={{ width: '40rem' }}
                className='card-gradientTW'
            >
                <Form
                    form={form}
                    name="Twitter_Post_Tweet"
                    onFinish={onFinishTW}
                    scrollToFirstError
                >
                    <Row>
                        <Inputs class="col-6" holder="Tweet" nam="tweet" typs="text" />
                        <Form.Item className='d-block w-100'>
                            <ButtonCreative title="Upload Tweet" type='submit' />
                        </Form.Item>
                    </Row>
                </Form>
            </Card>
        </>
    )
}

export default Tweet
