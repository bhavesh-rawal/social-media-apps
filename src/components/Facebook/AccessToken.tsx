import React, { useState } from 'react'
import { Row } from 'react-bootstrap'
import { Inputs } from '../Forms-Items/Inputs'
import { useDispatch } from 'react-redux'
import { ExtendToken } from '../../Redux/Slice_Posts'
import { Card, Form } from 'antd';
import { ButtonCreative, ButtonFB } from '../Forms-Items/Button'


const AccessToken = () => {
    const [form] = Form.useForm();

    const dispatch = useDispatch<any>()
    const [userToken, setuserToken] = useState('')
    function handleSuccess(response: any) {
        setuserToken(response.authResponse.accessToken)
    }
    const onFinish = (values: any) => {
        const value = { ...values, userToken }
        dispatch(ExtendToken(value))
        form.resetFields()
    };

    return (
        <>


            <Card
                hoverable
                title="Access Token Genrate"
                bordered={false}
                className='card-gradientFB col-4'
            >
                <Form
                    form={form}
                    name="Access_Token"
                    onFinish={onFinish}
                    scrollToFirstError
                >
                    <Row>

                        <Inputs class="col-12 " holder="Page ID" nam="Page_ID" typs="number" />
                        <Inputs class="col-12 " holder="Client ID" nam="Client_ID" typs="number" />
                        <Inputs class="col-12 " holder="Client Secret Code" nam="Client_Secret_Code" typs="text" />
                        <Form.Item className='d-block w-100'>
                            <ButtonCreative title="Genrate" class='' type='submit' />
                        </Form.Item>
                        <div className='col-12'>
                            <ButtonFB handleSuccess={handleSuccess} />
                        </div>
                    </Row>
                </Form>

            </Card>

        </>
    )
}

export default AccessToken
