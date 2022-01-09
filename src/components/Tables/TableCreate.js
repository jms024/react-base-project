import React from 'react';

import TableFields from "./TableFields";
import EditPage from "../EditPage";

export default React.memo((props) => {
    return (
        <EditPage data={{}} submitPath={`tables`}>
            <TableFields />
        </EditPage>
    )
})