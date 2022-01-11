import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from '@mui/material';
import styled from 'styled-components';
import ListIcon from '@mui/icons-material/ViewList';
import GridIcon from '@mui/icons-material/ViewComfy';

import { switchView } from '../../actions/dataView.action'

const Container = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
`

const Separator = styled.span`
    font-size: 21px;
    margin-bottom: 2px;
`

export default React.memo(() => {
    const dispatch = useDispatch(),
        view = useSelector((state) => state.dataViewReducer);

    return (
        <Container>
            <IconButton
                disabled={view === 'list'}
                onClick={() => dispatch(switchView('list'))}
                title="Switch to list view">
                <ListIcon />
            </IconButton>
            <Separator>|</Separator>
            <IconButton
                disabled={view === 'grid'}
                onClick={() => dispatch(switchView('grid'))}
                title="Switch to grid view">
                <GridIcon />
            </IconButton>
        </Container>
    );
})