import React, { useState } from 'react'
import { Row } from 'react-bootstrap'
import { Inputs } from '../Forms-Items/Inputs'
import { useDispatch, useSelector } from 'react-redux'
import { PostVideosFB } from '../../Redux/Slice_Posts'
import { Card, Form } from 'antd'
import { ButtonCreative, UploadButton } from '../Forms-Items/Button'
const Videos = () => {
    const [form] = Form.useForm();
    const [file, setfile] = useState({ name: '' });
    const dispatch = useDispatch<any>()

    const { UserData } = useSelector((state: any) => state.Post)
    const Fileset = (e: any) => {
        setfile(e.target.files[0])
    }

    const onFinishFB = (values: any) => {
        const value = { ...values, file, ['token']: UserData[0].access_token }
        dispatch(PostVideosFB(value))
        form.resetFields()
    };
    return (
        <>
            <Card
                hoverable
                title="Facebook Post Videos"
                bordered={false}
                className='card-gradientFB col-3 px-3 pb-4'
            >
                <Form
                    form={form}
                    name="FB_Post_Videos"
                    onFinish={onFinishFB}
                    scrollToFirstError
                >
                    <Row>
                        <UploadButton class="col-12 m-3" nam="Video" change={Fileset} />
                        <span className='fileName'>{file.name}</span>
                        <Inputs class="col-12" holder="Caption Videos" nam="Caption" typs="text" />
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
