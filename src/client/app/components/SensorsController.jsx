import React from 'react'
import Sensor from './Sensor';

// Muon

//var Muon = require("muonjs");
//var muon = Muon.client({port: 9898});



class SensorsController extends React.Component {

    constructor(props) {
        super(props);
        //this.state = {
        //    sensors: []
        //}
    }

    componentDidMount() {

    }

    render() {

        return (
            <div>
                <h2>Sensors</h2>
                <div>
                    {
                        Object.keys(this.props.sensors).map(function(key){
                            return <Sensor sensorid={this.props.sensors[key].sensorid} key={key} />
                        }.bind(this))
                    }
                </div>
            </div>
        );
    }
}


import { connect } from 'react-redux'

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