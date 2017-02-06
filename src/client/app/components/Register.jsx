import React, { PropTypes } from 'react';
import MinimalLayout from './layouts/MinimalLayout'
import { Alert, Button, Panel, Form, FormControl, FormGroup, ControlLabel, Col, InputGroup, Glyphicon } from 'react-bootstrap'
import { browserHistory, Link } from 'react-router'

class Register extends React.Component {

    constructor() {
        super();
        this.state = {
            registerPassword: '',
            registerPasswordTwo: '',
            username: '',
            usernameIsError: false,
            lockForm: false,
            registered: false
        }

        this.passwordCheck = this.passwordCheck.bind(this);
        this.usernameCheck = this.usernameCheck.bind(this);
        this.registerUser = this.registerUser.bind(this);
    }

    validateUsername() {
        if(this.state.username.length == 0) {
            this.setState({usernameIsError: true})
            return 'error'
        }
        this.setState({usernameIsError: false})

        return null;
    }

    usernameState() {
        if(this.state.usernameIsError) return 'error';
        if(this.state.username.length > 0) return 'success'
        return null;
    }

    validatePassword(force=false) {
        const pass1 = this.state.registerPassword;
        const pass2 = this.state.registerPasswordTwo;

        if(force) {
            // Forcibly check existence and length of both password instances
            if(pass1 == null) {
                return 'error';
            } else {
                if(pass2 == null) return 'error';

                if (pass1.length > 0) {
                    if (pass2.length > 0) {
                        if (pass1 == pass2) {
                            return null
                        } else {
                            return 'error';
                        }
                    } else {
                        return 'error'
                    }
                } else {
                    return 'error'
                }
            }
        } else {
            if (pass2 !== null && pass2.length > 0) {
                if (pass1 !== pass2) {
                    return 'error'
                } else {
                    return 'success'
                }
            }
        }

        return null;
    }

    registerUser(e) {
        e.preventDefault();
        let test = this.validateUsername() || this.validatePassword(true)
        const { registerUserPassword } = this.props;
        if(test == null) {
            registerUserPassword({
                username: this.state.username,
                password: this.state.registerPassword
            })
        }
    }

    passwordCheck(e) {
        this.setState({[e.target.id]: e.target.value});
    }

    usernameCheck(e) {
        this.setState({username: e.target.value});
    }

    componentWillReceiveProps(next) {
        if(next.auth.isRegistered == true) {
            //setTimeout(function() {
            //    browserHistory.push('/login')
            //}, 6000)
            this.setState({registered: true});
        }
    }

    registerSuccess() {
        if(this.state.registered) {
            return (
                <Alert bsStyle="success">
                    <h4>Registration Successful</h4>
                    You can now <Link to="/login">Log In</Link> and will be redirected to the Log In page in a moment.
                </Alert>
            )
        }
        return false;
    }

    render() {

        let spinner = '';
        if(this.props.auth.isRegistering) {
            spinner = <Glyphicon glyph="transfer" className="pull-right active-data"/>

        }

        let header = (<h3>Register{spinner}</h3>)

        return(
            <MinimalLayout title="Login">
                <div id="user-login-out">
                    <Panel header={header}>



                        <Form horizontal action="" onSubmit={this.registerUser}>
                            <FormGroup controlId="username" validationState={this.usernameState()}>
                                <InputGroup>
                                    <InputGroup.Addon><Glyphicon glyph="user" /></InputGroup.Addon>
                                    <FormControl type="username" placeholder="Username" onChange={this.usernameCheck}/>
                                </InputGroup>
                            </FormGroup>

                            <FormGroup controlId="registerPassword" validationState={this.validatePassword()}>
                                <InputGroup>
                                    <InputGroup.Addon><Glyphicon glyph="question-sign" /></InputGroup.Addon>
                                    <FormControl type="password" placeholder="Password" onChange={this.passwordCheck}/>
                                    <FormControl.Feedback />
                                </InputGroup>
                            </FormGroup>

                            <FormGroup controlId="registerPasswordTwo" validationState={this.validatePassword()}>

                                <InputGroup>
                                    <InputGroup.Addon><Glyphicon glyph="question-sign" /></InputGroup.Addon>
                                    <FormControl type="password" placeholder="Repeat Password" onChange={this.passwordCheck} />
                                    <FormControl.Feedback />
                                </InputGroup>

                            </FormGroup>

                            <FormGroup>
                                <Button type="submit" disabled={this.props.auth.isRegistering || this.state.registered}>Register</Button>

                                <Link to="/login" className="auxlink pull-right">Log In</Link>
                            </FormGroup>


                        </Form>
                        {this.registerSuccess()}
                    </Panel>
                </div>
            </MinimalLayout>
        )
    }
}

import { connect } from 'react-redux'
import { registerUserPassword } from '../actions/auth'

const mapStateToProps = (state) => {

    return {
        auth: state.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        registerUserPassword: (creds) => {
            dispatch(registerUserPassword(creds));
        }
    }
}


//export default MainLayout;
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register);