import React, { Component } from 'react'
import { ResponsivePie } from '@nivo/pie'
import { connect } from 'react-redux'

class WidgetChart extends Component{
    constructor(props){
        super(props)
        this.state ={}
    }

    render(){
        return (
            <div className="nzWidgetChart">
            <ResponsivePie
                data={this.props.data}
                margin={{
                    "top": 40,
                    "right": 80,
                    "bottom": 40,
                    "left": 80
                }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={0}
                colors="d320c"
                colorBy="id"
                borderColor="inherit:darker(0.6)"
                radialLabelsSkipAngle={10}
                radialLabelsTextXOffset={6}
                radialLabelsTextColor="#f5f5f5"
                radialLabelsLinkOffset={0}
                radialLabelsLinkDiagonalLength={16}
                radialLabelsLinkHorizontalLength={24}
                radialLabelsLinkStrokeWidth={1}
                radialLabelsLinkColor="inherit"
                animate={true}
                motionStiffness={90}
                motionDamping={15}
                // enableRadialLabels={false}
                slicesLabelsSkipAngle={10}
                slicesLabelsTextColor="#333333"
                // enableSlicesLabels={false}
            />
            </div>
        )
    }
}

export default connect((state) => ({
    data: state.redAddDataToList
}))(WidgetChart)