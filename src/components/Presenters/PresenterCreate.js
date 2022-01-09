import React from 'react';

import PresenterFields from "./PresenterFields";
import EditPage from "../EditPage";
import presenterValidation from "./presenterValidation";

export default React.memo((props) => {
    return (
        <EditPage
            data={{}} s
            ubmitPath={`presenters`}
            validate={presenterValidation}>
            <PresenterFields />
        </EditPage>
    )
})