import React from 'react';
import {TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Typography,
    IconButton } from '@mui/material';
import inflection from 'inflection';
import DeleteIcon from '@mui/icons-material/Delete';

export default React.memo((props) => {
    const { data, title, onRowClick=null, onRowDelete=null } = props,
        tableHeads = Object.keys(data[0]);

    const handleRowClick = (datum, index) => {
        if (!onRowClick) return;
        onRowClick(datum, index)
    }

    const handleRowDelete = (datum, index) => {
        if (!onRowDelete) return;
        onRowDelete(datum, index)
    }

    return (
        <TableContainer>
            <Typography variant="h3">{title}</Typography>
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
        </TableContainer>
    )
})