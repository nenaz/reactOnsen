import React,{ Component} from 'react'

class Icon extends Component{
    constructor(props){
        super(props)
        this.state ={}

        this.addStyles = this.addStyles.bind(this)
    }

    addStyles() {
        const obj = {
            width: '25px',
            top: '10%',
            position: 'relative'
        }
        if (this.props.styleObj) {
            for (let key in this.props.styleObj) {
                obj[key] = this.props.styleObj[key]
            }
        }
        return obj
    }

    render(){
        return (
            <img alt="" src={this.props.iconBase64} style={this.addStyles()} />
        )
    }
}

export default Icon