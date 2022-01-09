import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { LinearProgress } from "@mui/material";

import useApi from "../../utils/useApi";
import DataTable from "../DataTable";
import TableEdit from "./TableEdit";
import TableCreate from "./TableCreate";

export default React.memo((props) => {
    const [tables, setTables] = useState(null),
        navigate = useNavigate(),
        location = useLocation(),
        api = useApi();

    useEffect(() => {
        // Get list of tables
        api.get({path: 'tables'})
            .then((data) => {
                setTables(data);
            })
    }, [])

    const handleAddClick = () => {
        navigate(`${location.pathname}/new`);
    }

    const handleRowClick = (datum) => {
        navigate(`${location.pathname}/${datum.id}`);
    }

    const handleRowDelete = (datum, index) => {
        api.remove({path: 'tables', id: datum.id})
            .then(() => {
                let newTables = [...tables];
                newTables.splice(index, 1);
                setTables(newTables);
            })
    }

    if (!tables) return <LinearProgress />

    return (
        <Routes>
            <Route path="/" element={
                <DataTable
                    data={tables}
                    title="List of game tables"
                    onRowClick={handleRowClick}
                    onRowDelete={handleRowDelete}
                    onAddRow={handleAddClick} />
            } />
            <Route path="/new" element={<TableCreate />}/>
            <Route path="/*" element={<TableEdit />}/>
        </Routes>
    )
})