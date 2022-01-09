import React from 'react';
import { Grid } from '@mui/material';

import MainContainer from "./MainContainer";

export default React.memo((props) => {

    return (
        <MainContainer>
            { props.children }
        </MainContainer>
    )
})