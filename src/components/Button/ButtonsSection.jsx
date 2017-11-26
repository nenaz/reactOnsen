import React, { Component } from 'react'
import ButtonAccount from './Button'
import Utils from '../../js/utils'
import { connect } from 'react-redux'
// import { connect } from 'react-redux'
// import { changeAnimationState } from '../../AC'

class ButtonsSection extends Component {
    constructor(props) {
        super(props)
        this.state = {
            params: {}
        }

        // this.handlerButtonClick = this.handlerButtonClick.bind(this)
    }

    // handlerButtonClick() {
    //     this.props.changeAnimationState('left-to-right')
    // }

    componentWillMount() {
        this.setState({
            params: Utils.selectButtonsParams('AccountsButtonAdd')
        })
    }

    render() {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between'
            }}>
                {this.props.changeAccountsList.map((item) => {
                    let param = Utils.selectButtonsParams(item.pname)
                    Object.assign(param, item)
                    return <ButtonAccount params={param} />
                })}
                <ButtonAccount params={Utils.selectButtonsParams(this.state.params.pname)} />
            </div>
        )
    }
}

export default connect((state) => ({
    changeAccountsList: state.changeAccountsList
}))(ButtonsSection)