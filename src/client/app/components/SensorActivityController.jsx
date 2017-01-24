import React, { PropTypes } from 'react';

import Muon from 'muonjs';
import _ from 'lodash'
var muon = Muon.client({port: 9898});

import SensorActivity from './SensorActivity'

class SensorActivityController extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            loaded: true,
            timer: null,
            loadtimer: null
        }
    }

    loadTime() {
        if(this.state.timer !== null) {
            clearTimeout(this.state.timer);
            //console.log('Clearing old timer');
        }

        var timeout = setTimeout(function() {
            this.setState({timer: null, loaded: true});
        }.bind(this), 4000);
        this.setState({loaded: false, timer: timeout});
    }

    tickLoader() {
        if(this.state.loadtimer !== null) {
            clearTimeout(this.state.loadtimer);
            //console.log('Clearing old timer');
        }

        var timeout = setTimeout(function() {
            this.setState({loadtimer: null});

        }.bind(this), 4000);
        this.setState({loaded: false, loadtimer: timeout});
    }

    componentWillReceiveProps() {
        this.loadTime();
    }

    render() {
        return(
            <SensorActivity status={this.state.loaded} />
        );
    }
}

SensorActivityController.propTypes = {
    sensors: PropTypes.object.isRequired,
    activity: PropTypes.object.isRequired
}

import { connect } from 'react-redux'

import { siteReady } from '../actions/siteStatus'

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
)(SensorActivityController);