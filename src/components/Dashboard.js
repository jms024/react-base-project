import React from 'react';
import { Button } from '@mui/material';

import useShiftGenerator from "../utils/useShiftGenerator";

export default React.memo((props) => {
    const { generate } = useShiftGenerator();

    return (
        <Button onClick={() => generate()}>
            Generate
        </Button>
    )
})