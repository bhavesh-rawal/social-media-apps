import React from 'react'
import '../../assets/Style/Button.css'
import { CloudUploadOutlined } from '@ant-design/icons'
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
