import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { LinearProgress } from "@mui/material";

import useApi from "../../utils/useApi";
import DataTable from "../DataTable";
import PresenterEdit from "./PresenterEdit";
import PresenterCreate from "./PresenterCreate";

export default React.memo((props) => {
    const [presenters, setPresenters] = useState(null),
        navigate = useNavigate(),
        location = useLocation(),
        api = useApi();

    useEffect(() => {
        // Get list of presenters
        api.get({path: 'presenters'})
            .then((data) => {
                setPresenters(data);
            })
    }, [])

    const handleAddClick = () => {
        navigate(`${location.pathname}/new`);
    }

    const handleRowClick = (datum) => {
        navigate(`${location.pathname}/${datum.id}`);
    }

    const handleRowDelete = (datum, index) => {
        api.remove({path: 'presenters', id: datum.id})
            .then(() => {
                let newPresenters = [...presenters];
                newPresenters.splice(index, 1);
                setPresenters(newPresenters);
            })
    }

    if (!presenters) return <LinearProgress />

    return (
        <Routes>
            <Route path="/" element={
                <DataTable
                    data={presenters}
                    title="List of game presenters"
                    onRowClick={handleRowClick}
                    onRowDelete={handleRowDelete}
                    onAddRow={handleAddClick} />
            } />
            <Route path="/new" element={<PresenterCreate />}/>
            <Route path="/*" element={<PresenterEdit />}/>
        </Routes>
    )
})