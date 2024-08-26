import * as React from 'react';
import ReactDOM from 'react-dom';
import { Sketch } from './sketch';
import { Grid } from '@mui/material';
import GitHubForkRibbon from 'react-github-fork-ribbon';
import { Controls } from './controls';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
    { path: '/:mode', element: <Controls></Controls> },
    { path: '*', element: <Controls></Controls> },
]);

const padding = 50;

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
                <RouterProvider router={router}></RouterProvider>
            </Grid>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
