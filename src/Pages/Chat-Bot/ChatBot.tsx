import React from 'react'
import { Container } from 'react-bootstrap'
import Chat from './Chat'

const ChatBot = () => {
  return (
    <>
      <div className='TW'>
        <Container className='MB-Display justify-content-center d-flex'>
          <Chat />
        </Container>
      </div>
    </>
  )
}
export default ChatBot