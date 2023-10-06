import React, { useState, useEffect } from 'react'
import { Card } from 'antd';
import './TW.css'
import { RobotOutlined, SendOutlined } from '@ant-design/icons';

import { useDispatch, useSelector } from 'react-redux';
import { QuotesGenerate } from '../../Redux/actions';
import MessageText from '../../components/Common/MessageText';

const ChatBot = () => {
    const [messages, setMessages] = useState<any>([]);
    const { UserData } = useSelector((state: any) => state.Post)
    const [chat, setchat] = useState('')
    const dispatch = useDispatch<any>()

    const handleChat = async () => {
        setMessages([...messages, { text: chat, type: 'user' }])
        dispatch(QuotesGenerate(chat))
        setchat('')
    }
    useEffect(() => {
        const allQuotes = (UserData
            .filter((message: any) => message.type !== 'user')
            .map((message: any) => message.quote)
            .join('\n\n')) || 'Hi there 👋\nHow can I help you today?';

        setMessages([...messages, { ['quote']: allQuotes }])

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
                <div className="chatbot w-100 p-3"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '387px',
                        overflowY: 'scroll'
                    }}
                >
                    <ul className="chatbox p-0">
                        {
                            messages.map((message: any, index: number) => (
                                ('user' !== message.type) ? <li key={`bot-incoming${index}`} className={`chat incoming`}>
                                    <RobotOutlined className='fs-3 justify-content-center robot' />
                                    <p >{message.quote}</p>

                                </li> :
                                    <li key={`user-outgoing${index}`} className={`chat outgoing`}>
                                        <p>{message.text}</p>
                                    </li>
                            ))
                        }
                    </ul>
                </div>
                <MessageText handle={handleChat} chat={chat} chatset={setchat} />
                {/* <ButtonCreative click={TweetPost} title="Upload Tweet" type='button' /> */}
            </Card >
        </>
    );
};

export default ChatBot;
