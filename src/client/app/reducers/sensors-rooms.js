import _ from 'lodash'

const initialState = {
    rooms: {},
    _mmcAllAssigned: []
}
export const sensorsRooms = (state = initialState, action) => {
    switch (action.type) {
        case 'READBACK_SENSOR_ASSIGNMENT':
            let t = action.data;

            if(action.data.id in state) {
                let a = state[action.data.id].sensors;
                let b = action.data.sensors;
                t.sensors = _.union(a,b);
            }
            let allAssigned = _.union(state._mmcAllAssigned, t.sensors);
            let rooms = Object.assign({}, state.rooms,  {[t.id]: t});

            return Object.assign({}, state, {rooms: rooms}, {_mmcAllAssigned: allAssigned});
        default:
            return state
    }
}