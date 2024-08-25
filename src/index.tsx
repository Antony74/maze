import * as React from 'react';
import ReactDOM from 'react-dom';
import { Sketch } from './sketch';
import { MenuItem, Select } from '@mui/material';
import GitHubForkRibbon from 'react-github-fork-ribbon';

const Controls = () => (
    <div>
        <Select label="Mode">
            <MenuItem>Plain</MenuItem>
            <MenuItem>Step through</MenuItem>
        </Select>
    </div>
);

const App = () => (
    <div>
        {' '}
        <GitHubForkRibbon
            href="https://github.com/Antony74/maze"
            target="_blank"
            position="right"
        >
            Fork me on GitHub
        </GitHubForkRibbon>
        <Sketch></Sketch>
        <Controls></Controls>
    </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
