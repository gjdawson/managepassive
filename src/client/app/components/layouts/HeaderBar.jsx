import React from 'react';
import { Grid, Panel, Nav, Navbar, NavItem, Glyphicon, Button } from 'react-bootstrap'
import NavLink from './NavLink'
import SensorActivity from '../SensorActivityController'
import Alerts from '../AlertsController'
import Logout from '../Logout'
import { Link } from 'react-router'

class HeaderBarController extends React.Component {
    render() {

        let sidebar = <p>Dummy</p>
        return (
            <div>
                <Navbar fluid>
                    <Navbar.Text>
                        <SensorActivity />
                    </Navbar.Text>
                    <Nav>
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/sensors">Sensors</NavLink>
                    </Nav>
                    <Navbar.Text pullRight>
                        <Alerts />
                        <Logout />
                    </Navbar.Text>
                </Navbar>

                <Grid fluid>
                    {this.props.children}
                </Grid>
            </div>
        );
    }
}

export default HeaderBarController;