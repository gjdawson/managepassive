import React from 'react'
//import { Line } from 'react-chartjs-2'
//import { Line } from './charts/Chart'

class SensorChart extends React.Component {
    render() {
        let width = 200;

        console.log(this.props.data);

        return (
            <div>
                <canvas id="sensorChart" style={{width: '100%', height: '100%'}}></canvas>
            </div>
        )
    }
}

export default SensorChart