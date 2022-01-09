import React, {useEffect} from 'react';
import { useLocation } from "react-router-dom";

import useApi from "../../utils/useApi";

export default React.memo((props) => {
    const location = useLocation(),
        tableId = location.pathname.split('/').at(-1),
        api = useApi();

    useEffect(() => {
        api.get({path: 'tables', id: tableId})
            .then((data) => console.log(data));
    }, [])

    console.log(tableId);

    return(
        <div>Helloww</div>
    )

})