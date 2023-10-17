import React, { useState } from 'react'
import { Row } from 'react-bootstrap'
import { Inputs } from '../../components/Common/Inputs'
import { useDispatch, useSelector } from 'react-redux'
import { PostVideosFB } from '../../Redux/Slice_Posts'
import { Card, Form } from 'antd'
import { ButtonCreative, UploadButton } from '../../components/Common/Button'
import { InstaPostVideo } from '../../Redux/actions'
import Swal from 'sweetalert2'
const Videos = () => {
    const [file, setfile] = useState({ name: '' });
    const [caption, setCaption] = useState<any>({ Caption: '' });
    const dispatch = useDispatch<any>()
    const { UserData } = useSelector((state: any) => state.Post)


    const onFinishFB = async () => {
        const value = { ...caption, file, ...UserData }
        await dispatch(PostVideosFB(value))
        await dispatch(InstaPostVideo(value))
        await Swal.fire("Post!", "Your Video Post SuccussFully!", "success");
        setfile({ name: '' })
        setCaption({ Caption: '' })
    };

    return (
        <>
            <Card
                hoverable
                title="Post Videos"
                bordered={false}
                className='card-gradientFB col-4 px-3 pb-4'
            >

                <Row>
                    <UploadButton class="col-12 m-3" nam="Video" change={(e: any) => setfile(e.target.files[0])} />
                    <span className='fileName'>{file.name}</span>
                    <Inputs class="col-12" holder="Caption Videos" value={caption.Caption || ''} change={(e: any) => setCaption({ [e.target.name]: e.target.value })} nam="Caption" typs="text" />
                    <div className='d-block w-100'>
                        <ButtonCreative title="Upload Video" type='button' click={onFinishFB} />
                    </div>
                </Row>

            </Card>

        </>
    )
}

export default Videos
