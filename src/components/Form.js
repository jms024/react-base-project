import React from 'react';
import { Form } from 'react-final-form';

import useApi from "../utils/useApi";

export default React.memo((props) => {
    const { initialValues, apiUrl, children } = props,
        api = useApi();

    const handleSubmit = (values) => {

        console.log('values');
        console.log(values);

        // Check if we are creating or updating
        if (values.id) {
            api.update({path: apiUrl, data: values, id: values.id})
                .then(() => console.log('hello'));
        }
    };

    return (
        <Form onSubmit={handleSubmit} initialValues={initialValues}>
            {(props) => (
                <form onSubmit={props.handleSubmit}>
                    {children}
                </form>
            )}
        </Form>
    )
})