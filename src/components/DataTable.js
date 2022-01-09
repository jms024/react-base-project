import React from 'react';
import {TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Typography, IconButton,
    Button } from '@mui/material';
import inflection from 'inflection';
import DeleteIcon from '@mui/icons-material/Delete';
import styled from 'styled-components';

const ButtonWrapper = styled.div`
    display: flex;
    padding: ${(props) => props.theme.spacing};
    justify-content: flex-end;
`

export default React.memo((props) => {
    const { data, title, onRowClick=null, onRowDelete=null, onAddRow=null } = props,
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

    return (
        <TableContainer>
            <Typography variant="h4">{title}</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        { tableHeads.map((label) => (
                            <TableCell key={label}>{ inflection.humanize(label) }</TableCell>
                        )) }
                        { onRowDelete
                            ? <TableCell key={'delete'}>&nbsp;</TableCell>
                            : null }
                    </TableRow>
                </TableHead>
                <TableBody>
                    { data.map((datum, index) => (
                        <TableRow
                            key={index}
                            hover
                            onClick={() => handleRowClick(datum, index)}>
                            { tableHeads.map((column) => (
                                <TableCell key={column}>
                                    { datum[column] }
                                </TableCell>
                            )) }
                            { onRowDelete
                                ? <TableCell key={`delete-${index}`}>
                                    <IconButton
                                        size="small"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                            handleRowDelete(datum, index)
                                        }}>
                                        <DeleteIcon fontSize="small"/>
                                    </IconButton>
                                </TableCell>
                                : null }
                        </TableRow>
                    )) }
                </TableBody>
            </Table>
            <ButtonWrapper>
                <Button onClick={handleAddRowClick}>Add</Button>
            </ButtonWrapper>
        </TableContainer>
    )
})