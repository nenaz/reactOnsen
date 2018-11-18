import { connect } from 'react-redux';
import { AccountPage } from './account-page';
import { addNewAccount } from './account-page-actions';
import { formSelector } from './account-page-selectors';
import { createStructuredSelector } from 'reselect';

const mapStateToProps = createStructuredSelector({
  formValues: formSelector,
});

const mapDispatchToProps = {
  addNewAccount,
};

export const AccountPageController = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AccountPage);
