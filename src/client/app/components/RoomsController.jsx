import React, { PropTypes } from 'react'
import Room from './Room'
import Sensor from './SensorController'
import RoomController from './RoomController'
import _ from 'lodash'

class RoomsController extends RoomController {

    componentDidMount() {

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
                    <Room room={{id: 'unassigned-room', name:'Unassigned', occupied: false}} in={true}>
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