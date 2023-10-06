import { SendOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { QuotesGenerate } from '../../Redux/actions';

const MessageText = (props: any) => {

    return (
        <>
            <div className="chat-input">
                <input placeholder="Enter a message..." onKeyPress={(e: any) => {
                    if (e.key === 'Enter') {
                        props.handle()
                    }
                }}
                    value={props.chat || ''}
                    onChange={(e) => props.chatset(e.target.value)}
                />
                <SendOutlined onClick={props.handle} />
            </div>
        </>
    )
}

export default MessageText
