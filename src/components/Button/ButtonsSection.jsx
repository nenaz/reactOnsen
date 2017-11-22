import React, { Component } from 'react'
import ButtonAccount from './Button'
import Utils from '../../js/utils'

class ButtonsSection extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    
    render() {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between'
            }}>
                <ButtonAccount params={Utils.selectButtonsParams()} />
                <ButtonAccount params={Utils.selectButtonsParams('AccountsButtonAdd')} />
                <ButtonAccount params={Utils.selectButtonsParams('AccountButton')} />
                <ButtonAccount params={Utils.selectButtonsParams('AccountButton')} />
            </div>
        )
    }
}

export default ButtonsSection