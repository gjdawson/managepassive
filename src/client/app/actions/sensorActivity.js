export function registerNewSensor(sensor) {
    return {
        type: 'REGISTER_SENSOR',
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