import * as React from 'react';
import { Button, Grid, MenuItem, TextField } from '@mui/material';
import { Mode } from './mode';
import { useNavigate, useParams } from 'react-router-dom';
import { setSketchState } from './sketch';

const margin = 10;

export const Controls = () => {
    let { mode } = useParams();
    const navigate = useNavigate();

    if (!(mode ?? '' in Mode)) {
        mode = 'plain';
    }

    setSketchState({ mode: Mode[mode as keyof typeof Mode] });

    return (
        <Grid container justifyContent="center">
            <TextField
                select
                label="Mode"
                size="small"
                value={mode}
                style={{ width: '200px', margin }}
                onChange={(event) => {
                    navigate(`/${event.target.value}`);
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

            <Button
                variant="outlined"
                style={{ margin }}
                onClick={() => {
                    setSketchState({ reset: true });
                }}
            >
                Reset
            </Button>
        </Grid>
    );
};
