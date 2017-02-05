import React, { PropTypes } from 'react'
import Sensor from './SensorController'
import _ from 'lodash'

class RoomController extends React.Component {

    sensorsForRoom(room) {
        let roomId = room.id;
        if(roomId in this.props.sensorsRooms.rooms) {
            let keys = Object.keys(this.props.sensors);
            //console.log(this.props.sensorsRooms[roomId]);
            // we have sensors I guess?
            var assigned = this.props.sensorsRooms.rooms[roomId].sensors;
            // check for assigned non-existing sensors
            let mismatched = assigned.filter(function(e) {
                return !keys.includes(e);
            });

            if(assigned.length > 0) {
                return assigned.map(function(key) {
                    if(!mismatched.includes(key)) {
                        return (
                            <Sensor id={key} key={key}/>
                        )
                    }
                })
            }
        }
    }

    unassignedSensors() {
        var unassigned = _.xor(Object.keys(this.props.sensors), this.props.sensorsRooms._mmcAllAssigned);

        let keys = Object.keys(this.props.sensors);
        // check for assigned non-existing sensors
        let mismatched = unassigned.filter(function(e) {
            return !keys.includes(e);
        });

        if(unassigned.length > 0) {
            return unassigned.map(function(key) {
                if (!mismatched.includes(key)) {
                    return (
                        <Sensor id={key} key={key}/>
                    )
                }
            })
        }
    }
}

export default RoomController;