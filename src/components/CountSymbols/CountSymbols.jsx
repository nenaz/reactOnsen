import React, { Component} from 'react'
import PropTypes from 'prop-types'
import './css/CountSymbols.css'

class CountSymbols extends Component{
    constructor(props){
        super(props)
        this.state ={
            data: [1,2,3,4,5,6]
        }
    }

    render(){
        return (
            <div className="nzCountSymbols">
                {this.state.data.map((i, key) => {
                    const className = (i <= this.props.count) ? 'active' : ''
                    return (
                        <span className={`nzCountSymbolsItem ${className}`} key={key} />
                    )
                })}
            </div>
        )
    }
}

CountSymbols.propTypes = {
    count: PropTypes.number.isRequired
}

export default CountSymbols