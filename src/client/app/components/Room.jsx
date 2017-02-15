// A room element
import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { Panel, Glyphicon, Col } from 'react-bootstrap'
import Sensor from './SensorsPageController'

class Room extends React.Component {

    render() {
        let title = this.props.room.name;
        const { connectDropTarget, isOver } = this.props;

        if(this.props.in != true) {
            title = <Link to={"/room/" + this.props.room.id}>{title}</Link>
        }
        return connectDropTarget(
            <div>
            <Panel className={"room pull-left" + (isOver?" is-hovered":'') }>
                <h3>{title}</h3>
                {this.props.children}
            </Panel>
            </div>

        )
    }
}

Room.propTypes = {
    isOver: PropTypes.bool.isRequired
};

import { DropTarget } from 'react-dnd';

const roomTarget = {
  drop(props, monitor) {
      const {reassignSensor} = props;

      const sensor = monitor.getItem()

      const data = {
          id: props.room.id,
          sensors: [
              sensor.id
          ]
      }

      reassignSensor(data);

      //console.log(data);
      //if(data.id == 'unassigned-room') {
      //    unassignSensor(data);
      //} else {
      //    assignSensor(data);
      //}

      //console.log(monitor.getItem());
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

import { connect } from 'react-redux'
import { assignSensor, unassignSensor } from '../actions/sensorsRooms'

const mapStateToProps = (state) => {

    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        reassignSensor: (data) => {
            if(data.id == 'unassigned-room') {
                dispatch(unassignSensor(data))
            } else {
                dispatch(assignSensor(data))
            }
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    DropTarget(
        'sensor',
        roomTarget,
        collect
    )
    (Room)
);

//export default Room