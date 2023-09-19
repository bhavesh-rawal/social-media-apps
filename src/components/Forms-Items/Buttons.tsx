import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export const Button_Bootstrap = (props: any) => {
    return (
        <Button onClick={props.click} variant={props.variants} className={props.class} type={props.typs}>{props.title}</Button>
    )
}

