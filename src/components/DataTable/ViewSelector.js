import React from 'react';
import { IconButton } from '@mui/material';
import styled from 'styled-components';
import ListIcon from '@mui/icons-material/ViewList';
import GridIcon from '@mui/icons-material/ViewComfy';

const Container = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
`

const Separator = styled.span`
    font-size: 21px;
    margin-bottom: 2px;
`

export default React.memo((props) => {
    const { view: {set, status}} = props;

    return (
        <Container>
            <IconButton
                disabled={status === 'list'}
                onClick={() => set('list')}
                title="Switch to list view">
                <ListIcon />
            </IconButton>
            <Separator>|</Separator>
            <IconButton
                disabled={status === 'grid'}
                onClick={() => set('grid')}
                title="Switch to grid view">
                <GridIcon />
            </IconButton>
        </Container>
    );
})