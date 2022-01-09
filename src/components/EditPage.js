import React from 'react';
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardActions, Button , LinearProgress } from "@mui/material";
import { useForm, useFormState } from "react-final-form";

import Form from "./Form";

const SubmitBtn = React.memo((props) => {
    const form = useForm(),
        formState = useFormState();

    return (
        <Button variant="contained"
                onClick={() => form.submit()}
                disabled={formState.errors && !!Object.keys(formState.errors).length}>
            Save
        </Button>
    )
})

export default React.memo((props) => {
    const { data, submitPath, validate } = props,
        navigate = useNavigate();

    if(!data) return <LinearProgress />

    return(
        <Form
            apiUrl={submitPath}
            initialValues={data}
            validate={validate}>
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