import React,{ Component} from 'react'
import Utils from '../../js/utils'

class Icon extends Component{
    constructor(props){
        super(props)
        this.state ={}

        this.addStyles = this.addStyles.bind(this)
    }

    addStyles() {
        const obj = {
            height: '20px',
            width: '20px',
            opacity: 1,
            fontSize: '16px',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            position: 'relative',
            top: '30%'
        }
        if (this.props.objstyle) {
            for (let key in this.props.objstyle) {
                obj[key] = this.props.objstyle[key]
            }
        }
        obj.backgroundImage = `url(${Utils.deleteFirstSymbol(this.props.iconUrl)})`
        return obj
    }

    render(){
        console.log(this.addStyles())
        return (
            <div style={this.addStyles()}></div>
        )
    }
}

export default Icon