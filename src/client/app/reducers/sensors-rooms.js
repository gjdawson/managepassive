import _ from 'lodash'

const initialState = {
    rooms: {},
    _mmcAllAssigned: [],
    _sensorsRooms:{}
}

const assignSensors = (state, action) => {
    let t = action.data;
    let unassignedRoom = {};
    let assignedRoom = {};

    console.log(t);
    let oldroom = _.find(state.rooms, {sensors: t.sensors});

    if(typeof oldroom !== 'undefined') {
        // remove sensors from their old room
        let toKeep = oldroom.sensors.filter(function(e) {
            return !t.sensors.includes(e);
        });

        unassignedRoom = {[oldroom.id]: {id: oldroom.id, sensors:toKeep}};
        //console.log(state.rooms);
        //console.log(unassignedRoom)
    }

    if(t.id in state.rooms) {
        let a = state.rooms[t.id].sensors;
        let b = t.sensors;
        t.sensors = _.union(a,b);
    }

    assignedRoom = {[t.id]: t}

    let allAssigned = _.union(state._mmcAllAssigned, t.sensors);
    let rooms = Object.assign({}, state.rooms,  assignedRoom, unassignedRoom);

    return Object.assign({}, state, {rooms: rooms}, {_mmcAllAssigned: allAssigned});
}

const unassignSensor = (state, action) => {

    let t = action.data;

    let oldAssigned = state._mmcAllAssigned;
    let oldroom = _.find(state.rooms, {sensors: t.sensors});

    let unassignedRoom = {};

    if(typeof oldroom !== 'undefined') {
        // remove sensors from their old room
        let toKeep = oldroom.sensors.filter(function(e) {
            return !t.sensors.includes(e);
        });

        unassignedRoom = {[oldroom.id]: {id: oldroom.id, sensors:toKeep}};
        //console.log(state.rooms);
        //console.log(unassignedRoom)
    }

    let newAllAssigned = oldAssigned.filter(function(e) {
        return !t.sensors.includes(e);
    });

    let nState = Object.assign({}, state);

    let rooms = Object.assign({}, state.rooms, unassignedRoom);

    nState._mmcAllAssigned = newAllAssigned;
    nState.rooms = rooms

    return nState;


}
export const sensorsRooms = (state = initialState, action) => {
    switch (action.type) {
        case 'ASSIGN_SENSOR':
            console.log('assigning ');
            console.log(action);
            return assignSensors(state, action);
        case 'UNASSIGN_SENSOR':
            return unassignSensor(state, action);
        default:
            return state
    }
}