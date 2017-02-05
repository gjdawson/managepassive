import React from 'react';
import { Panel, Glyphicon } from 'react-bootstrap'
import { Link } from 'react-router'

class AlertsController extends React.Component {
    render() {
        return (

            <Glyphicon glyph="bell" className="pull-right msg-bell"> </Glyphicon>

        );
    }
}

export default AlertsController