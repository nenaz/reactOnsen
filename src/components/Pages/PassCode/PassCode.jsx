import React, { Component} from 'react'
import PropTypes from 'prop-types'
import {
    Button
} from 'react-onsenui'
import CountSymbols from '../../CountSymbols'
import Requester from '../../../js/requester'
// import { connect } from 'react-redux'
// import { changePassCode } from '../../../AC'
import bcrypt from 'bcryptjs'

class PassCode extends Component{
    constructor(props){
        super(props)
        this.state ={
            value: '',
            count: 0,
            passCode: '',
            repeatePassCode: '',
            helpText: 'Введите код'
        }
        this.req = new Requester()
        this.numButtons = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "check", "0", "back"]
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
            })
        }
    }

    handleOkClick() {
        const value = this.state.value
        if (!this.state.passCode) {
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
                // bcrypt.hash(value, 10, (err, hash) => {
                //     console.log(hash)
                    // this.req.setLocal('localOptions', hash, 'userPassCode')
                    // this.req.request('setPass', {
                        // passcode: value
                    // })
                    // this.props.handleLogon()
                    // this.props.togglePassCodeBlock()
                    // window.location.reload()
                // })
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
                    if (item === 'check') {
                        data = <span
                            className="icon-checked"
                        />
                        func = this.handleOkClick
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
            <section>
                <div>
                    <span>{this.state.value}</span>
                    <CountSymbols count={this.state.count} />
                    <section className="nzAddUserSection">
                        {this.renderItemNum()}
                    </section>
                    <span>{this.state.helpText}</span>
                </div>
            </section>
        )
    }
}

PassCode.propTypes = {
    checkPassClassName: PropTypes.string,
    togglePassCodeBlock: PropTypes.func.isRequired,
    logonRequestWithPassCode: PropTypes.func,
}

export default PassCode
// export default connect(null, {
//     changePassCode,
// })(PassCode)