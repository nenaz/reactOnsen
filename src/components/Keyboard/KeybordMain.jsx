import React,{ Component} from 'react'
import { Button } from 'react-onsenui'
import '../../css/App.css'

class KeyboardMain extends Component{
    constructor(props){
        super(props)
        this.state ={}

        this.numButtons = [["9", "8", "7"], ["6", "5", "4"], ["3", "2", "1"], ["C", "0", ","]]
        this.mathButtons = ["/","*","-","+","="]

        this.renderItemNum = this.renderItemNum.bind(this)
        this.renderMathButton = this.renderMathButton.bind(this)
    }

    renderItemNum() {
        return (
            <div className="nzButtonsBlock1">
                {this.numButtons.map((item, key) => {
                    return (
                        <div className="nzButtonRow" key={key}>
                            {item.map((num, key) => {
                                let callback = this.props.handlerClickCalcButton
                                let back = false
                                if (isNaN(num)) {
                                    callback = (num === 'C') ?
                                        this.props.handlerClickBackButton :
                                        this.props.handlerClickCommaButton
                                    back = (num === 'C') ? true : false
                                }
                                let cl = (key === 1) ? 'nzButton' : 'nzButton nzButtonCenter'
                                cl = (back) ? `${cl} nzButtonClear` : cl
                                return (
                                    <Button
                                        key={key}
                                        modifier='outline'
                                        className={cl}
                                        onClick={callback}
                                    >{num}</Button>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        )
    }

    renderMathButton() {
        return (
            <div className="nzButtonsBlock2">
                <div className="nzButtonCol">
                    {this.mathButtons.map((item, key) => {
                        return <Button key={key} class="nzButton" modifier='outline' onClick={this.props.handlerMathOperationClick}>{item}</Button>
                    })}
                </div>
            </div>
        )
    }

    render(){
        return (
            <div className='nzKeyboard'>
                {this.renderItemNum()}
            </div>
        )
    }
}

export default KeyboardMain