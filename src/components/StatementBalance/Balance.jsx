import React, { Component} from 'react'
import PropsTypes from 'prop-types'

class Balance extends Component{
    constructor(props){
        super(props)
        this.state ={}
    }

    render(){
        let nameCss = (this.props.separator) ? 'nzBalanceRed' : 'nzBalanceGreen'
        const separator = (this.props.separator) ? '-' : '+'
        if (this.props.typeBalance) {
            nameCss += ' nzBalanceBig';
        }
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
    separator: PropsTypes.bool,
    typeBalance: PropsTypes.bool,
}

export default Balance