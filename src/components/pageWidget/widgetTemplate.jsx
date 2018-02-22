import React, { Component } from 'react'
import Title from '../Title'

class WidgetTemplate extends Component{
    constructor(props){
        super(props)
        this.state ={}
        
        this.selectTypeTitle = this.selectTypeTitle.bind(this)
    }

    selectTypeTitle() {
        return (!this.props.selectTitle) ? <Title title={this.props.title} /> : false
    }

    render(){
        const title = this.selectTypeTitle()
        return (
            <div className="widgetMarginAll">
                {title}
                {this.props.children}
            </div>
        )
    }
}

export default WidgetTemplate