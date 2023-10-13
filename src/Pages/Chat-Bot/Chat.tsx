import React, { useState, useEffect } from 'react'
import { Card } from 'antd';
import './index.css'
import { useDispatch, useSelector } from 'react-redux';
import { QuotesGenerate } from '../../Redux/actions';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
    MainContainer,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
} from '@chatscope/chat-ui-kit-react';


const ChatBot = () => {
    const [messages, setMessages] = useState<any>([{
        message: "Hi there 👋\nHow can I help you today?",
        sender: "ChatGPT",
    }]);
    const { UserData } = useSelector((state: any) => state.Post)
    const dispatch = useDispatch<any>()

    const handleChat = async (message: any) => {
        setMessages([...messages, {
            message,
            direction: 'outgoing',
            sender: "user",
        }])
        dispatch(QuotesGenerate(message))
        // setchat('')
    }
    useEffect(() => {
        setMessages([...messages, ...UserData])
    }, [UserData])
    return (
        <>
            <Card
                hoverable
                title="Chat Box"
                bordered={false}
                className='card-gradientTW col-5'
                style={{
                    height: '500px'
                }}
            >
                <div className="App">
                    <div style={{ position: "relative", height: "490px" }}>
                        <MainContainer>
                            <ChatContainer>
                                <MessageList
                                >
                                    {messages.map((message: any, i: any) => {

                                        return <Message className='mt-3' key={i} model={message} />
                                    })}
                                </MessageList>
                                <MessageInput placeholder="Send a Message" onSend={handleChat} />
                            </ChatContainer>
                        </MainContainer>
                    </div>
                </div>
            </Card >
        </>
    );
};

export default ChatBot;
