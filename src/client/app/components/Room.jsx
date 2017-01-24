// A room element
import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { Panel, Glyphicon } from 'react-bootstrap'
import Sensor from './SensorsController'

class Room extends React.Component {

    render() {
        return (
            <Panel className="room pull-left">
                <h3><Link to={"/room/" + this.props.room.id}>{this.props.room.name}</Link></h3>
                {this.props.children}
            </Panel>
        )
    }
}

export default Room