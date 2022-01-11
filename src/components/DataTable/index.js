import React, { useState } from 'react';
import { Paper, Typography } from '@mui/material';
import styled from 'styled-components';

import ViewSelector from './ViewSelector';
import ListView from './ListView';
import GridView from './GridView';

const StyledPaper = styled(Paper)`
    padding: ${(props) => props.theme.spacing};
`

export default React.memo((props) => {
    const [view, setView] = useState('list'),
        { data, title, onRowClick=null, onRowDelete=null, onAddRow=null } = props,
        tableHeads = Object.keys(data[0]);

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
        onAddClick: handleAddRowClick,
        onDeleteClick: handleRowDelete,
        tableHeads,
        data
    }

    return (
        <StyledPaper>
            <ViewSelector view={{set: setView, status: view}}/>
            <Typography variant="h4" gutterBottom>{title}</Typography>
            { view === 'grid'
                ? <GridView {...viewProps}/>
                : <ListView {...viewProps}/> }
        </StyledPaper>
    )
})