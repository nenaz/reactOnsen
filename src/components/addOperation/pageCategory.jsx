import React, { Component } from 'react'
import {
    Page,
    List,
    ListItem,
    Button,
    Dialog
} from 'react-onsenui'
import Title from "../Title";
import { LISTCATEGORY } from '../../js/consts'

class PageCategory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dialogShown: false,
            subcategory: []
        }

        this.renderRowCategory = this.renderRowCategory.bind(this)
        this.renderRowTopCategory = this.renderRowTopCategory.bind(this)
        this.showDialog = this.showDialog.bind(this)
        this.hideDialog = this.hideDialog.bind(this)
    }

    renderRowTopCategory(row) {
        return (
            <ListItem
                key={row}
                style={{
                    borderBottom: '1px solid #eceff1',
                }}
                tappable
            >
                <span>{row}</span>
            </ListItem>
        )
    }

    renderRowCategory(row) {
        return (
            <ListItem
                key={row.value}
                style={{
                    borderBottom: '1px solid #eceff1',
                }}
                tappable
                onClick={this.showDialog}
                id={row.value}
            >
                <span>{row.title}</span>
            </ListItem>
        )
    }

    showDialog(e) {
        console.log(LISTCATEGORY[e.currentTarget.id])
        // this.setState({
        //     subcategory: LISTCATEGORY[e.currentTarget.id].data
        // }, () => {
            this.setState({
                dialogShown: true
            })
        // });
    }

    hideDialog(e) {
        this.setState({ dialogShown: false });
    }

    render() {
        return (
            <Page className="test">
                <section>
                    <Title title="Частые категории"/>
                    <List
                        dataSource={[1,2,3,4]}
                        renderRow={this.renderRowTopCategory}
                    />
                </section>
                <section>
                    <Title title="Категории"/>
                    <List
                        dataSource={LISTCATEGORY}
                        renderRow={this.renderRowCategory}
                    />
                </section>
                <Dialog
                    isOpen={this.state.dialogShown}
                    isCancelable={true}
                    onCancel={this.hideDialog}>
                    <div style={{ textAlign: 'center', margin: '20px' }}>
                        <p style={{ opacity: 0.5 }}>This is a dialog!</p>
                        <p>
                            <Button onClick={this.hideDialog}>Close</Button>
                        </p>
                    </div>
                    {/* <List
                        dataSource={this.state.subcategory}
                        renderRow={this.renderRowTopCategory}
                    /> */}
                </Dialog>
            </Page>
        )
    }
}

export default PageCategory