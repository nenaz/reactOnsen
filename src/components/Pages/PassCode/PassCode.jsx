import React, { Component} from 'react'
import PropTypes from 'prop-types'
import {
    Button,
    Input
} from 'react-onsenui'
import CountSymbols from '../../CountSymbols'

class PassCode extends Component{
    constructor(props){
        super(props)
        this.state ={
            value: '',
            count: 0,
        }

        // this.numButtons = [["9", "8", "7"], ["6", "5", "4"], ["3", "2", "1"], ["C", "0", ","]]
        this.numButtons = ["1", "2", "3", "4", "5", "6", "7", "8", "9", " ", "0", "back"]
        this.renderItemNum = this.renderItemNum.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e) {
        const value = this.state.value
        const count = this.state.count
        const text = e.target.innerText
        this.setState({
            value: text
                ? value + e.target.innerText
                : value.substr(0, value.length - 1),
            count: text
                ? count + 1
                : count - 1,
        })
    }

    renderItemNum() {
        return (
            <div className="nzButtonsPassCode">
                {this.numButtons.map((item, key) => {
                    let data = item;
                    if (item === 'back') {
                        data = <span className="icon-left-arrow"></span>
                    }
                    return (
                        <Button
                            key={key}
                            modifier='outline'
                            // className={cl}
                            onClick={this.handleClick}
                        >{data}</Button>
                    )
                })}
            </div>
        )
    }

    render(){
        if (this.props.checkPassClassName) {
            return (
                <section>
                    <span>{this.state.value}</span>
                    <CountSymbols count={this.state.count} />
                    <section className="nzAddUserSection">
                        {this.renderItemNum()}
                    </section>
                </section>
            )
        } else {
            return <section />
        }
    }
}

PassCode.propTypes = {
    checkPassClassName: PropTypes.string,
}

export default PassCode