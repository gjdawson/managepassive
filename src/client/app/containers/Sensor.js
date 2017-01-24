import { connect } from 'react-redux'
import Sensor from '../components/Sensor'

const mapStateToProps = (state) => {

    return {
        activity: state.activity
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}


//export default MainLayout;
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Sensor);