import React, { useEffect, useState } from 'react'
import { Row } from 'react-bootstrap'
import { Inputs } from '../../components/Common/Inputs'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Form } from 'antd';
import { ButtonCreative, ButtonFB } from '../../components/Common/Button'
import { ExtendToken, pageList } from '../../Redux/actions';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { PageSave } from '../../Redux/Slice_Posts';


const AccessToken = () => {
    const [page, setPage] = useState<any>([]);
    const [pageID, setPageID] = useState('');
    const dispatch = useDispatch<any>()




    const handlesPages = async () => {
        const Pages = localStorage.getItem('Pages')
        setPage(Pages ? JSON.parse(Pages) : [])
    }
    const handleSuccess = async (response: any) => {
        await dispatch(pageList(response.authResponse))
        await handlesPages()
    }
    const onFinish = (e: any) => {
        const Pagenam = e.target.value.PageName
        setPageID(Pagenam)
        dispatch(PageSave(e.target.value))

    }
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
                            onChange={onFinish}
                            label="Pages"
                            defaultValue={pageID || ''}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {
                                page.map((i: any) => ([
                                    <MenuItem value={i}>{i.PageName}</MenuItem>
                                ]))
                            }
                        </Select>
                    </FormControl>
                    {/* <Form.Item className='d-block w-100'>
                        <ButtonCreative title="Genrate" class='' type='button' click={onFinish} />
                    </Form.Item> */}
                    <div className='col-12'>
                        <ButtonFB handleSuccess={handleSuccess} />
                    </div>
                </Row>


            </Card>

        </>
    )
}

export default AccessToken
