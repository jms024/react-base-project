import React from "react";
import {useField} from "react-final-form";
import { Grid, TextField } from "@mui/material"

export default React.memo((props) => {
    const fields = {
        name: {label: 'Name', required: true, field: useField('name')},
        type: {label: 'Type', required: true, field: useField('type')},
    }

    return (
        <Grid container spacing={2}>
            { Object.keys(fields).map((fieldName) => {
                const field = fields[fieldName],
                    value = field.field.input.value,
                    label = field.label,
                    error = field.field.meta.error,
                    onChange = (e) => field.field.input.onChange(e.target.value);

                    return (
                        <Grid item key={fieldName}>
                            <TextField
                                value={value}
                                label={label}
                                error={!!error}
                                helperText={error ?? ''}
                                onChange={onChange}
                                required={field.required}/>
                        </Grid>
                    )
            }) }
        </Grid>
    )
})