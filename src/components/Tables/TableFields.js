import React from "react";
import {useField} from "react-final-form";
import { Grid, TextField } from "@mui/material"

export default React.memo((props) => {
    const fields = {
        name: {label: 'Name', field: useField('name')},
        type: {label: 'Type', field: useField('type')},
    }

    return (
        <Grid container spacing={2}>
            { Object.keys(fields).map((fieldName) => {
                const field = fields[fieldName],
                    value = field.field.input.value,
                    label = field.label,
                    onChange = (e) => field.field.input.onChange(e.target.value);

                    return (
                        <Grid item key={fieldName}>
                            <TextField
                                value={value}
                                label={label}
                                onChange={onChange} />
                        </Grid>
                    )
            }) }
        </Grid>
    )
})