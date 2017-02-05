

export const sensors = (state = {}, action) => {
    switch(action.type) {
        case 'REGISTER_SENSOR':
            var t = {[action.sensor.id]: action.sensor};
            //console.log('Adding ' + action.sensor.sensorid);
            return Object.assign({}, state, t);
        case 'REMOVE_SENSOR':

            let s = Object.assign({}, state);
            delete s[action.sensor.id];
            return s;

        default:
            return state;
    }
}

export const activity = (state = {}, action) => {
    switch(action.type) {
        case 'SENSOR_ACTIVITY':
            var t = {[action.sensor.id]: action.sensor};
            //console.log('Updating Sensor ' + action.sensor.sensorid)
            return Object.assign({}, state, t);
        default:
            return state
    }
}

export const history = (state = {}, action) => {

}