import React,{ Component} from 'react'
import { connect } from 'react-redux'
import { List, ListItem } from 'react-onsenui'

class WaigetLastOperations extends Component{
    constructor(props){
        super(props)
        this.state ={}
    }

    renderRow(row, index) {
        return (
            <ListItem key={index} tapBackgroundColor="#0f0f0f" tappable={true}>
                <div>item
                </div>
            </ListItem>
        )
    }

    render(){
        return (
            <List 
                dataSource={this.props.operations.slice(0,5)}
                renderRow={this.renderRow}
            />
        )
    }
}

export default connect((state) => ({
    operations: state.changeLastOperations
}))(WaigetLastOperations)