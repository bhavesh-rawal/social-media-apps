import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GenrateuserID } from '../../Redux/Slice_Posts';
import { Inputs } from '../../components/Common/Inputs';
import { Row } from 'react-bootstrap'
import { Card, Form } from 'antd';
import { ButtonCreative, UploadButton } from '../../components/Common/Button';
import { InstaPostVideo } from '../../Redux/actions';
const Videos = () => {
    const [form] = Form.useForm();
    const [file, setfile] = useState({ name: '' });
    const dispatch = useDispatch<any>()

    const { UserData } = useSelector((state: any) => state.Post)

    const onFinishIG = (values: any) => {
        const value = { ...values, file, ['token']: UserData[0].access_token }
        dispatch(InstaPostVideo(value))
        form.resetFields()
    };
    const Fileset = (e: any) => {
        setfile(e.target.files[0])

    }
    return (
        <>
            <Card
                hoverable
                title="Instagram Post Videos"
                bordered={false}
                className='card-gradientIG text-white col-4 px-3 pb-4'
            >
                <Form
                    form={form}
                    name="IG_Post_Videos"
                    onFinish={onFinishIG}
                    scrollToFirstError
                >
                    <Row>
                        {/* <Inputs class="col-12 pt-2" holder="Video URL" nam="Video_url" typs="url" /> */}
                        <UploadButton class="col-12 m-3" nam="Image" change={Fileset} />
                        <Inputs class="col-12" holder="Caption Videos" nam="Instacaption" typs="text" />
                        <Inputs class="col-12" holder="User ID" nam="user_id" typs="number" />
                        <Form.Item className='d-block w-100'>
                            <ButtonCreative title="Upload Video" type='submit' />
                        </Form.Item>
                        <div className='text-white'>
                            Don't have a user ID, Click here & Copy
                            <button type="button" onClick={(e) => dispatch(GenrateuserID())} className="btn btn-link m-0 p-0">Link</button>
                        </div>
                    </Row>
                </Form>
            </Card>
        </>
    )
}
export default Videos

