import React from 'react';
import { useDispatch } from 'react-redux';
import { TwitterTweet } from '../../Redux/Slice_Posts';
import { Inputs } from '../Forms-Items/Inputs';
import { Row } from 'react-bootstrap'
import { Card, Form } from 'antd';
import { ButtonCreative } from '../Forms-Items/Button';

const Tweet = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch<any>()

    const onFinishTW = (values: any) => {
        dispatch(TwitterTweet(values))
        // form.resetFields()
    };
    return (
        <>
            <Card
                hoverable
                title="Twitter Post Tweet"
                bordered={false}
                className='card-gradientTW col-5'
            >
                <Form
                    form={form}
                    name="Twitter_Post_Tweet"
                    onFinish={onFinishTW}
                    scrollToFirstError
                >
                    <Row>
                        <Inputs class="col-12" holder="Api Key" nam="Api_Key" typs="text" />
                        <Inputs class="col-12" holder="Api Secret Key" nam="Api_Secret_Key" typs="text" />
                        <Inputs class="col-12" holder="Tweet" nam="tweetText" typs="text" />
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
