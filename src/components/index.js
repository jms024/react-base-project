import React from 'react';

import MainContainer from "./MainContainer";
import MainMenu from "./MainMenu";

export default React.memo((props) => {

    return (
        <MainContainer>
            <MainMenu/>
            Hello
        </MainContainer>
    )
})