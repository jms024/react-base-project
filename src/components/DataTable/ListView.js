import React from 'react';
import { Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import inflection from "inflection";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "styled-components";

const ButtonWrapper = styled.div`
    display: flex;
    padding: ${(props) => props.theme.spacing};
    justify-content: flex-end;
`

export default React.memo((props) => {
    const { tableHeads, data, onRowClick, onAddClick, onDeleteClick } = props;

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        { tableHeads.map((label) => (
                            <TableCell key={label}>{ inflection.humanize(label) }</TableCell>
                        )) }
                        { onDeleteClick
                            ? <TableCell key={'delete'}>&nbsp;</TableCell>
                            : null }
                    </TableRow>
                </TableHead>
                <TableBody>
                    { data.map((datum, index) => (
                        <TableRow
                            key={index}
                            hover
                            onClick={() => onRowClick(datum, index)}>
                            { tableHeads.map((column) => (
                                <TableCell key={column}>
                                    { datum[column] }
                                </TableCell>
                            )) }
                            { onDeleteClick
                                ? <TableCell key={`delete-${index}`}>
                                    <IconButton
                                        size="small"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                            onDeleteClick(datum, index)
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
                <Button onClick={onAddClick}>Add</Button>
            </ButtonWrapper>
        </TableContainer>
    )
})