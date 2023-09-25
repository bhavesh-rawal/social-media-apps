import React from 'react'
import { Container } from 'react-bootstrap'
import Photots from '../components/Facebook/Photots'
import Videos from '../components/Facebook/Videos'
import AccessToken from '../components/Facebook/AccessToken'

const Facebook = () => {
  return (
    <>
      <div style={{
        backgroundImage: "url( 'https://i.pinimg.com/564x/0c/de/73/0cde738b78d894592cc02933f089a790.jpg')",
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        padding: '5rem'
      }}>
        <Container >
          <AccessToken />

          <br />
          <div className='d-flex justify-content-end'>
            <Photots />
          </div>
          <br />
          <Videos />
        </Container>
      </div>
    </>
  )
}

export default Facebook
