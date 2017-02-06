// The App

import React from 'react'
import config from '../config/'

import MainLayout from './layouts/MainLayout';


import { connect } from 'react-redux'

import Muon from 'muonjs'

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class App extends React.Component {

    constructor() {
        super();

        this.subscriptions = {
            rooms: {cancel:() =>{}},
            sensors: {cancel:() =>{}},
            sensorsrooms: {cancel:() =>{}}
        }


    }

    subscribeRooms() {
        const { registerNewRoom } = this.props;

        this.subscriptions.rooms = this.muon.subscribe('stream://photon/stream', {"stream-name": "registered-rooms"},
            function (event) {
                //console.log(event);
                if(event['event-type'] == 'room-created') {
                    console.log('Creating Room ' + event.payload.name)
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
    }

    subscribeSensors() {

        const { connectSensor, disconnectSensor, removeSensor } = this.props;

        this.subscriptions.sensors = this.muon.subscribe('stream://photon/stream', {"stream-name": "registered-sensors"},
            function (event) {
                //console.log(event);

                switch(event['event-type']) {

                    case 'sensor-connected':
                        connectSensor(event.payload);
                        break;
                    case 'sensor-disconnected':
                        disconnectSensor(event.payload)
                        break;
                    case 'sensor-removed':
                        removeSensor(event.payload);
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

    subscribeSensorsRooms() {
        const { assignSensor, unassignSensor } = this.props;

        this.subscriptions.sensorsrooms = this.muon.subscribe('stream://photon/stream', {"stream-name": "sensors-rooms"},
            function (event) {
                //console.log(event);

                switch(event['event-type']) {

                    case 'assign-sensors-to-room':

                        assignSensor(event.payload);
                        //console.log(event.payload);
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

    componentWillMount() {
        // Monitor rooms I guess?

        this.muon = Muon.client({port: 9898});

        let auth = this.props.auth;
        if(auth.isAuthenticated) {

            this.subscribeRooms();
            this.subscribeSensors();
            this.subscribeSensorsRooms();
        } else {
            console.log('Not authorised, no streams loaded');
        }
    }

    componentWillUnmount() {
        let subs = this.subscriptions;
        subs.rooms.cancel();
        subs.sensors.cancel();
        subs.sensorsrooms.cancel();
    }

    render() {
        return (
            <MainLayout>
                {this.props.children}

            </MainLayout>
        )
    }
}

import { registerNewRoom } from '../actions/rooms'
import { connectSensor, removeSensor } from '../actions/sensorActivity'
import { assignSensor, unassignSensor } from '../actions/sensorsRooms'

const mapStateToProps = (state) => {

    return {
        auth: state.auth,
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
        connectSensor: (sensor) => {
            dispatch(connectSensor(sensor))
        },

        removeSensor: (sensor) => {
            dispatch(removeSensor(sensor))
        },

        assignSensor: (data) => {
            dispatch(assignSensor(data))
        },

        unassignSensor: (data) => {
            dispatch(unassignSensor(data))
        }
    }
}


//export default MainLayout;
export default DragDropContext(HTML5Backend)(connect(
    mapStateToProps,
    mapDispatchToProps
)(App));