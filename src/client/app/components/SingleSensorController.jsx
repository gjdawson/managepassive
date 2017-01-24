import React from 'react'
import Sensor from './Sensor';
import { Panel, Well } from 'react-bootstrap'



import Muon from 'muonjs'
var muon = Muon.client({port: 9898});

class SingleSensorController extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sensordata: []
        }
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
            return data[key].pressure;
        });
    }

    genDataObject(sensordata) {
        return {
            labels: this.genTimeStamps(sensordata),
            datasets: [
                {
                    fill: false,
                    lineTension: 0.1,
                    data: this.transformToDataSet(sensordata)
                }
            ]
        }
    }

    componentDidMount() {


        // We're breaking the established pattern with this one, reading directly instead of through redux, because reasons

        muon.subscribe('stream://photon/stream', {"stream-name": "mmc-sensors"},
            function (event) {
                //console.log(event);

                switch(event['event-type']) {
                    case 'sensor-data':
                        //updateSensor(event.payload);

                        // dumb storage, because we probably want to pull in data from other sets
                        // though this might be unnecessary with changes to muon
                        if(event.payload.sensorid == this.props.routeParams.sensorid) {
                            console.log('data');
                            this.storeData(event.payload);
                        }
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

    render() {

        let data = this.genDataObject(this.state.sensordata);
        let options = {
            maintainAspectRatio: false
        }


        return (

            <section className="sensor-page-header" id={this.props.routeParams.sensorid+"-single-container"}>
                <Panel>

                    <Sensor sensorid={this.props.routeParams.sensorid} />

                    <div className="sensor-graph">
                        <h3>Historical Data</h3>
                        <Well>



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