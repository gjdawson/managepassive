import React from 'react';
import { render } from 'react-dom';



import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reduction from './reducers'

// Notice that we've organized all of our routes into a separate file.
import Router from './router';

let createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore)

let store = createStoreWithMiddleware(reduction)

render(
    <Router store={store}/>,
    document.getElementById('root')
);