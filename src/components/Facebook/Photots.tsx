import React, { useState } from 'react'
import { Row } from 'react-bootstrap'
import { Inputs } from '../Forms-Items/Inputs'
import { useDispatch, useSelector } from 'react-redux'
import { PostImageFB } from '../../Redux/Slice_Posts'
import { Card, Form } from 'antd'
import ButtonCreative from '../Forms-Items/Button'
const Photots = () => {
    const dispatch = useDispatch<any>()
    const { UserData } = useSelector((state: any) => state.Post)
    const [file, setfile] = useState('');

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
                style={{ backgroundColor: "#929FE5", width: '40rem' }}
            >
                <Form
                    form={form}
                    name="FB_Post_Images"
                    onFinish={onFinishFB}
                    scrollToFirstError
                >
                    <Row>
                        <Inputs class="col-12" style={{ backgroundColor: "#929FE5" }} change={Fileset} holder="Image URL" nam="Image" typs="file" />
                        <Inputs class="col-12" style={{ backgroundColor: "#929FE5" }} holder="Caption" nam="Caption" typs="text" />
                        <Form.Item className='d-block w-100'>
                            {/* <button type="submit" className='btn btn-outline-light'>Upload Image on Facebook</button> */}
                            <ButtonCreative title="Upload Image" type='submit' />
                        </Form.Item>
                    </Row>
                </Form>
            </Card>
        </>
    )
}

export default Photots
