import React,{ Component} from 'react'
import { connect } from 'react-redux'
import { List, ListItem } from 'react-onsenui'
import iconUpCash from '../../img/payment-in.svg'
import iconDownCash from '../../img/payment-out.svg'
import Icon from '../Icon'

class WaigetLastOperations extends Component{
    constructor(props){
        super(props)
        this.state ={
            moreFive: false
        }
    }

    renderRow(row, index) {
        const icon = (row.typeOperation === "1") ? iconUpCash : iconDownCash
        return (
            <ListItem key={index} tapBackgroundColor="#0f0f0f" tappable={true}>
                <div className="left">
                    <Icon iconUrl={icon} objstyle={{
                        height: '37px',
                        width: '42px',
                        top: '0%',
                        backgroundSize: 'contain'
                    }}/>
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
                        {/* <span>{row.currency}</span> */}
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

    renderMore(length) {
        
    }

    render(){
        return (
            <div>
                <List 
                    dataSource={this.props.operations.slice(0,5)}
                    renderRow={this.renderRow}
                />
                {this.renderMore(this.props.operations.length)}
            </div>
        )
    }
}

export default connect((state) => ({
    operations: state.changeLastOperations
}))(WaigetLastOperations)