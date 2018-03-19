import React, { Component } from 'react'
import PropTypes from 'prop-types'
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
            <div className="nzButtonsPosition">
                {this.props.changeAccountsList.map((item, key) => {
                    let param = Utils.selectButtonsParams(item.pname)
                    Object.assign(param, item)
                    return (
                        <ButtonAccount
                            params={param}
                            key={key}
                            pushPage={this.props.pushPage}
                        />
                    )
                })}
                <ButtonAccount
                    params={Utils.selectButtonsParams(this.state.params.pname)}
                    pushPage={this.props.pushPage}
                />
            </div>
        )
    }
}

ButtonsSection.propTypes= {
    pushPage: PropTypes.func
}

export default connect((state) => ({
    changeAccountsList: state.changeAccountsList
}))(ButtonsSection)