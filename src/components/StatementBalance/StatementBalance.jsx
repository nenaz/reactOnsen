import React,{ Component} from 'react'
import Balance from './Balance'

class StatementBalance extends Component{
    constructor(props){
        super(props)
        this.state ={}
    }

    render(){
        return (
            <section style={{
                display: 'flex',
                justifyContent: 'space-between',
                borderBottom: '1px solid #f7e5e5'
            }}>
                <Balance amount="999" separator />
                <Balance amount="1000" />
            </section>
        )
    }
}

export default StatementBalance