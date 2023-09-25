import React, { useState } from 'react'
import { Row } from 'react-bootstrap'
import { Inputs } from '../Forms-Items/Inputs'
import { useDispatch } from 'react-redux'
import { ExtendToken } from '../../Redux/Slice_Posts'
import { FacebookProvider, LoginButton } from 'react-facebook';
import { Card, Form } from 'antd';
import ButtonCreative from '../Forms-Items/Button'


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
            <div className='mb-2'>
                <FacebookProvider appId={'184681667978801'}>
                    <LoginButton
                        scope="email"
                        onSuccess={handleSuccess}
                        onError={(err) => console.log(err)}
                    >
                        Log in with Facebook
                    </LoginButton >
                </FacebookProvider>
            </div>
            <Card
                hoverable
                title="Access Token Genrate"
                bordered={false}
                style={{
                    background: 'rgb(192,198,234)',
                    backgroundImage: 'linear-gradient(0deg, rgba(192,198,234,1) 0%, rgba(126,143,222,1) 100%)',
                    width: '40rem',
                }}
            >
                <Form
                    form={form}
                    name="Access_Token"
                    onFinish={onFinish}
                    scrollToFirstError
                >
                    <Row>

                        <Inputs class="col-12" style={{
                            background: 'rgb(192,198,234)',
                            backgroundImage: 'linear-gradient(0deg, rgba(192,198,234,1) 50%, rgba(126,143,222,1) 100%)',
                        }} holder="Page ID" nam="Page_ID" typs="number" />
                        <Inputs class="col-12" style={{
                            background: 'rgb(192,198,234)',
                            backgroundImage: 'linear-gradient(0deg, rgba(192,198,234,1) 50%, rgba(126,143,222,1) 100%)',
                        }} holder="Client ID" nam="Client_ID" typs="number" />
                        <Inputs class="col-12" style={{
                            background: 'rgb(192,198,234)',
                            backgroundImage: 'linear-gradient(0deg, rgba(192,198,234,1) 50%, rgba(126,143,222,1) 100%)',
                        }} holder="Client Secret Code" nam="Client_Secret_Code" typs="text" />
                        <Form.Item className='d-block w-100'>

                            <ButtonCreative title="Genrate" type='submit' />
                            {/* <button type="submit" className='btn btn-outline-light'>Genrate</button> */}
                        </Form.Item>

                    </Row>
                </Form>

            </Card>
        </>
    )
}

export default AccessToken
