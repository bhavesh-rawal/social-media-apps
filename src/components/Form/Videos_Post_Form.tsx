import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InstaPostVideo, PostVideosFB } from '../../Redux/Slice_Posts';
import { Inputs } from '../Forms-Items/Inputs';
import { Card, Container, Row } from 'react-bootstrap'
const Videos_Post_Form = () => {
    const [file, setfile] = useState('');
    const { UserData } = useSelector((state: any) => state.Post)

    const [Data, setData] = useState({ Video: '', Caption: '', user_id: '', Instacaption: '', Video_url: '' });
    const dispatch = useDispatch<any>()

    const handleOnchange = (e: any) => {
        const Nam = e.target.name
        const Value = e.target.value
        setData(post => ({ ...Data, [Nam]: Value, file, ['token']: UserData[0].access_token }))
    }

    const Fileset = (e: any) => {
        setfile(e.target.files[0])
    }
    return (
        <>
            <Container>
                <Card>
                    <Card.Header>Facebook Post Videos</Card.Header>
                    <Card.Body>
                        <Row>
                            <Inputs class="col-6" change={Fileset} holder="Choose Your Video" nam="Video" typs="file" />
                            <Inputs class="col-6" change={handleOnchange} blur={handleOnchange} holder="Caption" nam="Caption" value={Data.Caption} typs="text" />
                        </Row>
                        <button onClick={(e) => dispatch(PostVideosFB(Data))}>Upload Video</button>
                    </Card.Body>
                </Card>
                <br />
                <Card>
                    <Card.Header>Instagram Post Videos</Card.Header>
                    <Card.Body>
                        <Row>
                            <Inputs class="col-6" change={handleOnchange} blur={handleOnchange} holder="Video URL" nam="Video_url" value={Data.Video_url} typs="url" />
                            {/* <Inputs class="col-6" change={Fileset} holder="Choose Your Video" nam="Video_url" typs="file" /> */}

                            <Inputs class="col-6" change={handleOnchange} blur={handleOnchange} holder="User ID" nam="user_id" value={Data.user_id} typs="number" />
                            <Inputs class="col-6" change={handleOnchange} blur={handleOnchange} holder="Caption" nam="Instacaption" value={Data.Instacaption} typs="text" />
                        </Row>
                        <button onClick={(e) => dispatch(InstaPostVideo(Data))}>Insta Upload Video</button>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}

export default Videos_Post_Form
