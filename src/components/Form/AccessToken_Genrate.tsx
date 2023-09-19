import React, { useState } from 'react'
import { Card, Container, Row } from 'react-bootstrap'
import { Inputs } from '../Forms-Items/Inputs'
import { useDispatch } from 'react-redux'
import { ExtendToken } from '../../Redux/Slice_Posts'
import { FacebookProvider, LoginButton } from 'react-facebook';

const AccessToken_Genrate = () => {
    const dispatch = useDispatch<any>()
    const [userToken, setuserToken] = useState('')
    const [Data, setData] = useState({ Page_ID: '', Client_Secret_Code: '', Client_ID: '' });

    const handleOnchange = (e: any) => {
        const Nam = e.target.name
        const Value = e.target.value
        setData(data => ({ ...Data, [Nam]: Value, userToken }))
    }

    function handleSuccess(response: any) {
        setuserToken(response.authResponse.accessToken)
    }
    
    return (
        <>
            <Container>
                <div className='mb-2'>
                    <FacebookProvider appId='184681667978801'>
                        <LoginButton
                            scope="email"
                            onSuccess={handleSuccess}
                            onError={(err) => console.log(err)}
                        >
                            Log in with Facebook
                        </LoginButton >
                    </FacebookProvider>
                </div>
                <Card>
                    <Card.Header>Access Token Genrate</Card.Header>
                    <Card.Body>
                        <Row>
                            <Inputs class="col-6" change={handleOnchange} blur={handleOnchange} holder="Page ID" value={Data.Page_ID} nam="Page_ID" typs="number" />
                            <Inputs class="col-6" change={handleOnchange} blur={handleOnchange} holder="Client ID" value={Data.Client_ID} nam="Client_ID" typs="number" />
                            <Inputs class="col-6" change={handleOnchange} blur={handleOnchange} holder="Client Secret Code" value={Data.Client_Secret_Code } nam="Client_Secret_Code" typs="text" />
                        </Row>
                        <button onClick={(e) => dispatch(ExtendToken(Data))}>Genrate Token</button>
                    </Card.Body>
                </Card>
            </Container >
        </>
    )
}

export default AccessToken_Genrate
