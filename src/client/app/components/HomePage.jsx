import React from 'react'
import { Link } from 'react-router'


import Sensors from './SensorsController'
import Rooms from './RoomsController'


class HomePage extends React.Component {

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <Sensors />
            </div>
        );
    }
}


export default HomePage;