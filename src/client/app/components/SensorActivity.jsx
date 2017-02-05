import React, { PropTypes } from 'react';
import { Glyphicon } from 'react-bootstrap'

class SensorActivity extends React.Component {

    constructor(props) {

        super(props);

    }

    render() {

        var status = 'active-data';
        if(this.props.status == true) {
            status = '';
        }

        return (
            <Glyphicon glyph="cloud" className={"pull-left sensorActivity " + status} />
        )
    }

}

export default SensorActivity