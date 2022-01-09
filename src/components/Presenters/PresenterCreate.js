import React from 'react';

import PresenterFields from "./PresenterFields";
import EditPage from "../EditPage";

export default React.memo((props) => {
    return (
        <EditPage data={{}} submitPath={`presenters`}>
            <PresenterFields />
        </EditPage>
    )
})