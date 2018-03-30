import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    Page,
    List,
    ListItem,
    Button,
    Dialog
} from 'react-onsenui'
import Title from "../../Title";
// import { LISTCATEGORY } from '../../js/consts'

class PageSubCategory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dialogShown: false,
            subcategory: []
        }

        this.renderRowCategory = this.renderRowCategory.bind(this)
        // this.renderRowTopCategory = this.renderRowTopCategory.bind(this)
        // this.showDialog = this.showDialog.bind(this)
        // this.hideDialog = this.hideDialog.bind(this)
    }

    renderRowCategory(row) {
        return (
            <ListItem
                key={row.value}
                style={{
                    borderBottom: '1px solid #eceff1',
                }}
                tappable
                onClick={this.props.handleSelectCategoty}
                id={`${this.props.dataSource.value}-${row.value}`}
            >
                <span>{row.title}</span>
            </ListItem>
        )
    }

    render() {
        return (
            <section style={{
                margin: '15px',
                backgroundColor: '#eceff1',
                color: 'black'
            }}>
                <Title title={`${this.props.dataSource.title}, подкатегории`} />
                <List
                    dataSource={this.props.dataSource.data}
                    renderRow={this.renderRowCategory}
                    style={{
                        height: '52vh',
                        overflowY: 'scroll'
                    }}
                />
                <Button
                    onClick={() => {
                        this.props.handleHideModal(false, 'modalOpen')
                    }}
                    modifier='quiet large'
                >
                    Close
                </Button>
            </section>
        )
    }
}

export default PageSubCategory

PageSubCategory.propTypes = {
    dataSource: PropTypes.object,
    handleHideModal: PropTypes.func,
    handleSelectCategoty: PropTypes.func,
}