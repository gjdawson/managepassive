// Reducers I guess?

import { combineReducers } from 'redux'
import { sensors, activity } from './sensors'
import { siteStatus } from './siteStatus'
import { rooms } from './rooms'
import { sensorsRooms } from './sensors-rooms'

const sensorManager = combineReducers({
    sensors: sensors,
    activity: activity,
    siteStatus: siteStatus,
    rooms: rooms,
    sensorsRooms: sensorsRooms
});

export default sensorManager