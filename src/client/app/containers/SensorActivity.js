import { connect } from 'react-redux'
import SensorActivityController from '../components/SensorActivityController'

import { registerNewSensor, sensorActivity } from '../actions/sensorActivity'
import { siteReady } from '../actions/siteStatus'

const mapStateToProps = (state) => {

    return {
        sensors: state.sensors,
        activity: state.activity
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        registerNewSensor: (sensor) => {
            dispatch(registerNewSensor(sensor))
        },

        updateSensor: (sensor) => {
            dispatch(sensorActivity(sensor))
        },

        systemSynchronised: () => {
            dispatch(siteReady())
        }
    }
}


//export default MainLayout;
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SensorActivityController);