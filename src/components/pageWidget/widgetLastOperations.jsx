import React,{ Component} from 'react'
import { connect } from 'react-redux'
import { List, ListItem, Modal, Button } from 'react-onsenui'

import TitleSelect from '../TitleSelect'
// import Title from '../Title'
import { FILTERLIST } from '../../js/consts'
import ShowOperDetails from '../ShowOperDetails/showOperDetails';

class WaigetLastOperations extends Component{
    constructor(props){
        super(props)
        this.state ={
            moreFive: false,
            filter: 'last5',
            modalOpen: false,
        }
        this.filterOperations = this.filterOperations.bind(this)
        this.handleChangeSelect = this.handleChangeSelect.bind(this)
        this.renderRow = this.renderRow.bind(this)
        this.showDetails = this.showDetails.bind(this)
        this.handleHideModal = this.handleHideModal.bind(this)
        this.selectOperationsIcon = this.selectOperationsIcon.bind(this)
    }

    showDetails(e) {
        this.setState({
            _id: e.currentTarget.getAttribute('_id'),
            modalOpen: true
        });
    }

    handleHideModal() {
        this.setState({ modalOpen: false });
    }

    selectOperationsIcon(type) {
        switch(type) {
            case "1": return 'icon-payment_up'
            case "2": return 'icon-transfer'
            default: return 'icon-payment_dowm'
        }
    }

    renderRow(row, index) {
        const icon = this.selectOperationsIcon(row.typeOperation)
        return (
            <ListItem
                key={index}
                tapBackgroundColor="#0f0f0f"
                tappable
                _id={row._id}
                onClick={this.showDetails}
                className="nzWidgetLastOperationsListItem"
            >
                <div className="left _left">
                    <span className={icon} />
                </div>
                <div className="center _center">
                    <div className="_centerTop">
                        <span>{row.amount || row.amount}</span>
                    </div>
                    {row.data && <div className="_centerBottom">
                        <span>{row.data.date}</span>
                        <span>{row.data.time}</span>
                    </div>}
                </div>
            </ListItem>
        )
    }

    handleChangeSelect(e) {
        debugger
        this.setState({
            filter: e.target.value
        })
    }

    filterOperations() {
        let result = []
        switch(this.state.filter) {
            case 'last5': result = this.props.operations.slice(0, 5)
                break
            default: result = this.props.operations
        }
        // debugger
        return result
    }

    render(){
        return (
            <div className="nzWidgetLastOperations">
                <TitleSelect data={FILTERLIST} handleChangeSelect={this.handleChangeSelect} />
                {/* <Title title={FILTERLIST[0].title} /> */}
                <List className="nzWidgetLastOperationsList"
                    dataSource={this.filterOperations()}
                    renderRow={this.renderRow}
                />
                <Modal isOpen={this.state.modalOpen}>
                    <ShowOperDetails
                        _id={this.state._id}
                        handleHideModal={this.handleHideModal}
                    />
                </Modal>
            </div>
        )
    }
}

export default connect((state) => ({
    operations: state.changeLastOperations
}))(WaigetLastOperations)