import React, { useState } from 'react'
import { Row } from 'react-bootstrap'
import { Inputs } from '../../components/Common/Inputs'
import { useDispatch } from 'react-redux'
import { Card, Form } from 'antd';
import { ButtonCreative, ButtonFB } from '../../components/Common/Button'
import { ExtendToken } from '../../Redux/actions';


const AccessToken = () => {
    const [form] = Form.useForm();

    const dispatch = useDispatch<any>()
    const [userToken, setuserToken] = useState('')
    function handleSuccess(response: any) {
        setuserToken(response.authResponse.accessToken)
    }
    const onFinish = (values: any) => {
        const value = { ...values, userToken, ['Client_ID']: 184681667978801, ['Client_Secret_Code']: 'efdf52f029001efb72df382c05344c8c' }
        dispatch(ExtendToken(value))
        form.resetFields()
    };

    return (
        <>


            <Card
                hoverable
                title="Access Token Genrate"
                bordered={false}
                className='card-gradientFB col-4  px-3 pb-4'
            >
                <Form
                    form={form}
                    name="Access_Token"
                    onFinish={onFinish}
                    scrollToFirstError
                >
                    <Row>

                        <Inputs class="col-12 " holder="Page ID" nam="Page_ID" typs="number" />
                        {/* <Inputs class="col-12 " holder="Client ID" nam="Client_ID" typs="number" />
                        <Inputs class="col-12 " holder="Client Secret Code" nam="Client_Secret_Code" typs="text" /> */}
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