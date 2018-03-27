import React, { Component } from 'react'
import {
    Select
} from 'react-onsenui'

class SelectTitle extends Component{
    constructor(props){
        super(props)
        this.state ={}
    }

    renderItem(item) {
        return (
            <option key={item.value} value={item.value}>{item.title}</option>
        )
    }

    render() {
        return (
            <Select
                id="choose-sel"
                value={this.state.modifier}
                modifier={this.state.modifier}
                onChange={this.props.handleChangeSelect}
                className="nzTitleSelect"
            >
                {this.props.data.map(item => {
                    return this.renderItem(item)
                })}
            </Select>
        )
    }
}


export default SelectTitle