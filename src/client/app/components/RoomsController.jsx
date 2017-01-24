import React, { PropTypes } from 'react'
import Room from './Room'
import Sensor from './Sensor'

import _ from 'lodash'

class RoomsController extends React.Component {

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
        return (
            <rooms>
                <section className="rooms-container">
                    {
                        Object.keys(this.props.rooms).map(function(key){
                            return (
                                <Room room={this.props.rooms[key]} key={key}>
                                    {
                                        this.sensorsForRoom(this.props.rooms[key])
                                    }
                                </Room>
                            )
                        }.bind(this))
                    }
                </section>
                <section className="unassigned-sensors">
                    <Room room={{id: 'unassigned-room', name:'Unassigned', occupied: false}}>
                        {this.unassignedSensors()}
                    </Room>
                </section>
            </rooms>
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
)(RoomsController);