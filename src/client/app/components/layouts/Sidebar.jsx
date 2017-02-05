import React from 'react';
import { Panel, Glyphicon, Grid, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router'

import NavLink from './NavLink'

class SideBarController extends React.Component {

    render() {


        return (

                <Col xs={2}>
                    <Panel className="sidebar">
                        {this.props.children}
                    </Panel>
                </Col>

        );
    }
}

export default SideBarController;