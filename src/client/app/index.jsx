import React from 'react';
import { render } from 'react-dom';



import { createStore } from 'redux'
import sensorManager from './reducers'

// Notice that we've organized all of our routes into a separate file.
import Router from './router';

let store = createStore(sensorManager);

render(
    <Router store={store}/>,
    document.getElementById('root')
);