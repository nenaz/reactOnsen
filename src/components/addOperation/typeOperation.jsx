import React,{ Component} from 'react'
import PropTypes from 'prop-types'
import { Button } from  'react-onsenui'
import '../../css/App.css'
import { connect } from 'react-redux'
import { selectTypeOperation } from '../../AC'

class CheckTypeOperation extends Component{
    constructor(props){
        super(props)
        this.state ={
            // activeButton: this.props.typeOperation || '0',
        }

        this.handleSelectActiveButton = this.handleSelectActiveButton.bind(this)
    }

    handleSelectActiveButton(e) {
        this.setState({
            activeButton: e.target.getAttribute('type')
        })
        this.props.selectTypeOperation(e.target.getAttribute('type'))
    }

    render(){
        return (
            <div className="nzTitle">
                <Button
                    className={`nzTitleCol ${(this.props.typeOperation === '0') ? "nzActive" : ""} `}
                    modifier='outline'
                    type='0'
                    onClick={this.handleSelectActiveButton}
                >
                    Расход
                </Button>
                <Button
                    className={`nzTitleCol ${(this.props.typeOperation === '1') ? "nzActive" : ""} nzCenterButton `}
                    type='1'
                    modifier='outline'
                    onClick={this.handleSelectActiveButton}
                >
                    Доход
                </Button>
                <Button
                    className={`nzTitleCol ${(this.props.typeOperation === "2") ? "nzActive" : ""} `}
                    modifier='outline'
                    type='2'
                    onClick={this.handleSelectActiveButton}
                >
                    Перевод
                </Button>
            </div>
        )
    }
}

CheckTypeOperation.propTypes = {
    typeOperation: PropTypes.string,
}

export default connect((state) => ({
    // typeOperation: state.changeTypeOperation
}),{})(CheckTypeOperation)