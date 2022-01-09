import React, {useEffect, useState} from 'react';
import { useLocation } from "react-router-dom";

import useApi from "../../utils/useApi";
import PresenterFields from "./PresenterFields";
import EditPage from "../EditPage";
import presenterValidation from "./presenterValidation";

export default React.memo((props) => {
    const [presenterData, setPresenterData] = useState(null),
        location = useLocation(),
        presenterId = location.pathname.split('/').at(-1),
        api = useApi();

    useEffect(() => {
        api.get({path: 'presenters', id: presenterId})
            .then((data) => setPresenterData(data));
    }, [])

    return (
        <EditPage
            data={presenterData}
            submitPath={`presenters/${presenterId}`}
            validate={presenterValidation}>
            <PresenterFields />
        </EditPage>
    )
})