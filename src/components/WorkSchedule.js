import React, {useState} from 'react';
import {
    Paper,
    Button,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Typography
} from '@mui/material';
import styled from 'styled-components';

import useShiftGenerator from "../utils/useShiftGenerator";

const StyledPaper = styled(Paper)`
    padding: ${(props) => props.theme.spacing};
`

export default React.memo((props) => {
    const [tableData, setTableData] = useState(null),
        [columns, setColumns] = useState(null),
        { generateShiftForDay } = useShiftGenerator();

    const handleShiftGeneration = () => {
        const { tableData, columns } = generateShiftForDay();
        setTableData(tableData);
        setColumns(columns);
    }

    if (!tableData) return (
        <Button onClick={handleShiftGeneration}>
            Click to Generate Shift
        </Button>
    )

    return (
        <StyledPaper>
            <TableContainer>
                <Typography variant="h4" gutterBottom>Work schedule for the day</Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>&nbsp;</TableCell>
                            { columns.map(({from, label}) => (
                                <TableCell align="center" style={{whiteSpace: 'nowrap'}} key={from}>{ label }</TableCell>
                            )) }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { Object.values(tableData).map(({id, name, schedule}) => (
                            <TableRow key={id}>
                                <TableCell align="right" style={{whiteSpace: 'nowrap'}} key="presenter_name">{ name }</TableCell>
                                { columns.map(({from}) => {
                                    const pTimeSlot = schedule.find(({timeSlot}) => (timeSlot.from === from));
                                    if (!pTimeSlot) {
                                        return (
                                            <TableCell key={`${id}-${from}`}>&nbsp;</TableCell>
                                        )
                                    }
                                    return (
                                        <TableCell align="center" style={{whiteSpace: 'nowrap'}} key={`${id}-${from}`}>{pTimeSlot.table.name}</TableCell>
                                    )
                                }) }
                            </TableRow>
                        )) }
                    </TableBody>
                </Table>
            </TableContainer>
        </StyledPaper>
    )
})