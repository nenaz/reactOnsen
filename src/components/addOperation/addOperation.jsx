import React,{ Component} from 'react'
import {
    Page,
    Toolbar,
    Icon,
    ToolbarButton
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
                    <div>
                        <div className="button">Доход</div>
                        <div>Расход</div>
                        <div>Перевод</div>
                        <div>Доход</div>
                        <div>Расход</div>
                        <div>Перевод</div>
                        <div>Доход</div>
                        <div>Расход</div>
                        <div>Перевод</div>
                        <div>Доход</div>
                        <div>Расход</div>
                        <div>Перевод</div>
                    </div>
                    <div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </Page>
        )
    }
}

export default connect(null, {
    changeAnimationState
})(AddOperation)