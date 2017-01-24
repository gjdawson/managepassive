import React, { PropTypes } from 'react'
import Room from './Room'
import Sensor from './Sensor'
import DocumentTitle from 'react-document-title'

import _ from 'lodash'

class SingleRoomController extends React.Component {

    componentDidMount() {

    }

    sensorsForRoom(room) {
        let roomId = room.id;
        if(roomId in this.props.sensorsRooms.rooms) {

            //console.log(this.props.sensorsRooms[roomId]);
            // we have sensors I guess?
            var assigned = this.props.sensorsRooms.rooms[roomId].sensors;


            if(assigned.length > 0) {
                return assigned.map(function(key) {
                        return (
                            <Sensor sensorid={key} key={key}/>
                        )
                    }
                )
            }
        }
        return (
            <Sensor sensorid={null} />
        )
    }

    unassignedSensors() {
        var unassigned = _.xor(Object.keys(this.props.sensors), this.props.sensorsRooms._mmcAllAssigned);
        console.log(unassigned);

        if(unassigned.length > 0) {
            return unassigned.map(function(key) {
                    return (
                        <Sensor sensorid={key} key={key}/>
                    )
                }
            )
        }
    }

    render() {

        console.log(this.props.rooms[this.props.routeParams.roomid])

        var room = this.props.rooms[this.props.routeParams.roomid]

        var roomBlock = (
            <section className="rooms-container">
                <Room room={{id: 'loading', name: 'Getting Room Info'}}>
                    {this.sensorsForRoom({id: this.props.routeParams.roomid})}
                </Room>
            </section>
        )

        var roomname = 'Unassigned';

        if(typeof room !== 'undefined') {

            roomBlock = (
                <section className="rooms-container">
                    <Room room={room} key={room.id}>
                        {this.sensorsForRoom(room)}
                    </Room>
                </section>
            )
            roomname = room.name;
        } else if(this.props.routeParams.roomid == 'unassigned-room') {
            roomBlock = null;
            roomname = "Unassigned Sensors";
        }

        return (
            <DocumentTitle title={roomname}>
            <rooms>
                {roomBlock}
                <section className="unassigned-sensors">
                    <Room room={{id: 'unassigned-room', name:'Unassigned', occupied: false}}>
                        {this.unassignedSensors()}
                    </Room>
                </section>
            </rooms>
            </DocumentTitle>
        )
    }
}

import { connect } from 'react-redux'

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
    }
}


//export default MainLayout;
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SingleRoomController);