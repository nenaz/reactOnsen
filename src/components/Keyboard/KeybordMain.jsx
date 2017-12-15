import React,{ Component} from 'react'
import { Button } from 'react-onsenui'
import '../../css/App.css'

class KeyboardMain extends Component{
    constructor(props){
        super(props)
        this.state ={}

        this.numButtons = [["9", "8", "7"], ["6", "5", "4"], ["3", "2", "1"], ["Back", "0", ","]]
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
                                if (isNaN(num)) {
                                    callback = (num === 'Back') ? this.props.handlerClickBackButton : this.props.handlerClickCommaButton
                                }
                                return <Button key={key} class="nzButton" modifier='outline' onClick={callback}>{num}</Button>
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
                {this.renderMathButton()}
            </div>
        )
    }
}

export default KeyboardMain