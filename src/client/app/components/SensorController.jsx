import React from 'react'
import Sensor from './Sensor';

// Muon

var Muon = require("muonjs");




class SensorsController extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sensor: {
                value:0,
                id:this.props.id,
                time: 0
            }
        }



        this.stream = null;
    }

    sensorUpdate(payload, time = 0) {


        const { sensorActivity } = this.props;
        let state = {sensor: payload};
        let now = new Date().getTime();
        //if(time >= (now - 5000)) {
            this.setState(state);
            sensorActivity(payload);
        //}

    }

    connectSensorStream() {
        let streamName = 'sensor-data-'+this.props.id;

        this.stream = this.muon.subscribe('stream://photon/stream', {"stream-name": streamName},
        function(event) {
            switch(event['event-type']) {
                case 'sensor-data':
                    //console.log(event.payload);
                    this.sensorUpdate(event.payload, event['event-time']);
                    break;
            }
        }.bind(this),
        function(error){
            console.log(error);
            setTimeout(function() {
                this.connectSensorStream();
            }.bind(this), 1000)
        }.bind(this),
        function() {
            // Stream closed
            setTimeout(function() {
                this.connectSensorStream();
            }.bind(this), 1000)
        }.bind(this))
    }

    componentWillMount() {
        // stream name
        this.muon = Muon.client({port: 9898});

        this.connectSensorStream();

    }

    componentDidMount() {

    }

    componentWillUnmount(np, ns) {
        // This is a bad solution.
        setTimeout(function() {
            this.stream.cancel();
        }.bind(this), 2000);

    }

    render() {



        let sensor = this.props.sensors[this.props.id];
        if(typeof sensor == 'undefined') {
            return (
                <Sensor value={0} id="loading" type="loading" />
            )
        } else {
            return (
                <Sensor value={this.state.sensor.value} id={sensor.id} type={sensor.type} single={this.props.single}/>
            );
        }
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