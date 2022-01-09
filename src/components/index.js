import React from 'react';
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";

import MainContainer from "./MainContainer";
import MainMenu from "./MainMenu";
import Tables from "./Tables";
import Presenters from "./Presenters";

const Wrapper = styled.section`
    margin-top: 80px;
`;

export default React.memo((props) => {
    return (
        <Wrapper>
            <MainMenu/>
            <MainContainer>
                <Routes>
                    <Route path="/" element={<div>Hello</div>} />
                    <Route path="tables/*" element={<Tables />} />
                    <Route path="presenters/*" element={<Presenters />} />
                </Routes>
            </MainContainer>
        </Wrapper>
    )
})