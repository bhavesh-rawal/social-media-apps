import React, { useState } from 'react'
import { Row } from 'react-bootstrap'
import { Inputs } from '../Forms-Items/Inputs'
import { useDispatch, useSelector } from 'react-redux'
import { PostVideosFB } from '../../Redux/Slice_Posts'
import { Card, Form } from 'antd'
import ButtonCreative from '../Forms-Items/Button'
const Videos = () => {
    const [form] = Form.useForm();
    const [file, setfile] = useState('');

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
                style={{ backgroundColor: "#8597E3", width: '40rem' }}
            >
                <Form
                    form={form}
                    name="FB_Post_Videos"
                    onFinish={onFinishFB}
                    scrollToFirstError
                >
                    <Row>
                        <Inputs class="col-12" style={{ backgroundColor: "#8597E3" }} change={Fileset} holder="Choose Your Video" nam="Video" typs="file" />
                        <Inputs class="col-12" style={{ backgroundColor: "#8597E3" }} holder="Caption" nam="Caption" typs="text" />
                        <Form.Item className='d-block w-100'>
                            {/* <button type="submit" className='btn btn-outline-light'>Upload Video on Facebook</button> */}
                            <ButtonCreative title="Upload Video" type='submit' />
                        </Form.Item>
                    </Row>
                </Form>
            </Card>

        </>
    )
}

export default Videos
