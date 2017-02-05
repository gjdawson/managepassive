export function connectSensor(sensor) {
    return {
        type: 'REGISTER_SENSOR',
        sensor: sensor
    }
}

export function removeSensor(sensor) {
    return {
        type: 'REMOVE_SENSOR',
        sensor: sensor
    }
}

export function disconnectSensor(sensor) {
    return {
        type: 'DISCONNECT_SENSOR',
        sensor: sensor
    }
}

export function sensorActivity(sensor) {
    return {
        type: 'SENSOR_ACTIVITY',
        sensor: sensor
    }
}

export const sensorsReady = () => {
    return {
        type: 'SITE_SENSORS_READY'
    }
}