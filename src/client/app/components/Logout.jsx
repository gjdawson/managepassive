import React, { PropTypes } from 'react';
import { Button, Glyphicon } from 'react-bootstrap'
import MinimalLayout from './layouts/MinimalLayout'
import { browserHistory, Link } from 'react-router'

class Logout extends React.Component {

    constructor() {
        super();

        this.logOut = this.logOut.bind(this);
    }

    logOut() {
        const { logoutUser } = this.props;
        logoutUser();
    }

    render() {
        return (
            <Glyphicon glyph="log-out" className="clickable" onClick={this.logOut} aria-label="Log Out"/>
        )
    }

}

import { connect } from 'react-redux'
import { logoutUser } from '../actions/auth'

const mapStateToProps = (state) => {

    return {
        auth: state.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logoutUser: () => {
            dispatch(logoutUser());
        }
    }
}


//export default MainLayout;
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Logout);
