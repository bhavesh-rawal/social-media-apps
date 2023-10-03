import React from 'react'
import Tweet from '../components/Twitter/Tweet'
import { Container } from 'react-bootstrap'

const Twitter = () => {
  return (
    <>
      <div className='TW'>
        <Container className='MB-Display justify-content-center d-flex'>

          <Tweet />
        </Container>
      </div>
    </>
  )
}
export default Twitter