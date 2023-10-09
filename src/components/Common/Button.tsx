import React from 'react'
import './index.css'
import { CloudUploadOutlined } from '@ant-design/icons'
import { FacebookProvider, LoginButton } from 'react-facebook';
import { Input } from 'antd'

export const ButtonCreative = (props: any) => {
    return (
        <>
            <button className={`creative mt-2 ${props.class}`} type={props.type} onClick={props.click}>{props.title}</button >
        </>
    )
}
export const UploadButton = (props: any) => {

    return (<>
        <div
            className={`input-div ${props.class}`}
        >
            <Input
                name={props.name}
                className="input"
                onChange={props.change}
                type="file" />
            <span style={{ fontSize: "2rem" }} className='fileName'>
                <CloudUploadOutlined />
            </span>
        </div>
    </>
    )
}


export const ButtonFB = (props: any) => {
    return (
        <>
            <FacebookProvider appId={'184681667978801'}>
                <LoginButton
                    scope="email"
                    onSuccess={props.handleSuccess}
                    onError={(err) => console.log(err)}
                >
                    Log in with Facebook
                </LoginButton >
            </FacebookProvider>
        </>
    )
}
