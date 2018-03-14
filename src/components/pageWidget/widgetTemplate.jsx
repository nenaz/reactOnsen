import React, { Component } from 'react'
import PropTypes from 'prop-types'
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
            <div className="nzWidgetMarginAll">
                {title}
                {this.props.children}
            </div>
        )
    }
}

WidgetTemplate.propTypes = {
    title: PropTypes.string,
    selectTitle: PropTypes.bool,
    children: PropTypes.object,
}

export default WidgetTemplate