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
                {Object.keys(Mode).map((mode, index) => {
                    return (
                        <MenuItem key={mode} value={mode}>
                            {Object.values(Mode)[index]}
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
