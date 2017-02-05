import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router'

class Auth extends React.Component {

    componentWillMount() {
        let auth = this.props.auth;
        if(auth.isAuthenticated == false) {
            browserHistory.push('/login');
        }
    }

    componentWillReceiveProps(next) {
        let now = this.props.auth;
        if(next.auth.isAuthenticated == false && now.isAuthenticated == true) {
            browserHistory.push('/login');
        }
    }

    render() {
        console.log('auth');
        let auth = this.props.auth;
        if(auth.isAuthenticated == false) {
            console.log('No auth')
            return(<div></div>)
        } else {
            return (
                <div>{this.props.children}</div>
            )
        }
    }
}

import { connect } from 'react-redux'
import { logIn } from '../actions/auth'

const mapStateToProps = (state) => {

    return {
        auth: state.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sensorActivity: (sensor) => {
            dispatch(sensorActivity(sensor));
        }
    }
}


//export default MainLayout;
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Auth);