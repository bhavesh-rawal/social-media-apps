import React, { useEffect, useState } from 'react'
import { Row } from 'react-bootstrap'
import { Inputs } from '../../components/Common/Inputs'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Form } from 'antd';
import { ButtonCreative, ButtonFB } from '../../components/Common/Button'
import { ExtendToken, pageList } from '../../Redux/actions';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';


const AccessToken = () => {
    const [page, setPage] = useState<any>([]);
    const [pageID, setPageID] = useState<any>('');
    const dispatch = useDispatch<any>()
    const handlesPages = async () => {
        const Pages = localStorage.getItem('Pages')
        setPage(Pages ? JSON.parse(Pages) : [])
    }
    const handleSuccess = async (response: any) => {

        await dispatch(pageList(response.authResponse))
        await handlesPages()
    }
    const onFinish = () => {
        const value = {
            ['pageID']: pageID.id, ['access_token']: pageID.access_token,
            ['Client_ID']: 184681667978801, ['Client_Secret_Code']: 'efdf52f029001efb72df382c05344c8c'
        }

        dispatch(ExtendToken(value))
    };
    useEffect(() => {
        handlesPages()
    }, [])

    return (
        <>
            <Card
                hoverable
                title="Access Token Genrate"
                bordered={false}
                className='card-gradientFB col-3  px-3 pb-4'
            >
                <Row>

                    <FormControl variant="standard" className='px-2 mb-5 mt-3'>
                        <InputLabel id="demo-simple-select-standard-label" className='px-3'>Pages</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={pageID}
                            onChange={(e) => setPageID(e.target.value)}
                            label="Pages"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {
                                page.map((i: any) => ([
                                    <MenuItem value={i}>{i.name}</MenuItem>
                                ]))

                            }
                        </Select>
                    </FormControl>
                    {/* <Inputs class="col-12 " holder="Page ID" nam="Page_ID" typs="number" /> */}
                    <Form.Item className='d-block w-100'>
                        <ButtonCreative title="Genrate" class='' type='button' click={onFinish} />
                    </Form.Item>
                    <div className='col-12'>
                        <ButtonFB handleSuccess={handleSuccess} />
                    </div>
                </Row>


            </Card>

        </>
    )
}

export default AccessToken
