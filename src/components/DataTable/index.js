import React from 'react';
import {Button, Paper, Typography} from '@mui/material';
import styled from 'styled-components';
import { useSelector } from "react-redux";

import ViewSelector from './ViewSelector';
import ListView from './ListView';
import GridView from './GridView';

const StyledPaper = styled(Paper)`
    padding: ${(props) => props.theme.spacing};
`

const ButtonWrapper = styled.div`
    display: flex;
    padding: ${(props) => props.theme.spacing};
    justify-content: flex-end;
`

export default React.memo((props) => {
    const { data, title, onRowClick=null, onRowDelete=null, onAddRow=null } = props,
        tableHeads = Object.keys(data[0]),
        view = useSelector((state) => state.dataViewReducer);

    const handleRowClick = (datum, index) => {
        if (!onRowClick) return;
        onRowClick(datum, index)
    }

    const handleRowDelete = (datum, index) => {
        if (!onRowDelete) return;
        onRowDelete(datum, index)
    }

    const handleAddRowClick = () => {
        if (!onAddRow) return;
        onAddRow();
    }

    const viewProps = {
        onRowClick: handleRowClick,
        onDeleteClick: handleRowDelete,
        tableHeads,
        data
    }

    return (
        <StyledPaper>
            <ViewSelector />
            <Typography variant="h4" gutterBottom>{title}</Typography>
            { view === 'grid'
                ? <GridView {...viewProps}/>
                : <ListView {...viewProps}/> }
            <ButtonWrapper>
                <Button onClick={handleAddRowClick}>Add</Button>
            </ButtonWrapper>
        </StyledPaper>
    )
})