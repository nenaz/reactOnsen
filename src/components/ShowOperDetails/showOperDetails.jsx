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
        return this.props.operations.find((item, key) => {
            return item._id === this.props._id
        })
    }

    render(){
        const objDeatil = this.getInfo()
        return (
            <section style={{
                margin: '15px',
                backgroundColor: '#eceff1',
                color: 'black'
            }}>
                {objDeatil && <YandexMap coord={objDeatil.operCoord} />}
                {objDeatil && <List>
                    <ListItem
                        key={0}
                        tapBackgroundColor="#0f0f0f"
                    >
                        <span>{`${OPERATIONDETAILS[0]}: ${objDeatil.operCoord.lat}-${objDeatil.operCoord.lon}`}</span>
                    </ListItem>
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
                        <span>{`${OPERATIONDETAILS[2]}: ${objDeatil.balance}`}</span>
                    </ListItem>
                    <ListItem
                        key={3}
                        tapBackgroundColor="#0f0f0f"
                    >
                        <span>{`${OPERATIONDETAILS[3]}: ${objDeatil.currency}`}</span>
                    </ListItem>
                </List>}
                <Button
                    onClick={this.props.handleHideModal}
                    modifier='quiet large'
                >
                    Close
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
    operations: state.changeLastOperations
}))(ShowOperDetails)