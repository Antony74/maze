import * as React from 'react';
import { Button, Grid, MenuItem, TextField } from '@mui/material';

const margin = 10;

export const Controls = () => {
    return (
        <Grid container justifyContent="center">
            <TextField
                select
                label="Mode"
                size="small"
                value={'plain'}
                style={{ width: '200px', margin }}
            >
                <MenuItem key={1} value={'plain'}>
                    Plain
                </MenuItem>
                <MenuItem key={2} value={'step'}>
                    Step through
                </MenuItem>
            </TextField>
            <Button variant="outlined" style={{ margin }}>
                Reset
            </Button>
        </Grid>
    );
};
