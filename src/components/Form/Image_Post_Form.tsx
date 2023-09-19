import React, { useState } from 'react'
import { Card, Container, Row } from 'react-bootstrap'
import { Inputs } from '../Forms-Items/Inputs'
import { useDispatch, useSelector } from 'react-redux'
import { InstaPostImage, PostImageFB } from '../../Redux/Slice_Posts'

const Image_Post_Form = () => {
    const { UserData } = useSelector((state: any) => state.Post)

    const dispatch = useDispatch<any>()
    const [Data, setData] = useState({ Caption: '', Image: '', user_id: '', InstaImage: '', Instacaption: '' });

    const handleOnchange = (e: any) => {
        const Nam = e.target.name
        const Value = e.target.value
        setData(data => ({ ...Data, [Nam]: Value, ['token']: UserData[0].access_token }))
    }
    return (
        <>
            <Container>
                <Card>
                    <Card.Header>Facebook Post Images</Card.Header>
                    <Card.Body>
                        <Row>
                            <Inputs class="col-6" change={handleOnchange} blur={handleOnchange} holder="Caption" nam="Caption" value={Data.Caption} typs="text" />
                            <Inputs class="col-6" change={handleOnchange} blur={handleOnchange} holder="Image URL" nam="Image" value={Data.Image} typs="url" />
                        </Row>
                        <button onClick={(e) => dispatch(PostImageFB(Data))}>Upload Image</button>
                    </Card.Body>
                </Card>
                <br />
                <Card>
                    <Card.Header>Instagram Post Images</Card.Header>
                    <Card.Body>
                        <Row>
                            <Inputs class="col-6" change={handleOnchange} blur={handleOnchange} holder="User ID" nam="user_id" value={Data.user_id} typs="number" />
                            <Inputs class="col-6" change={handleOnchange} blur={handleOnchange} holder="Caption" nam="Instacaption" value={Data.Instacaption} typs="text" />
                            <Inputs class="col-6" change={handleOnchange} blur={handleOnchange} holder="Image URL" nam="InstaImage" value={Data.InstaImage} typs="url" />
                        </Row>
                        <button onClick={(e) => dispatch(InstaPostImage(Data))}>Insta Image Post</button>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}

export default Image_Post_Form
