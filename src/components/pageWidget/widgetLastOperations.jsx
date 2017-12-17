import React,{ Component} from 'react'
import { connect } from 'react-redux'
import { List, ListItem } from 'react-onsenui'
// import Requester from '../../js/requester'
import { addOperationToList } from '../../AC'

class WaigetLastOperations extends Component{
    constructor(props){
        super(props)
        this.state ={
            moreFive: false
        }
    }

    renderRow(row, index) {
        const x = 40 + Math.round(5 * (Math.random() - 0.5)),
            y = 40 + Math.round(5 * (Math.random() - 0.5));

        return (
            <ListItem key={index} tapBackgroundColor="#0f0f0f" tappable={true}>
                <div className='left'>
                    <img alt="" src={`http://placekitten.com/g/${x}/${y}`}
                        className='list-item__thumbnail'
                    />
                </div>
                <div  className="center">
                    <span>{row.amount}</span>
                    <span>{row.currency}</span>
                    <div>
                        <span>{row.data.date}</span>
                        <span>{row.data.time}</span>
                    </div>
                </div>
            </ListItem>
        )
    }

    renderMore(length) {
        
    }

    // componentWillMount() {
    //     if (this.props.operations) {
    //     const req = new Requester()
    //     req.send('http://127.0.0.1:8000/getLastFive', 'POST').then(result => {
    //         console.log(result)
    //         const arrOper = JSON.parse(result)
    //         arrOper.map((item) => {
    //             this.props.addOperationToList(item)
    //         })
    //     })
    // }

    render(){
        return (
            <div>
                <List 
                    dataSource={this.props.operations.slice(-5)}
                    renderRow={this.renderRow}
                />
                {this.renderMore(this.props.operations.length)}
            </div>
        )
    }
}

export default connect((state) => ({
    operations: state.changeLastOperations
}),{
    addOperationToList
})(WaigetLastOperations)