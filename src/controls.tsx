import * as React from 'react';
import { Button, Grid, MenuItem, TextField } from '@mui/material';
import { Mode } from './mode';

const margin = 10;

export const Controls = () => {
    const [state, setState] = React.useState('plain');

    return (
        <Grid container justifyContent="center">
            <TextField
                select
                label="Mode"
                size="small"
                value={state}
                style={{ width: '200px', margin }}
                onChange={(event) => {
                    setState(event.target.value);
                }}
            >
                {Object.entries(Mode).map(([key, value]) => {
                    return (
                        <MenuItem key={key} value={key}>
                            {value}
                        </MenuItem>
                    );
                })}
            </TextField>
            <Button variant="outlined" style={{ margin }}>
                Reset
            </Button>
        </Grid>
    );
};
