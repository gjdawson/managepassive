import React from 'react';
import { Panel, Glyphicon } from 'react-bootstrap'
import SensorActivity from './SensorActivityController'
import { Link } from 'react-router'

class HeaderBarController extends React.Component {
    render() {
        return (
            <Panel>

                <SensorActivity />
                <Link to="/">HOME</Link>


                <Glyphicon glyph="bell" className="pull-right"> </Glyphicon>
            </Panel>
        );
    }
}

export default HeaderBarController;