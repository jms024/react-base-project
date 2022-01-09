import React, {useEffect, useState} from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardActions, Button , LinearProgress } from "@mui/material";
import {useForm} from "react-final-form";

import useApi from "../../utils/useApi";
import Form from "../Form";
import TableFields from "./TableFields";

const SubmitBtn = React.memo((props) => {
    const form = useForm();
    return (
        <Button variant="contained"
                onClick={() => form.submit()}>
            Save
        </Button>
    )
})

export default React.memo((props) => {
    const [tableData, setTableData] = useState(null),
        location = useLocation(),
        navigate = useNavigate(),
        tableId = location.pathname.split('/').at(-1),
        api = useApi();

    useEffect(() => {
        api.get({path: 'tables', id: tableId})
            .then((data) => setTableData(data));
    }, [])

    if(!tableData) return <LinearProgress />

    return(
        <Form apiUrl={`tables/${tableId}`} initialValues={tableData}>
            <Card>
                <CardContent>
                    <TableFields/>
                </CardContent>
                <CardActions>
                    <Button
                        variant="outlined"
                        onClick={() => navigate(-1)}>
                        Back
                    </Button>
                    <SubmitBtn />
                </CardActions>
            </Card>
        </Form>
    )
})