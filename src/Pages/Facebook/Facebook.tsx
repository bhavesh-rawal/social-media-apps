import React from 'react'
import { Container, Row } from 'react-bootstrap'
import Photots from './Photots'
import Videos from './Videos'
import AccessToken from './AccessToken'

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
