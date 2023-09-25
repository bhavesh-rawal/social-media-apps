import React from 'react'
import '../../assets/Style/Button.css'
const ButtonCreative = (props: any) => {
    return (
        <>
            <button className='creative mt-2' type={props.type} onClick={props.click}>{props.title}</button>
        </>
    )
}

export default ButtonCreative
