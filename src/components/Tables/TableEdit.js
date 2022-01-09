import React, {useEffect, useState} from 'react';
import { useLocation } from "react-router-dom";

import useApi from "../../utils/useApi";
import TableFields from "./TableFields";
import EditPage from "../EditPage";

export default React.memo((props) => {
    const [tableData, setTableData] = useState(null),
        location = useLocation(),
        tableId = location.pathname.split('/').at(-1),
        api = useApi();

    useEffect(() => {
        api.get({path: 'tables', id: tableId})
            .then((data) => setTableData(data));
    }, [])

    return (
        <EditPage data={tableData} submitPath={`tables/${tableId}`}>
            <TableFields />
        </EditPage>
    )
})