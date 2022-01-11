import React from 'react';
import {Grid, Typography, Paper, IconButton} from '@mui/material';
import styled from 'styled-components';
import DeleteIcon from "@mui/icons-material/Delete";

const StyledPaper = styled(Paper)`
    padding: ${(props) => props.theme.spacing};
    cursor: pointer;
`;

const DeleteBtnWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
`

export default React.memo((props) => {
    const { tableHeads, data, onRowClick, onDeleteClick } = props;

    return (
        <Grid container spacing={3}>
            { data.map((datum, index) => (
                <Grid item xs={4} key={`${index}`}>
                    <StyledPaper onClick={() => onRowClick(datum, index)}>
                        { tableHeads.map((label) => (
                            <div key={label}>
                                <Typography>
                                    <b>{`${label}: `}</b>
                                    {datum[label]}
                                </Typography>
                            </div>
                        )) }
                        <DeleteBtnWrapper>
                            <IconButton
                                size="small"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    onDeleteClick(datum, index)
                                }}>
                                <DeleteIcon fontSize="small"/>
                            </IconButton>
                        </DeleteBtnWrapper>
                    </StyledPaper>
                </Grid>
            )) }
        </Grid>
    )
})