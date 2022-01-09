import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { Form } from 'react-final-form';

import useApi from "../utils/useApi";

const getNewUrl = (currentPath, itemId) => {
    let currentPathArray = currentPath.split('/');
    currentPathArray.splice(-1);
    currentPathArray.push(itemId);
    return currentPathArray.join('/');
}

export default React.memo((props) => {
    const { apiUrl, initialValues, children } = props,
        location = useLocation(),
        navigate = useNavigate(),
        api = useApi();

    const handleSubmit = (values) => {
        // Check if we are creating or updating
        if (values.id) {
            api.update({path: apiUrl, data: values, id: values.id})
                .then((data) => alert('Record updated'));
        } else {
            api.create({path: apiUrl, data: values})
                .then((data) => {
                    alert('Record created');
                    navigate(getNewUrl(location.pathname, data.id)); // Navigate from create to edit page
                });
        }
    };

    return (
        <Form
            onSubmit={handleSubmit}
            initialValues={initialValues}>
            {(props) => (
                <form onSubmit={props.handleSubmit}>
                    {children}
                </form>
            )}
        </Form>
    )
})