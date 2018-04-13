import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import CheckTypeOperation from './typeOperation'
import Utils from '../../js/utils'
import { connect } from 'react-redux'
import { selectTypeOperation } from '../../AC'

class SelectTypeOperation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tt: 0,
            typeOperation: this.props.typeOperation,
        }

        this.renderLists = this.renderLists.bind(this)
        this.categotyIdToTitle = this.categotyIdToTitle.bind(this)
        this.handleSelectActiveButton = this.handleSelectActiveButton.bind(this)
    }

    categotyIdToTitle() {
        return Utils.findCateGoryNameOnId(this.props.categoryId)
    }

    renderLists() {
        if (this.state.typeOperation === '2') {
            return (
                <div onClick={() => {
                    this.props.handleRunAnimation(0)
                }}>
                    <span className="nzAmountSelectTitle">Счет</span>
                    <span className="nzAmountSelectText">{this.props.accountNameTo}</span>
                    <span className="nzAmountSelectAmount">{this.props.accountToAmount}</span>
                </div>
            )
        } else {
            const categoryObj = this.categotyIdToTitle()
            return (
                <div onClick={() => {
                    this.props.handleRunAnimation(1)
                }}>
                    <span className="nzAmountSelectTitle">Категория</span>
                    <span className="nzAmountSelectText">{categoryObj.title}</span>
                    <span className="nzAmountSelectSubCategory">{categoryObj.subTitle}</span>
                </div>
            )
        }
    }

    handleSelectActiveButton(type) {
        this.setState({
            typeOperation: type
        })
        this.props.selectTypeOperation(type)
    }

    render() {
        return (
            <Fragment>
                <CheckTypeOperation
                    handleSelectActiveButton={this.handleSelectActiveButton}
                />
                <div className="nzAmountSection">
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
                    <div className="nzAmountSelect">
                        <div onClick={() => {
                            this.props.handleRunAnimation(0)
                        }}>
                            <span className="nzAmountSelectTitle">Счет</span>
                            <span className="nzAmountSelectText">{this.props.accountName}</span>
                            <span className="nzAmountSelectAmount">{this.props.accountFromAmount}</span>
                        </div>
                        {this.renderLists()}
                    </div>
                </div>
            </Fragment>
        )
    }
}

SelectTypeOperation.propTypes = {
    typeOperation: PropTypes.string,
    accountNameTo: PropTypes.string,
    handleRunAnimation: PropTypes.func,
    inputAmount: PropTypes.string,
    comma: PropTypes.bool,
    part: PropTypes.string,
    amountfontSize: PropTypes.string,
    accountName: PropTypes.string,
    categoryId: PropTypes.string,
    accountFromAmount: PropTypes.string,
    accountToAmount: PropTypes.string,
}


export default connect(null, {
    selectTypeOperation
})(SelectTypeOperation)