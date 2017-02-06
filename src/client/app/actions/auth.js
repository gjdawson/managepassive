import AetherClient from 'aether-client-js'
import Muon from 'muonjs'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

function requestLogin(creds) {
    return {
        type: LOGIN_REQUEST,
        isFetching: true,
        isAuthenticated: false,
        creds
    }
}

function receiveLogin(user) {
    console.log(user);
    return {
        type: LOGIN_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
        id_token: user.id_token
    }
}

function loginError(message) {
    return {
        type: LOGIN_FAILURE,
        isFetching: false,
        isAuthenticated: false,
        message
    }
}

export function verifyUser(creds) {

}

export function loginUser(creds) {


    return dispatch => {

        var muon = Muon.client({port: 9898});
        var aether = new AetherClient(muon);

        dispatch(requestLogin(creds))

        console.log(creds);

        // do our login here

        return aether.login({
            type:"password",
            username: creds.username,
            password: creds.password
        }).then((auth) => {
            //console.log("GOT DATAZ " + JSON.stringify(auth))
            //
            // aether.deepVerify(auth.token).then((dat) => console.dir(dat)).catch((er) => console.dir(er))

            // muon.requestWithAuth("rpc://stream-test/in", {}, auth).then((ret) => console.dir(ret)).catch((err) => console.dir(err))
            localStorage.setItem('id_token', auth.id_token)
            dispatch(receiveLogin({id_token: auth.token}));

        }).catch(function(err) {
            dispatch(loginError(err.message))
        })
        //setTimeout(function() {
        //
        //})
    }
}

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

function requestLogout() {
    return {
        type: LOGOUT_REQUEST,
        isFetching: true,
        isAuthenticated: true
    }
}

function receiveLogout() {
    return {
        type: LOGOUT_SUCCESS,
        isFetching: false,
        isAuthenticated: false
    }
}

// Logs the user out
export function logoutUser() {
    return dispatch => {
        dispatch(requestLogout())
        localStorage.removeItem('id_token')
        dispatch(receiveLogout())
    }
}

export const REGISTER_REQUEST = 'REGISTER_REQUEST'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_FAILURE = 'REGISTER_FAILURE'

function requestRegister(creds) {
    return {
        type: REGISTER_REQUEST,
        isFetching: true,
        isAuthenticated: false,
        creds
    }
}

function receiveRegister(user) {
    return {
        type: REGISTER_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
        id_token: user.id_token
    }
}

function registerError(message) {
    return {
        type: REGISTER_FAILURE,
        isFetching: false,
        isAuthenticated: false,
        message
    }
}

export function registerUserPassword(creds) {
    return dispatch => {
        dispatch(requestRegister(creds))

        console.log(creds);

        var u = {
            type: "password",
            username: creds.username,
            password: creds.password
        }

        var muon = Muon.client({port: 9898});
        var aether = new AetherClient(muon);

        muon.request("rpc://aether-password/register", u)
            .then((val) => {
                console.dir(val)

                //console.log("User is " + JSON.stringify(aether.userdb))
                //assert(user)
                // done()
                dispatch(receiveRegister(creds));
            })
            .catch((er) => {
                dispatch(registerError(er.message))
                console.dir(er)
            })
    }
}