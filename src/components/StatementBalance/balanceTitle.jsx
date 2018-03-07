import React,{ Component} from 'react'

class BalanceTitle extends Component{
    constructor(props){
        super(props)
        this.state ={}
    }

    render(){
        return (
            <section className="nzBalanceTitle">
                <span>Сегодня пришло</span>
                <span></span>
                <span>Сегоня ушло</span>
            </section>
        )
    }
}

export default BalanceTitle