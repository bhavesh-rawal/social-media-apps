import React from 'react'
import Tweet from '../components/Twitter/Tweet'
import { Container } from 'react-bootstrap'

const Twitter = () => {
  return (
    <>
      <div style={{
        backgroundImage: "url('https://i.pinimg.com/564x/d5/ff/75/d5ff75615f879adb3e2d9370af003e86.jpg')",
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        padding: '5rem'
      }}>
        <Container>

          <Tweet />
        </Container>
      </div>
    </>
  )
}
export default Twitter