import React, { Component } from 'react'
import ButtonAccount from './ButtonAccount'
import Utils from '../../js/utils'
import { connect } from 'react-redux'

class ButtonsSection extends Component {
    constructor(props) {
        super(props)
        this.state = {
            params: {}
        }

    }

    componentWillMount() {
        this.setState({
            params: Utils.selectButtonsParams('AccountsButtonAdd')
        })
    }

    render() {
        return (
            <div className="buttonsPosition">
                {this.props.changeAccountsList.map((item, key) => {
                    let param = Utils.selectButtonsParams(item.pname)
                    Object.assign(param, item)
                    return <ButtonAccount params={param} key={key}/>
                })}
                <ButtonAccount params={Utils.selectButtonsParams(this.state.params.pname)} />
            </div>
        )
    }
}

export default connect((state) => ({
    changeAccountsList: state.changeAccountsList
}))(ButtonsSection)