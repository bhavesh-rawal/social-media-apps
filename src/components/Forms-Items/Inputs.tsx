import React from 'react'
import { Form, Input } from 'antd'
import TextField from '@mui/material/TextField';


export const Inputs = (props: any) => {
    return (<>

        {/*         
           <Form.Item
            name={props.nam}
            label={props.holder}
            className={props.class}
            rules={[
                { required: true, message: `Please input your ${props.holder}!` },
            ]}
        >
            <Input
                placeholder={`Enter ${props.holder}`}
                type={props.typs} />
        </Form.Item>
     */}
        <Form.Item
            name={props.nam}

            className={props.class}
            rules={[
                { required: true, message: `Please input your ${props.holder}!` },
            ]}
        >
            {/* <Input

                placeholder={`Enter ${props.holder}`}
            /> */}

            <TextField style={props.style}
                onChange={props.change}
                onBlur={props.blur}
                type={props.typs}
                fullWidth sx={{ m: 1 }}
                id="standard-basic" label={props.holder} variant="standard" />
        </Form.Item>
    </>
    )
}
export const Inputs_Mail = (props: any) => {
    return (<>

        <Form.Item
            name={props.nam}
            label={props.holder}
            className={props.class}
            rules={[
                {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                },
                {
                    required: true,
                    message: 'Please input your E-mail!',
                },
            ]}
        >
            <Input
                placeholder={`Enter ${props.holder}`}
            />
        </Form.Item>
    </>
    )
}

export const Inputs_Password = (props: any) => {
    return (<>

        <Form.Item
            className={props.class}
            name={props.nam}
            label={props.holder}
            rules={[
                { required: true, message: `Please input your ${props.holder}!` },
            ]}
        >
            <Input.Password
                placeholder={`Enter ${props.holder}`}
                type={props.typs} />
        </Form.Item>
    </>
    )
}


export const Inputs_Confirm_Password = (props: any) => {
    return (<>
        <Form.Item
            name={props.nam}
            className={props.class}
            label={`Confirm ${props.holder}`}
            dependencies={['password']}
            hasFeedback
            rules={[
                {
                    required: true,
                    message: `Please confirm your ${props.holder}!`,
                },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                        }
                        return Promise.reject(new Error('The new password that you entered do not match!'));
                    },
                }),
            ]}
        >
            <Input.Password
                placeholder={`Enter Confirm ${props.holder}`}
            />
        </Form.Item>
    </>
    )
}