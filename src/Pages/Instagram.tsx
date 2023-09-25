import React from 'react'
import { Container } from 'react-bootstrap'
import Photos from '../components/Instagram/Photos'
import Videos from '../components/Instagram/Videos'

const Instagram = () => {
    return (
        <>
            <div style={{
                backgroundImage: "url( 'https://i.pinimg.com/564x/f5/1e/19/f51e19e5299212738bec7984bba8fe05.jpg')",
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                padding: '5rem'
            }}>
                <Container>
                    <div className='d-flex justify-content-end'>
                        <Photos />
                    </div>
                    <br />
                    <div className='d-flex justify-content-end'>

                        <Videos />
                    </div>

                </Container >
            </div   >
        </>
    )
}

export default Instagram
