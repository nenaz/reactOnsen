import React,{ Component} from 'react'
import { connect } from 'react-redux'
import { List, ListItem, Modal, Button } from 'react-onsenui'
import { ICONCAHMINUS, ICONCAHPLUS } from '../../js/consts'
import Icon from '../Icon'

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

    renderRow(row, index) {
        const icon = (row.typeOperation === "1") ? ICONCAHPLUS : ICONCAHMINUS
        return (
            <ListItem
                key={index}
                tapBackgroundColor="#0f0f0f"
                tappable
                _id={row._id}
                onClick={this.showDetails}
            >
                <div className="left">
                    <Icon
                        iconBase64={icon} styleObj={{
                            width: '40px'
                        }}
                    />
                </div>
                <div className="center" style={{
                    display: 'flex',
                    flexDirection: 'row',
                }}>
                    <div style={{
                        flexGrow: 1,
                        justifyContent: 'space-around',
                        display: 'flex'
                }}>
                        <span style={{ paddingRight: '7px' }}>{row.balance}</span>
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                        <span>{row.data.date}</span>
                        <span>{row.data.time}</span>
                    </div>
                </div>
            </ListItem>
        )
    }

    handleChangeSelect(e) {
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
        return result
    }

    render(){
        return (
            <div>
                <TitleSelect data={FILTERLIST} handleChangeSelect={this.handleChangeSelect} />
                {/* <Title title={FILTERLIST[0].title} /> */}
                <List 
                    style={{
                        overflowY: 'scroll',
                        maxHeight: '55vh',
                        minHeight: '55vh'
                    }}
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