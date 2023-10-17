import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Inputs } from '../../components/Common/Inputs';
import { Row } from 'react-bootstrap'
import { Card, Form } from 'antd';
import { ButtonCreative, UploadButton } from '../../components/Common/Button';
import { InstaPostImage } from '../../Redux/actions';

const Photos = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch<any>()
    const { UserData } = useSelector((state: any) => state.Post)
    const [file, setfile] = useState({ name: '' });

    const onFinishIG = (values: any) => {
        const value = { ...values, file, ['token']: UserData[0].access_token }
        dispatch(InstaPostImage(value))
        form.resetFields()
    };
    const Fileset = (e: any) => {
        setfile(e.target.files[0])

    }
    return (
        <>
            <Card
                hoverable
                title="Instagram Post Photos"
                bordered={false}
                className='card-gradientIG col-4 px-3 pb-4'
            >
                <Form
                    form={form}
                    name="IG_Post_Images"
                    onFinish={onFinishIG}
                    scrollToFirstError
                >
                    <Row>
                       <UploadButton class="col-12 m-3" nam="Image" change={Fileset} />

                        <Inputs class="col-12" holder="Caption Photos" nam="Instacaption" typs="text" />
                        <Inputs class="col-12 text-white" holder="User ID" nam="user_id" typs="number" />
                        <Form.Item className='d-block w-100'>
                            <ButtonCreative title="Upload Image" type='submit' />
                        </Form.Item>
                    </Row>
                </Form>
            </Card>
        </>
    )
}

export default Photos
