import React, { PropTypes } from 'react'
import { Button, Row, Col, Nav } from 'react-bootstrap'
import Room from './Room'
import Sensor from './SensorController'
import DocumentTitle from 'react-document-title'
import RoomController from './RoomController'
import Sidebar from './layouts/Sidebar'
import NavLink from './layouts/NavLink'

import _ from 'lodash'

class SingleRoomPageController extends RoomController {

    viewRoom(room) {
        return (
            <section className="rooms-container">
                <Room room={room} key={room.id} in={true}>
                    {this.sensorsForRoom(room)}
                </Room>
            </section>
        )
    }

    editRoom(room) {
        return (
            <section className="rooms-container">
                <Room room={room} key={room.id}>
                    {this.sensorsForRoom(room)}
                </Room>
            </section>
        )
    }

    boom(e, uri) {
        this.context.router.push(e);
    }

    roomLinks() {

        var roomId = this.props.routeParams.roomid;
        return (
            <Nav bsStyle="pills" stacked>
                {
                    Object.keys(this.props.rooms).map(function(key){
                        let id = this.props.rooms[key].id;
                        let active = false;
                        if(id == roomId) {
                            active = true;
                        }
                        return (
                            <NavLink eventKey={key} to={"/room/" + this.props.rooms[key].id} key={key} active={active}>{this.props.rooms[key].name}</NavLink>
                        )
                    }.bind(this))
                }
            </Nav>
        )
    }

    render() {

        var room = this.props.rooms[this.props.routeParams.roomid]

        let roomBlock;

        var roomname = 'Unassigned';

        if(typeof room !== 'undefined') {

            roomBlock = <Row><Col>{this.viewRoom(room)}</Col></Row>

            roomname = room.name;
        } else if(this.props.routeParams.roomid == 'unassigned-room') {
            roomBlock = null;
            roomname = "Unassigned Sensors";
        }

        return (
            <DocumentTitle title={roomname}>
                <Row>
                    <Sidebar>
                        {this.roomLinks()}
                    </Sidebar>
                    <Col xs={10}>
                        {roomBlock}
                        <Row>
                            <Col>
                                <div className="unassigned-sensors">
                                    <Room room={{id: 'unassigned-room', name:'Unassigned', occupied: false}} in={true}>
                                        {this.unassignedSensors()}
                                    </Room>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </DocumentTitle>
        )
    }
}

SingleRoomPageController.contextTypes = {
    router: React.PropTypes.object.isRequired
};

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
)(SingleRoomPageController);