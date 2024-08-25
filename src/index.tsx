import * as React from 'react';
import ReactDOM from 'react-dom';
import { Sketch } from './sketch';
import { Button, Grid, MenuItem, TextField } from '@mui/material';
import GitHubForkRibbon from 'react-github-fork-ribbon';

const margin = 10;
const padding = 50;

const Controls = () => {
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

const App = () => {
    return (
        <div>
            <GitHubForkRibbon
                href="https://github.com/Antony74/maze"
                target="_blank"
                position="right"
            >
                Fork me on GitHub
            </GitHubForkRibbon>
            <Grid container justifyContent="center" style={{ padding }}>
                <Sketch></Sketch>
                <Controls></Controls>
            </Grid>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
