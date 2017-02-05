import React from 'react'
import Sensor from './SensorController';

// Muon

//var Muon = require("muonjs");
//var muon = Muon.client({port: 9898});



class SensorsController extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(this.props.sensors);
    }

    render() {

        return (
            <div>
                <h2>Sensors</h2>
                <div>
                    {
                        Object.keys(this.props.sensors).map(function(key){
                            return <Sensor id={key} key={key} />
                        }.bind(this))
                    }
                </div>
            </div>
        );
    }
}


import { connect } from 'react-redux'
import { sensorActivity } from '../actions/sensorActivity'

const mapStateToProps = (state) => {

    return {
        sensors: state.sensors
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sensorActivity: (sensor) => {
            dispatch(sensorActivity(sensor));
        }
    }
}


//export default MainLayout;
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SensorsController);