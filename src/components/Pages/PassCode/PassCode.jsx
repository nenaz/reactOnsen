import React, { Component} from 'react'
import PropTypes from 'prop-types'
import {
    Button
} from 'react-onsenui'
import CountSymbols from '../../CountSymbols'
import Requester from '../../../js/requester'
import './css/PassCode.css'

class PassCode extends Component{
    constructor(props){
        super(props)
        this.state ={
            value: '',
            count: 0,
            passCode: '',
            repeatePassCode: '',
            helpText: 'Введите код доступа',
            cancelText: 'Отмена'
        }
        this.req = new Requester()
        this.numButtons = ["1", "2", "3", "4", "5", "6", "7", "8", "9", " ", "0", "back"]
        this.renderItemNum = this.renderItemNum.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handleOkClick = this.handleOkClick.bind(this)
    }

    handleClick(e) {
        const value = this.state.value
        const symbol = e.target.innerText
        const newText = symbol
            ? value + symbol
            : value.substr(0, value.length - 1)
        const newLength = newText.length
        if (newLength <= 6 && newLength >= 0) {
            this.setState({
                value: newText,
                count: newLength,
            }, () => {
                if (this.state.count === 6) {
                    this.handleOkClick()
                }
            })
        }
    }

    handleOkClick() {
        const value = this.state.value
        if (!this.state.passCode && !this.props.hideCancelButton) {
            this.setState({
                passCode: value,
                value: '',
                count: 0,
                helpText: 'Повторите код'
            })
        } else {
            const value = this.state.value
            if (value === this.state.passCode) {
                this.props.logonRequestWithPassCode(value)
            }
            if (this.props.hideCancelButton) {
                this.props.handleLogon(value)
            }
        }
    }

    renderItemNum() {
        return (
            <div className="nzButtonsPassCode">
                {this.numButtons.map((item, key) => {
                    let data = item;
                    let func = this.handleClick
                    if (item === 'back') {
                        data = <span className="icon-left-arrow" />
                    }
                    return (
                        <Button
                            key={key}
                            modifier='outline'
                            onClick={func}
                        >{data}</Button>
                    )
                })}
            </div>
        )
    }

    render() {
        return (
            <section className={this.props.passCodeBlockStyle}>
                <div className={`${this.props.checkPassClassName}`}>
                    <div className="nzSpan">{this.state.helpText}</div>
                    <CountSymbols count={this.state.count} />
                    <section className="nzAddUserSection">
                        {this.renderItemNum()}
                    </section>
                    {!this.props.hideCancelButton && <Button
                        modifier='outline'
                        onClick={() => {
                            this.props.togglePassCodeBlock(false)
                        }}
                    >{this.state.cancelText}</Button>}
                </div>
            </section>
        )
    }
}

PassCode.propTypes = {
    checkPassClassName: PropTypes.string,
    togglePassCodeBlock: PropTypes.func,
    logonRequestWithPassCode: PropTypes.func,
    passCodeBlockStyle: PropTypes.string,
    hideCancelButton: PropTypes.bool,
}

export default PassCode