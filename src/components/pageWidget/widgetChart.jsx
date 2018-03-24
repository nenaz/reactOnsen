import React, { Component } from 'react'
// import {Line as LineChart} from 'react-chartjs'
// import Chart from 'chart.js'
import { PieChart, Pie, Cell, LabelList }  from 'recharts'

class WidgetChart extends Component{
    constructor(props){
        super(props)
        this.state ={}

        this.chartParthClick = this.chartParthClick.bind(this)
    }

    chartParthClick(event) {
        debugger
    }

    render(){
        const data01 = [
            // {v1: 10, v2: 20, v3: 30}, {b1: 110, b2: 220, b3: 330}
            { name: 'Group A', value: 400 }, { name: 'Group B', value: 300 },
            { name: 'Group C', value: 300 }, { name: 'Group D', value: 200 },
            { name: 'Group E', value: 278 }, { name: 'Group F', value: 189 }
        ]
        const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#fff', 'rgb(64,64,64)'];
        return (
            // <LineChart  width="600" height="250" />
            // <canvas id="myChart" width="400" height="400"></canvas>
            <section>
                <PieChart width={312} height={250}>
                    <Pie
                        startAngle={360}
                        endAngle={0}
                        data={data01}
                        // dataKey={1}
                        innerRadius={40}
                        // cx={50%} 
                        // cy={50%}
                        outerRadius={80}
                        fill="#8884d8"
                        // label
                        // labelLine
                        legendType='circle'
                        onClick={this.chartParthClick}
                    >
                        {
                            data01.map((entry, index) => 
                            <Cell fill={COLORS[index % COLORS.length]} key={index} />)
                            
                        }
                        <LabelList value="any" position="top" fill="rgb(64,64,64)" />
                    </Pie>
                </PieChart>
            </section>
        )
    }
}

export default WidgetChart