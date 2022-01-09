import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import useApi from "../../utils/useApi";
import DataTable from "../DataTable";
import TableEdit from "./TableEdit";

export default React.memo((props) => {
    const [tables, setTables] = useState(null),
        navigate = useNavigate(),
        location = useLocation(),
        api = useApi();

    useEffect(() => {
        // Get list of tables
        api.get({path: 'presenters'})
            .then((data) => {
                setTables(data);
            })
    }, [])

    const handleRowClick = (datum) => {
        navigate(`${location.pathname}/${datum.id}`)
    }

    const handleRowDelete = (datum, index) => {
        console.log(datum, index)
    }

    if (!tables) return <div>Loading...</div>

    return (
        <Routes>
            <Route path="/" element={<DataTable
                data={tables}
                title="List of game tables"
                onRowClick={handleRowClick}
                onRowDelete={handleRowDelete}/>}/>
            <Route path="/*" element={<TableEdit />}/>
        </Routes>

    )
})