import { connect } from 'react-redux';
import { AccountAddForm } from './account-add-form';
import { addAccountToList } from './account-add-actions';

// handlePeopleChange(e) {
//   this.setState({
//     accountPeople: e.target.value
//   });
// }

// handleDateChange(e) {
//   this.setState({
//     accountDate: e.target.value
//   });
// }

// handleNumberChange(e) {
//   this.setState({
//     accountNumber: e.target.value
//   });
// }

// handleAccountNameChange(e) {
//   this.setState({
//     accountName: e.target.value
//   });
// }

// handleAmountChange(e) {
//   let noError = (e && e.data) ? e.data.match(/\d/) : null
//   if (noError === null) {
//     this.setState({
//       error: true
//     })
//   }
//   this.setState({
//     amount: e.target.value
//   })
// }

// handleEditSelects(e) {
//   this.setState({ modifier: e.target.value });
// }

// handlerOkClick(e) {
//   const addObject = {
//     ...this.props.form.addAccount.values,
//     currency: 'RUB',
//     pname: 'AccountButton',
//     _id: Utils.getRandomId()
//   }
//   this.props.addAccountToList(addObject)
//   this.req.request('addAccount', addObject)
//   this.handlerCanselClick()
// }

// handleDismiss() {
//   this.setState({
//     toastShown: false
//   })
// }

// handleShow() {
//   this.setState({
//     toastShown: true
//   })
// }

// renderToolbar() {
//   return (
//     <ToolbarCustom
//       hasBackButton={this.props.route.hasBackButton}
//       title="Добавить счет"
//       handlerCanselClick={this.handlerCanselClick}
//     />
//   )
// }

// const handlerCanselClick() {
//   this.props.navigator.popPage();
// }

export const AccountAddController = connect(
  null,
  {
    addAccountToList,
  }
)(AccountAddForm);
