import React from 'react'
import DocumentTitle from 'react-document-title'
import Muon from 'muonjs'

// Get component
import Rooms from './RoomsController'

class HomePageController extends React.Component {

    constructor() {
        super();

        this.subscriptions = {
            rooms: {cancel:() =>{}},
            sensorsrooms: {cancel:() =>{}}
        }
    }

    subscribeRooms() {
        const { registerNewRoom } = this.props;

        // this is probably cheeky
        const userid = localStorage.getItem('id_username');

        this.subscriptions.rooms = this.muon.subscribe('stream://photon/stream', {"stream-name": "registered-rooms-" + userid},
            function (event) {
                console.log(event);
                if (event['event-type'] == 'room-created') {
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

    subscribeSensorsRooms() {
        const { assignSensor } = this.props;

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
            this.subscribeSensorsRooms();
        } else {
            console.log('Not authorised, no streams loaded');
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <DocumentTitle title="Homepage">
                <Rooms />
            </DocumentTitle>
        );
    }
}

import { connect } from 'react-redux'
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
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePageController);