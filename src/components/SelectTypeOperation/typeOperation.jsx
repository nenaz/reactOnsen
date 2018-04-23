import React,{ Component} from 'react'
import PropTypes from 'prop-types'
import { Button } from  'react-onsenui'
import '../../css/App.css'
import { connect } from 'react-redux'

class CheckTypeOperation extends Component{
    constructor(props){
        super(props)
        this.state ={
            activeButton: this.props.typeOperation || "0"
        }

        this.handleSelectActiveButton = this.handleSelectActiveButton.bind(this)
        this.renderTransferButton = this.renderTransferButton.bind(this)
    }

    handleSelectActiveButton(e) {
        const type = e.target.getAttribute('type')
        this.setState({
            activeButton: type
        })
        this.props.handleSelectActiveButton(type)
    }

    renderTransferButton() {
        if (this.props.accountsLength > 1) {
            const classNameTransferButton = `nzTitleCol ${(this.state.activeButton === "2") ? "nzActive" : ""} ${this.props.accountsLength > 1 ? '' : "nzDisabled"}`
            return (
                <Button
                    className={classNameTransferButton}
                    modifier='outline'
                    type="2"
                    onClick={this.handleSelectActiveButton}
                >
                    Перевод
                </Button>
            )
        } else {
            return (
                <Button className='nzTitleCol nzDisabled'>
                    Перевод
                </Button>
            )
        }
    }

    render(){
        return (
            <div className="nzTitle">
                <Button
                    className={`nzTitleCol ${(this.state.activeButton === "0") ? "nzActive" : ""} `}
                    modifier='outline'
                    type="0"
                    onClick={this.handleSelectActiveButton}
                >
                    Расход
                </Button>
                <Button
                    className={`nzTitleCol ${(this.state.activeButton === "1") ? "nzActive" : ""} nzCenterButton `}
                    type="1"
                    modifier='outline'
                    onClick={this.handleSelectActiveButton}
                >
                    Доход
                </Button>
                {this.renderTransferButton()}
            </div>
        )
    }
}

CheckTypeOperation.propTypes = {
    handleSelectActiveButton: PropTypes.func,
}

export default connect((state) => ({
    accountsLength: state.changeAccountsList.length
}))(CheckTypeOperation)