import React from 'react'
import Sensor from './SensorController';
import { Panel, Well } from 'react-bootstrap'

import SensorChart from './SensorChart'

import Muon from 'muonjs'


class SingleSensorController extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sensordata: []
        }

        this.stream = null;
    }

    storeData(event) {

        var sensordata = this.state.sensordata.slice();
        sensordata.push(event);

        this.setState({sensordata: sensordata});

    }

    genTimeStamps(data) {
        return Object.keys(data).map(function(key) {
            let date = new Date(data[key].time);
            return (date.getHours() + ' ' + date.getMinutes())
        });
    }

    transformToDataSet(data) {
        return Object.keys(data).map(function(key) {
            return data[key].value;
        });
    }

    genDataObject(sensordata) {
        return {
            //labels: this.genTimeStamps(sensordata),
            datasets: [
                {
                    fill: false,
                    lineTension: 0.1,
                    data: this.transformToDataSet(sensordata)
                }
            ]
        }
    }

    componentWillMount() {
        this.muon = Muon.client({port: 9898});
        let streamName = 'sensor-data-'+this.props.routeParams.sensorid;
        // We're breaking the established pattern with this one, reading directly instead of through redux, because reasons

        this.stream = this.muon.subscribe('stream://photon/stream', {"stream-name": streamName},
            function (event) {
                //console.log(event);

                switch(event['event-type']) {
                    case 'sensor-data':


                        this.storeData({id: event.payload.id, value: event.payload.value, time: event['event-time']});

                        break;

                }
            }.bind(this),
            function (error) {
                console.dir(error);
            },
            function () {
                console.log('Stream Completed');
            }
        );
    }

    loadChart(data) {
        if(this.state.sensordata.length > 0) {
            return (<SensorChart data={data}/>)
        }
    }

    render() {

        let data = this.genDataObject(this.state.sensordata);
        let options = {
            maintainAspectRatio: false
        }


        return (

            <section className="sensor-page-header" id={this.props.routeParams.sensorid+"-single-container"}>
                <Panel>

                    <Sensor id={this.props.routeParams.sensorid} single={true}/>

                    <div className="sensor-graph">
                        <h3>Historical Data</h3>
                        <Well>

                            {this.loadChart(data)}

                        </Well>
                    </div>

                </Panel>
                <Panel>

                </Panel>
            </section>


        );
    }
}


import { connect } from 'react-redux'

const mapStateToProps = (state) => {

    return {
        //sensors: state.sensors,
        //activity: state.activity,
        //sensorsRooms: state.sensorsRooms
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}


//export default MainLayout;
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SingleSensorController);