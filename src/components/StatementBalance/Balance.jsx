import React, { Component} from 'react'
import PropsTypes from 'prop-types'

class Balance extends Component{
    constructor(props){
        super(props)
        this.state ={}
    }

    render(){
        const nameCss = (this.props.separtor) ? 'nzBalanceGreen' : 'nzBalanceRed'
        const separator = (this.props.separtor) ? '+' : '-'
        return (
            <div className={nameCss}>
                <span>{separator}</span>
                <span>{this.props.amount}</span>
            </div>
        )
    }
}

Balance.PropsTypes = {
    amount: PropsTypes.string,
    separtor: PropsTypes.string
}

export default Balance