import React, { Component} from 'react'
import PropTypes from 'prop-types'

class CarouselItem extends Component{
    constructor(props){
        super(props)
        this.state ={}
    }

    render(){
        return (
            <div className="nzAmountInput">
                <div className="nzAmountItem nzTypeOperation">
                    <span>{this.state.typeOper}</span>
                </div>
                <div className="nzAmountItem nzAmountTextBlock">
                    <span style={{
                        fontSize: this.props.amountfontSize,
                    }}>{this.props.inputAmount}{(this.props.comma) ? ',' : ''}{(this.props.comma) ?
                        this.props.part : ''}</span>
                </div>
                <div className="nzAmountItem nzCurrency">
                    <span>RUB</span>
                </div>
            </div>
        )
    }
}

CarouselItem.propTypes = {
    amountfontSize: PropTypes.string,
    inputAmount: PropTypes.string,
    comma: PropTypes.bool,
    part: PropTypes.string,
}

export default CarouselItem