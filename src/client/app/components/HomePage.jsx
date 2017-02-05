import React from 'react'
import { Link } from 'react-router'


import Sensors from './SensorsPageController'
import Rooms from './RoomsController'
import Sensor from './SensorController'

class HomePage extends React.Component {

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <Sensor sensorid="test1" />


            </div>
        );
    }
}


export default HomePage;