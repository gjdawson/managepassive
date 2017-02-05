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

        this.types = [
            'generic',
            'temp',
            'audio'
        ];

        this.timeouts = {
            temp: -1,
            generic: 4,
            audio: 0.5
        }
    }

    loadTime(val, type) {
        if(this.state.timer !== null) {
            clearTimeout(this.state.timer);
            //console.log('Clearing old timer');
        }

        if(this.types.indexOf(type) == -1) {
            type = 'generic';
        }

        if(this.timeouts[type] !== -1) {
            let timeout = this.timeouts[type] * 1000
            var timer = setTimeout(function () {
                this.setState({timer: null, sensorVal: 0});
            }.bind(this), timeout);
        }
        this.setState({sensorVal: val, timer: timer});
    }

    endTime() {
        if(this.state.timer !== null) {
            clearTimeout(this.state.timer);
        }
    }

    componentWillReceiveProps(props) {

        var current = this.props.value;
        var next = props.value;

        if(typeof current !== 'undefined') {
            if (current !== next) {
                this.loadTime(next, props.type);
            }
        }
    }

    componentWillUnmount() {
        this.endTime();
    }

    loading() {
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

    sensor() {

    }

    render() {

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



        if(this.props.value == 0 && this.props.type == 'loading') {
            return this.loading();
        } else {
            let type, title;
            if(this.types.indexOf(this.props.type) == -1) {
                type = 'generic';
            } else {
                type = this.props.type;
            }

            if(this.props.single !== true) {
                title = (<Link to={"/sensor/" + this.props.id}>Sensor: {this.props.id}</Link>)
            } else {
                title = "Sensor:" + this.props.id;
            }
            return (
                <sensor className={"sensor pull-left"}>
                    <div className="indicator-pad">
                        <div className="square">

                            <div className="indicator" style={{height: this.state.sensorVal+"%", background: tint}}></div>
                            <div className={"sensor-type " + type}></div>
                        </div>
                    </div>
                    <div className="sensor-name">
                        {title}
                    </div>

                </sensor>
            )
        }


    }
}

import { connect } from 'react-redux'
import { sensorActivity } from '../actions/sensorActivity'

const mapStateToProps = (state) => {

    return {

    }
}

const mapDispatchToProps = (dispatch) =>
{
    return {

    }
}


//export default MainLayout;
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Sensor);