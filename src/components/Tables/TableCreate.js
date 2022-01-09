import React from 'react';

import TableFields from "./TableFields";
import EditPage from "../EditPage";
import tableValidation from "./tableValidation";

export default React.memo((props) => {
    return (
        <EditPage
            data={{}}
            submitPath={`tables`}
            validate={tableValidation}>
            <TableFields />
        </EditPage>
    )
})