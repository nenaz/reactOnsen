import React, { Component } from 'react'
import {
  Toast,
  Fab,
} from 'react-onsenui'
import 'onsenui/css/onsenui.css'
import 'onsenui/css/onsen-css-components.css'
import Requester from '@/js/requester'
import Utils from '@/js/utils'
import ToolbarCustom from '@/components/ToolbarCustom';
import Form from '@/components/Pages/Account/Form/form'
import OptionsItem from '@/components/OptionsItem';
import { Page } from '@/components/Page';


export class AddAccount extends Component {
  constructor(props) {
    super(props)
    this.state = {
      accountName: '',
      amount: '',
      modifier: '',
      toastShown: false,
      error: false,
      accountNumber: '',
      accountDate: '',
      accountPeople: '',
    }

    this.req = new Requester()

    this.renderToolbar = this.renderToolbar.bind(this)
    this.handleAccountNameChange = this.handleAccountNameChange.bind(this)
    this.handleAmountChange = this.handleAmountChange.bind(this)
    this.handlerOkClick = this.handlerOkClick.bind(this)
    this.handleShow = this.handleShow.bind(this)
    this.handleDismiss = this.handleDismiss.bind(this)
    this.handlerCanselClick = this.handlerCanselClick.bind(this)
    this.handleNumberChange = this.handleNumberChange.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
    this.handlePeopleChange = this.handlePeopleChange.bind(this)
  }

  handlePeopleChange(e) {
    this.setState({
      accountPeople: e.target.value
    });
  }

  handleDateChange(e) {
    this.setState({
      accountDate: e.target.value
    });
  }

  handleNumberChange(e) {
    this.setState({
      accountNumber: e.target.value
    });
  }

  handleAccountNameChange(e) {
    this.setState({
      accountName: e.target.value
    });
  }

  handleAmountChange(e) {
    let noError = (e && e.data) ? e.data.match(/\d/) : null
    if (noError === null) {
      this.setState({
        error: true
      })
    }
    this.setState({
      amount: e.target.value
    })
  }

  handleEditSelects(e) {
    this.setState({ modifier: e.target.value });
  }

  handlerOkClick(e) {
    const addObject = {
      ...this.props.form.addAccount.values,
      currency: 'RUB',
      pname: 'AccountButton',
      _id: Utils.getRandomId()
    }
    this.props.addAccountToList(addObject)
    this.req.request('addAccount', addObject)
    this.handlerCanselClick()
  }

  handleDismiss() {
    this.setState({
      toastShown: false
    })
  }

  handleShow() {
    this.setState({
      toastShown: true
    })
  }

  renderToolbar() {
    return (
      <ToolbarCustom
        hasBackButton={this.props.route.hasBackButton}
        title="Добавить счет"
        handlerCanselClick={this.handlerCanselClick}
      />
    )
  }

  handlerCanselClick() {
    this.props.navigator.popPage();
  }

  render() {
    return (
      <Page>
        <div className="nzAddAccountPage">
          <Form />
          <OptionsItem
            title="Не учитывать в общем балансе"
            checked={!this.state.consider}
            handleChangeSwitch={this.handleChangeSwitch}
          />
        </div>
        {/* <Toast isOpen={this.state.toastShown}>
          <div className="message">
            An error has occurred!
          </div>
          <button onClick={this.handleDismiss}>
            Dismiss
          </button>
        </Toast> */}
        {/* <Fab
          position='bottom right'
          onClick={this.handlerOkClick}
        >
          <span className="icon-checked" />
        </Fab> */}
      </Page>
    )
  }
};
