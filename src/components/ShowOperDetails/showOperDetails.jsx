import React,{ Component} from 'react'
import PropTypes from 'prop-types'
import YandexMap from '../YM'
import { List, ListItem, Button } from 'react-onsenui'
import { OPERATIONDETAILS } from '../../js/consts'
import { connect } from 'react-redux'

class ShowOperDetails extends Component{
    constructor(props){
        super(props)
        this.state ={}

        this.renderRowDetails = this.renderRowDetails.bind(this)
        this.getInfo = this.getInfo.bind(this)
        this.getAccountName = this.getAccountName.bind(this)
        this.getTypeOperation = this.getTypeOperation.bind(this)
        this.getAccountAmount = this.getAccountAmount.bind(this)
    }

    renderRowDetails(row, index, obj) {
        return (
            <ListItem
                key={index}
                tapBackgroundColor="#0f0f0f"
            >
                <span>{row}</span><span>{index}</span>
            </ListItem>
        )
    }

    getInfo() {
        const id = this.props._id
        return this.props.operations.find((item, key) => {
            return item._id === id
        })
    }

    getAccountName(accountId) {
        const accountObj = this.props.accountsList.find((item, key) => {
            return item._id === accountId
        })
        return accountObj.accountName
    }

    getAccountAmount(accountId) {
        const accountObj = this.props.accountsList.find((item, key) => {
            return item._id === accountId
        })
        return accountObj.amount
    }

    getTypeOperation(typeOperation) {
        let type = ''
        switch (typeOperation) {
            case "1": type = 'Пополнение' 
                break
            case "2": type = 'Перевод'
                break
            default: type ='Списание'
        }
        return type
    }

    render(){
        const objDeatil = this.getInfo()
        // this.getAccountName(objDeatil.account)
        // debugger
        return (
            <section style={{
                margin: '15px',
                backgroundColor: '#eceff1',
                color: 'black'
            }}>
                {objDeatil && <YandexMap coord={objDeatil.operCoord} />}
                {objDeatil && <List>
                    {/* <ListItem
                        key={0}
                        tapBackgroundColor="#0f0f0f"
                    >
                        <span>{`${OPERATIONDETAILS[0]}: ${objDeatil.operCoord.lat}-${objDeatil.operCoord.lon}`}</span>
                    </ListItem> */}
                    <ListItem
                        key={1}
                        tapBackgroundColor="#0f0f0f"
                    >
                        <span>{`${OPERATIONDETAILS[1]}: ${objDeatil.data.date} ${objDeatil.data.time}`}</span>
                    </ListItem>
                    <ListItem
                        key={2}
                        tapBackgroundColor="#0f0f0f"
                    >
                        <span>{`${OPERATIONDETAILS[2]}: ${this.getAccountName(objDeatil.account)}`}</span>
                    </ListItem>
                    <ListItem
                        key={3}
                        tapBackgroundColor="#0f0f0f"
                    >
                        <span>{`${OPERATIONDETAILS[3]}: ${this.getTypeOperation(objDeatil.typeOperation)}`}</span>
                    </ListItem>
                    <ListItem
                        key={4}
                        tapBackgroundColor="#0f0f0f"
                    >
                        <span>{`${OPERATIONDETAILS[4]}: ${objDeatil.amount}`}</span>
                    </ListItem>
                    <ListItem
                        key={5}
                        tapBackgroundColor="#0f0f0f"
                    >
                        <span>{`${OPERATIONDETAILS[5]}: ${this.getAccountAmount(objDeatil.account)}`}</span>
                    </ListItem>
                </List>}
                <Button
                    onClick={this.props.handleHideModal}
                    modifier='quiet large'
                >
                    Закрыть
                </Button>
            </section>
        )
    }
}

ShowOperDetails.propTypes = {
    _id: PropTypes.string,
    handleHideModal: PropTypes.func,
}

export default connect((state) => ({
    operations: state.changeLastOperations,
    accountsList: state.changeAccountsList
}))(ShowOperDetails)