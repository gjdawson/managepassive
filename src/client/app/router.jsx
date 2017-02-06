import React, { PropTypes } from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux'

// Layouts

import MainLayout from './components/layouts/MainLayout';
import Sidebar from './components/layouts/Sidebar';
import Transit from './components/layouts/Transit'

// Pages
import HomePageController from './components/HomePageController';
import Login from './components/Login'
import Register from './components/Register'
import SingleRoomController from './components/SingleRoomPageController'
import SingleSensorController from './components/SingleSensorPageController'
import SensorsPageController from './components/SensorsPageController'
import Dummy from './components/Dummy'


// App
import Auth from './components/Auth'
import App from './components/App'


const Root = ({ store }) => (
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={Transit}>
                <Route path="login" component={Login} />
                <Route path="register" component={Register} />
                <Route component={Auth}>
                    <Route component={App}>
                        <IndexRoute component={HomePageController} />
                        <Route path="sensors" component={SensorsPageController} />
                        <Route path="room/:roomid" component={SingleRoomController}>
                            <Route path="edit" component={SingleRoomController}/>
                        </Route>
                        <Route path="sensor/:sensorid" component={SingleSensorController} />
                    </Route>
                </Route>
            </Route>
        </Router>
    </Provider>
);

Root.propTypes = {
    store: PropTypes.object.isRequired
};

export default Root