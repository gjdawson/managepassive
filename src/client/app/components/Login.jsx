import React, { PropTypes } from 'react';
import { Alert, Button, Panel, Form, FormControl, FormGroup, ControlLabel, Col, InputGroup, Glyphicon } from 'react-bootstrap'
import MinimalLayout from './layouts/MinimalLayout'
import { browserHistory, Link } from 'react-router'

class Login extends React.Component {
    constructor() {
        super();

        this.usernameCheck = this.usernameCheck.bind(this);
        this.passwordCheck = this.passwordCheck.bind(this);

        this.state = {
            user: {
                username: null,
                password: null
            }

        }
    }

    logInUser() {
        const { loginUser } = this.props;
        loginUser(this.state.user);
    }

    validatePassword() {

    }

    usernameState() {

    }

    passwordCheck(e) {
        let user = Object.assign({}, this.state.user, {password: e.target.value});
        this.setState({user:user});
    }

    usernameCheck(e) {
        let user = Object.assign({}, this.state.user, {username: e.target.value});
        this.setState({user:user});
    }

    componentWillMount() {
        if(this.props.auth.isAuthenticated) {
            browserHistory.push('/');
        }
    }

    componentWillReceiveProps(next) {
        let now = this.props.auth;
        console.log(next.auth);
        if(next.auth.isAuthenticated == true) {
            browserHistory.push('/');
        }
    }

    loginStatus() {

        if(this.props.auth.isFetching) return null;
        if(this.props.auth.errorMessage != null) {
            return (
                <Alert bsStyle="warning">
                    {this.props.auth.errorMessage}
                </Alert>
            )
        }
    }

    render() {

        let header = <h3>Log In</h3>
        return(
            <MinimalLayout title="Login">
                <div id="user-login-out">
                    <Panel header={header}>



                        <Form horizontal>
                            <FormGroup controlId="username" validationState={this.usernameState()}>
                                <InputGroup>
                                    <InputGroup.Addon><Glyphicon glyph="user" /></InputGroup.Addon>
                                    <FormControl type="username" placeholder="Username" onChange={this.usernameCheck}/>
                                </InputGroup>
                            </FormGroup>

                            <FormGroup controlId="loginPassword" validationState={this.validatePassword()}>
                                <InputGroup>
                                    <InputGroup.Addon><Glyphicon glyph="question-sign" /></InputGroup.Addon>
                                    <FormControl type="password" placeholder="Password" onBlur={this.passwordCheck}/>
                                    <FormControl.Feedback />
                                </InputGroup>
                            </FormGroup>

                            <FormGroup>

                                <Button onClick={(event)=>this.logInUser()} disabled={this.props.auth.isFetching}>Log In</Button>

                                <Link to="/register" className="auxlink pull-right">Register</Link>

                            </FormGroup>


                        </Form>
                        {this.loginStatus()}
                    </Panel>

                </div>
            </MinimalLayout>
        )
    }
}

import { connect } from 'react-redux'
import { loginUser } from '../actions/auth'

const mapStateToProps = (state) => {

    return {
        auth: state.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginUser: (creds) => {
            dispatch(loginUser(creds));
        }
    }
}


//export default MainLayout;
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
