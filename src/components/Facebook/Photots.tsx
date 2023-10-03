import React, { useState } from 'react'
import { Row } from 'react-bootstrap'
import { Inputs } from '../Forms-Items/Inputs'
import { useDispatch, useSelector } from 'react-redux'
import { PostImageFB } from '../../Redux/Slice_Posts'
import { Card, Form } from 'antd'
import { ButtonCreative, UploadButton } from '../Forms-Items/Button'
const Photots = () => {
    const dispatch = useDispatch<any>()
    const { UserData } = useSelector((state: any) => state.Post)
    const [file, setfile] = useState({ name: '' });

    const [form] = Form.useForm();
    const onFinishFB = (values: any) => {
        const value = { ...values, file, ['token']: UserData[0].access_token }
        dispatch(PostImageFB(value))
      
        form.resetFields()
    };
    const Fileset = (e: any) => {
        setfile(e.target.files[0])
     
    }
    return (
        <>
            <Card
                hoverable
                title="Facebook Post Images"
                bordered={false}
                className='card-gradientFB col-3 px-3 pb-4'
            >
                <Form
                    form={form}
                    name="FB_Post_Images"
                    onFinish={onFinishFB}
                    scrollToFirstError
                >
                    <Row>
                        <UploadButton class="col-12 m-3" nam="Image" change={Fileset} />
                        <span className='fileName'>{file.name}</span>
                        <Inputs class="col-12" holder="Caption Photos" nam="Caption" typs="text" />
                        <Form.Item className='d-block w-100'>
                            <ButtonCreative title="Upload Image" type='submit' />
                        </Form.Item>
                    </Row>
                </Form>
            </Card>
        </>
    )
}

export default Photots
