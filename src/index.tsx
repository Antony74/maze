import * as React from 'react';
import ReactDOM from 'react-dom';
import { Sketch } from './sketch';

const Controls = () => <div>These will be controls</div>;

const App = () => (
    <div>
        <Sketch></Sketch>
        <Controls></Controls>
    </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
