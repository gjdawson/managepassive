const registerNewSensor = (state = {}, action) => {
    //console.log('Register a sensor');
    //console.dir(action);
    //console.dir(state);
    switch(action.type) {
        case 'REGISTER_SENSOR':

            var t = {[action.sensor.sensorid]: action.sensor};

            //console.log('Adding ' + action.sensor.sensorid);
            return Object.assign({}, state, t);
        default:
            return state;
    }
}

export const sensors = (state = {}, action) => {
    switch(action.type) {
        case 'REGISTER_SENSOR':
            var t = {[action.sensor.sensorid]: action.sensor};
            //console.log('Adding ' + action.sensor.sensorid);
            return Object.assign({}, state, t);

        default:
            return state;
    }
}

export const activity = (state = {}, action) => {
    switch(action.type) {
        case 'SENSOR_ACTIVITY':
            var t = {[action.sensor.sensorid]: action.sensor};
            //console.log('Updating Sensor ' + action.sensor.sensorid)
            return Object.assign({}, state, t);
        default:
            return state
    }
}

export const history = (state = {}, action) => {

}