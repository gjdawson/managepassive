import { connect } from 'react-redux'
import SensorsController from '../components/SensorsPageController'

const mapStateToProps = (state) => {

    return {
        sensors: state.sensors,
        activity: state.activity
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}


//export default MainLayout;
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SensorsController);