import React, { PropTypes } from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux'

// Layouts

import MainLayout from './components/layouts/MainLayout';

// Pages
import HomePageController from './components/HomePageController';
import SingleRoomController from './components/SingleRoomController'
import SingleSensorController from './components/SingleSensorController'
import derp from './components/derp';


const Root = ({ store }) => (
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route component={MainLayout}>
                <Route path="/" component={HomePageController} />
                <Route path="derp" component={derp} />
                <Route path="/room/:roomid" component={SingleRoomController} />
                <Route path="/sensor/:sensorid" component={SingleSensorController} />
            </Route>
        </Router>
    </Provider>
);

Root.propTypes = {
    store: PropTypes.object.isRequired
};

export default Root