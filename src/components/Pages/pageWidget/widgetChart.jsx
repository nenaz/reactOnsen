import React, { Component } from 'react'
// import {Line as LineChart} from 'react-chartjs'
// import Chart from 'chart.js' 

class WidgetChart extends Component{
    constructor(props){
        super(props)
        this.state ={}
    }

    render(){
        return (
            // <LineChart  width="600" height="250" />
            <canvas id="myChart" width="400" height="400"></canvas>
        )
    }
}

export default WidgetChart