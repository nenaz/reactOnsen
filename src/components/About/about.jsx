import React,{ Component} from 'react'
import {
    Button
} from 'react-onsenui'

class About extends Component{
    constructor(props){
        super(props)
        this.state ={}
    }

    render(){
        return (
            <section
                style={{
                    margin: '16px',
                    backgroundColor: 'white',
                    color: 'black',
                    height: '50%',
                    borderRadius: '5%'
                }}
            >
                <section
                    style={{
                        height: '85%'
                    }}
                >
                    <div>About</div>
                    <div style={{
                        padding: '8px'
                    }}>Icons made by <a href="https://www.flaticon.com/authors/eleonor-wang" title="Eleonor Wang">Eleonor Wang</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>
                    </div>
                    <div>Icons made by <a href="https://www.flaticon.com/authors/amit-jakhu" title="Amit Jakhu">Amit Jakhu</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div> 
                    <div>Icons made by <a href="https://www.flaticon.com/authors/lyolya" title="Lyolya">Lyolya</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
                    <div>Icons made by <a href="https://www.flaticon.com/authors/darius-dan" title="Darius Dan">Darius Dan</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
                </section>
                <section>
                    <Button
                        onClick={this.props.handleModalClose}
                    >Отмена</Button>
                </section>
            </section>
        )
    }
}

export default About