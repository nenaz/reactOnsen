import React from 'react';
// import ReactDOM from 'react-dom';
// import { connect } from 'react-redux';
// import {
//     addInputs,
//     subtractInputs,
//     async_addInputs
// } from '../actions/calculatorActions';

// const mapStateToProps = ({ output }) => ({
//     output
// });

export class Home extends React.Component {
    render() {
        return (
            <div>
                Результат : <span id="output">{this.props.output}</span>
            </div>
        )
    }
}

// export default connect(mapStateToProps, {
//     addInputs,
//     subtractInputs,
//     async_addInputs
// })(Home);