import React,{ Component} from 'react'
import { Button } from  'react-onsenui'
import '../../css/App.css'
import { connect } from 'react-redux'
import { selectTypeOperation } from '../../AC'

class CheckTypeOperation extends Component{
    constructor(props){
        super(props)
        this.state ={
            activeButton: this.props.typeOperation || "0"
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
                    className={`nzTitleCol ${(this.state.activeButton === "0") ? "nzActive" : ""} nzCenterButton `}
                    modifier='outline'
                    type="0"
                    onClick={this.handleSelectActiveButton}
                >
                    Расход
                </Button>
                <Button
                    className={`nzTitleCol ${(this.state.activeButton === "1") ? "nzActive" : ""} `}
                    type="1"
                    modifier='outline'
                    onClick={this.handleSelectActiveButton}
                >
                    Доход
                </Button>
                <Button
                    className={`nzTitleCol ${(this.state.activeButton === "2") ? "nzActive" : ""} `}
                    modifier='outline'
                    type="2"
                    onClick={this.handleSelectActiveButton}
                >
                    Перевод
                </Button>
            </div>
        )
    }
}

export default connect((state) => ({
    // typeOperation: state.changeTypeOperation
}),{
    selectTypeOperation
})(CheckTypeOperation)