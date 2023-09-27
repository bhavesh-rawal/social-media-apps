import React from 'react'
import { Container, Row } from 'react-bootstrap'
import Photots from '../components/Facebook/Photots'
import Videos from '../components/Facebook/Videos'
import AccessToken from '../components/Facebook/AccessToken'

const Facebook = () => {
  return (
    <>
      <div className='FB'>
        <Container >
          <Row className='justify-content-between MB-Display'>
            <AccessToken />

            <Photots />

            <Videos />
          </Row>
        </Container>
      </div>
    </>
  )
}

export default Facebook
