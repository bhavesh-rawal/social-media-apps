import React, { useState } from 'react'
import { Card } from 'antd';
import axios from 'axios';
import './TW.css'
import { RobotOutlined, SendOutlined } from '@ant-design/icons';

import ImageList from '@mui/material/ImageList'
import { useDispatch } from 'react-redux';
import { QuotesGenerate } from '../../Redux/Slice_Posts';
import { ButtonCreative } from '../Forms-Items/Button';

const Tweet = () => {
    const [messages, setMessages] = useState<any>([{ text: 'Hi there 👋\nHow can I help you today?', type: 'bot' }]);
    const [chat, setchat] = useState('')
    const dispatch = useDispatch<any>()


    const handleMessages = async (message: string) => {

        setMessages([...messages, { text: chat, type: 'user' }])
        try {

            const response = await axios.get(
                `https://api.api-ninjas.com/v1/thesaurus?word=${message}`,
                {
                    headers: {
                        "X-Api-Key": "riB2ysaiPMXUBBBYE6k9mQ==854KIpb7YIkjJOzN",
                    },
                }
            );

            const synonyms = response.data.synonyms || [];

            let quote = "";

            for (const synonym of synonyms) {
                const quoteResponse = await axios.get(
                    `https://api.api-ninjas.com/v1/quotes?category=${synonym}`,
                    {
                        headers: {
                            "X-Api-Key": "riB2ysaiPMXUBBBYE6k9mQ==854KIpb7YIkjJOzN",
                        },
                    }
                );
                const synonymQuote = quoteResponse.data[0]?.quote || "";

                if (synonymQuote) {
                    quote = synonymQuote;
                    break;
                }
            }
            if (quote === "") {
                setMessages([...messages, { text: chat, type: 'user' }, { text: `I don't type:\nWhat else can I do to help you?`, type: 'bot' }])
            } else {
                setMessages([...messages, { text: chat, type: 'user' }, { text: quote, type: 'bot' }])
            }
            return quote;
        } catch (error) {
            console.error("Error:", error);
        }
    }
    const handleChat = async () => {
        handleMessages(chat)
        setchat('')
    }
    const TweetPost = async () => {
        window.open('https://twitter.com/intent/tweet?text=Hello Duniya Walo')
    }

    return (
        <>        <Card
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
                        messages.map((message: any, index: any) => (
                            ('bot' === message.type) ? <li className={`chat incoming`}>
                                <RobotOutlined className='fs-3 justify-content-center' />
                                <p>{message.text}</p>
                            </li> :
                                <li className={`chat outgoing`}>
                                    <p>{message.text}</p>
                                </li>
                        ))
                    }
                </ul>
            </div>
            <div className="chat-input">
                <input placeholder="Enter a message..." onKeyPress={(e: any) => {
                    if (e.key === 'Enter') {
                        handleChat()
                    }
                }}
                    value={chat || ''}
                    onChange={(e) => setchat(e.target.value)}
                />
                <SendOutlined onClick={handleChat} />
            </div>
            <ButtonCreative click={TweetPost} title="Upload Tweet" type='button' />
        </Card >
        </>
    );
};

export default Tweet;
