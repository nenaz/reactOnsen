import React,{ Component} from 'react'
import {
    Page,
    Button
} from 'react-onsenui'
import ToolbarC from '../Toolbar'
import {
    changeAnimationState,
    // addAccountToList
} from '../../AC'
import { connect } from 'react-redux'
import jsPDF from 'jspdf'

class DownlodPDF extends Component{
    constructor(props){
        super(props)
        this.state ={}

        this.handleSaveClick = this.handleSaveClick.bind(this)
        this.createDocument = this.createDocument.bind(this)
    }

    handlerCanselClick() {
        this.props.changeAnimationState('backMainFromNewAccount')
        setTimeout(() => {
            this.props.changeAnimationState('')
        }, 500);
    }

    renderToolbar() {
        return (
            <ToolbarC
                title='Download PDF'
                handlerCanselClick={this.handlerCanselClick}
            />
        )
    }

    handleSaveClick() {
        this.createDocument()
    }

    createDocument() {
        const doc = new jsPDF()

        doc.text('Hello world!', 10, 10)
        doc.save('a4.pdf')
    }

    render(){
        return (
            <Page renderToolbar={this.renderToolbar}>
                <Button onClick={this.handleSaveClick}>Save</Button>
            </Page>
        )
    }
}

export default connect(null, {
    changeAnimationState,
    // addAccountToList
})(DownlodPDF)