export const assignSensor = (data) => {
    return {
        type: 'ASSIGN_SENSOR',
        data: data
    }
}

export const unassignSensor = (data) => {
    return {
        type: 'UNASSIGN_SENSOR',
        data: data
    }
}