// A room element
import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { Panel, Glyphicon, Col } from 'react-bootstrap'
import Sensor from './SensorsPageController'

class Room extends React.Component {

    render() {
        let title = this.props.room.name;

        if(this.props.in != true) {
            title = <Link to={"/room/" + this.props.room.id}>{title}</Link>
        }
        return (

            <Panel className="room pull-left">
                <h3>{title}</h3>
                {this.props.children}
            </Panel>

        )
    }
}

export default Room