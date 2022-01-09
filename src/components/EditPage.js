import React from 'react';
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardActions, Button , LinearProgress } from "@mui/material";
import {useForm} from "react-final-form";

import Form from "./Form";

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
    const { data, submitPath } = props,
        navigate = useNavigate();

    if(!data) return <LinearProgress />

    return(
        <Form apiUrl={submitPath} initialValues={data}>
            <Card>
                <CardContent>
                    {props.children}
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