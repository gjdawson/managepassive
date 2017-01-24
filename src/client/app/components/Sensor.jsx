import React from 'react'
import { Link } from 'react-router'
import { Glyphicon } from 'react-bootstrap'

class Sensor extends React.Component {

    constructor() {
        super();

        this.state = {
            timer: null,
            sensorVal: 0
        }
    }

    loadTime(val) {
        if(this.state.timer !== null) {
            clearTimeout(this.state.timer);
            //console.log('Clearing old timer');
        }

        var timeout = setTimeout(function() {
            this.setState({timer: null, sensorVal: 0});
        }.bind(this), 4000);

        this.setState({sensorVal: val, timer: timeout});
    }

    endTime() {
        if(this.state.timer !== null) {
            clearTimeout(this.state.timer);
        }
    }

    componentWillReceiveProps(props) {

        var current = this.props.activity[this.props.sensorid];
        var next = props.activity[this.props.sensorid];

        if(typeof current !== 'undefined') {
            if (current.time !== next.time) {
                this.loadTime(props.activity[props.sensorid].pressure);
            }
        }
    }

    componentWillUnmount() {
        this.endTime();
    }

    render() {

        var sensedata = this.props.activity[this.props.sensorid];

        if(typeof sensedata !== 'undefined') {

            var tint = '#fff';
            if(this.state.sensorVal > 0) {
                if(this.state.sensorVal < 30) {
                    // up to half
                    tint = '#ffcc99';
                } else if (this.state.sensorVal < 60) {
                    tint = '#ff6600';
                } else {
                    tint = '#ff0000';
                }
            }

            //tint = 'background-color: ' + tint;

            return (
                <sensor className={"sensor pull-left"}>
                    <div className="indicator-pad">
                        <div className="square">
                            <div className="indicator" style={{width: this.state.sensorVal+"%", height: this.state.sensorVal+"%", background: tint}}></div>
                        </div>
                    </div>
                    <div className="sensor-name"><Link to={"/sensor/" + sensedata.sensorid}>Sensor: {sensedata.sensorid}</Link></div>

                </sensor>
            )
        } else {
            return (
                <sensor className={"sensor pull-left"}>
                    <div className="indicator-pad">
                        <div className="square">
                            <Glyphicon glyph="refresh" className="spinner-loading"/>
                        </div>
                    </div>
                    <div>Loading...</div>
                </sensor>
            )
        }
    }
}

import { connect } from 'react-redux'

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