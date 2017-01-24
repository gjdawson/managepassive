import React from 'react'
import config from '../../config/'

import { connect } from 'react-redux'

import Muon from 'muonjs'
var muon = Muon.client({port: 9898});

// Components
import DocumentTitle from 'react-document-title'
import HeaderBarController from '../HeaderBarController';
//import { Router, Route, Link, browserHistory } from 'react-router'


class MainLayout extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            sensors: {}
        };
    }

    componentDidMount() {
        // Monitor rooms I guess?
        const { registerNewRoom, registerNewSensor, updateSensor, readbackSensorAssignment } = this.props;


        var loadtime = new Date().getTime();

        muon.subscribe('stream://photon/stream', {"stream-name": "mmc-rooms"},
            function (event) {
                //console.log(event);
                if(event['event-type'] == 'room-creation') {
                    //console.log('Creating Room ' + event.payload.name)
                    registerNewRoom(event.payload);
                }
            }.bind(this),
            function (error) {
                console.dir(error);
            },
            function () {
                console.log('Stream Completed');
            }
        );

        muon.subscribe('stream://photon/stream', {"stream-name": "mmc-sensors"},
            function (event) {
                //console.log(event);

                switch(event['event-type']) {
                    case 'assign-sensors-to-room':
                        readbackSensorAssignment(event.payload);
                        break;
                    case 'sensor-data':
                        updateSensor(event.payload);
                        if (typeof this.props.sensors[event.payload.sensorid] === 'undefined') {
                            registerNewSensor(event.payload);
                        }
                        //console.log('sensor activity for ' + event.payload.sensorid);
                        break;

                }
            }.bind(this),
            function (error) {
                console.dir(error);
            },
            function () {
                console.log('Stream Completed');
            }
        );
    }

    render() {



        var setStyle = {};

        return (

            <DocumentTitle title={config.title}>
                <main>

                    <HeaderBarController />

                    <div>
                        {this.props.children}
                    </div>
                </main>
            </DocumentTitle>
        );
    }
}

/* Class variables */

MainLayout.propTypes = {}
MainLayout.defaultProps = {}

import { siteReady } from '../../actions/siteStatus'
import { registerNewRoom } from '../../actions/rooms'
import { registerNewSensor, sensorActivity } from '../../actions/sensorActivity'
import { readbackSensorAssignment } from '../../actions/sensorsRooms'

const mapStateToProps = (state) => {

    return {
        rooms: state.rooms,
        sensors: state.sensors,
        activity: state.activity,
        sensorsRooms: state.sensorsRooms
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        registerNewRoom: (room) => {
            dispatch(registerNewRoom(room))
        },
        registerNewSensor: (sensor) => {
            dispatch(registerNewSensor(sensor))
        },

        updateSensor: (sensor) => {
            dispatch(sensorActivity(sensor))
        },

        readbackSensorAssignment: (data) => {
            dispatch(readbackSensorAssignment(data))
        }
    }
}


//export default MainLayout;
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainLayout);