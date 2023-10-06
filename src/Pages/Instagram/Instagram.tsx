import React from 'react'
import { Container } from 'react-bootstrap'
import Photos from './Photos'
import Videos from './Videos'

const Instagram = () => {
    return (
        <>
            <div className='IG '>
                <Container className='d-flex justify-content-between MB-Display'>
                    <Photos />
                    <Videos />
                </Container >
            </div   >
        </>
    )
}

export default Instagram
