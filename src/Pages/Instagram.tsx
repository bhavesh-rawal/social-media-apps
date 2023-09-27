import React from 'react'
import { Container } from 'react-bootstrap'
import Photos from '../components/Instagram/Photos'
import Videos from '../components/Instagram/Videos'

const Instagram = () => {
    return (
        <>
            <div className='IG '>
                <Container className='d-flex justify-content-between'>
                    <Photos />
                    <Videos />
                </Container >
            </div   >
        </>
    )
}

export default Instagram
