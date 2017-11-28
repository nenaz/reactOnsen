import React,{ Component} from 'react'
import {
    Page,
    Toolbar,
    Icon,
    ToolbarButton,
    Button
} from 'react-onsenui'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { changeAnimationState } from '../../AC'
import '../../css/App.css'

class AddOperation extends Component{
    constructor(props){
        super(props)
        this.state ={}

        this.renderToolbar = this.renderToolbar.bind(this)
        this.handlerCanselClick = this.handlerCanselClick.bind(this)
    }

    handlerCanselClick() {
        this.props.changeAnimationState('backMainFromNewAccount')
        setTimeout(() => {
            this.props.changeAnimationState('')
        }, 500);
    }

    renderToolbar() {
        return (
            <Toolbar style={{
                position: 'relative'
            }}>
                <div className="left">
                    <Link to='/' style={{ textDecoration: 'none' }} onClick={this.handlerCanselClick}>
                        <ToolbarButton >
                            <Icon icon="ion-close" />
                        </ToolbarButton>
                    </Link>
                </div>
                <div className="center">New Operation</div>
                <div className="right">
                    <ToolbarButton ref='button' onClick={this.handlerOkClick}>
                        <Icon icon="ion-checkmark" />
                    </ToolbarButton>
                </div>
            </Toolbar>
        )
    }

    render(){
        return (
            <Page renderToolbar={this.renderToolbar}>
                <div>
                    <div>Доход</div>
                    <div>Расход</div>
                    <div>Перевод</div>
                </div>
                <div className="amountInput"></div>
                <div className="fromToText"></div>
                <div className='keyboard'>
                    <div className="nzButtonsBlock1">
                        <div className="nzButtonRow">
                            <Button class="nzButton" modifier='quiet'>9</Button>
                            <Button class="nzButton" modifier='quiet'>8</Button>
                            <Button class="nzButton" modifier='quiet'>7</Button>
                        </div>
                        <div className="nzButtonRow">
                            <Button class="nzButton" modifier='quiet'>6</Button>
                            <Button class="nzButton" modifier='quiet'>5</Button>
                            <Button class="nzButton" modifier='quiet'>4</Button>
                        </div>
                        <div className="nzButtonRow">
                            <Button class="nzButton" modifier='outline'>3</Button>
                            <Button class="nzButton" modifier='outline'>2</Button>
                            <Button class="nzButton" modifier='outline'>1</Button>
                        </div>
                        <div className="nzButtonRow">
                            <Button class="nzButton" modifier='outline'>Back</Button>
                            <Button class="nzButton" modifier='outline'>0</Button>
                            <Button class="nzButton" modifier='outline'>,</Button>
                        </div>
                    </div>
                    <div className="nzButtonsBlock2">
                        <div className="nzButtonCol">
                            <Button class="nzButton" modifier='outline'>/</Button>
                            <Button class="nzButton" modifier='outline'>*</Button>
                            <Button class="nzButton" modifier='outline'>-</Button>
                            <Button class="nzButton" modifier='outline'>+</Button>
                            <Button class="nzButton" modifier='outline'>=</Button>
                        </div>
                    </div>
                </div>
            </Page>
        )
    }
}

export default connect(null, {
    changeAnimationState
})(AddOperation)