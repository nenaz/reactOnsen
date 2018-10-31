// import * as React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { EditAccount } from './account-edit';
import { changeAccountToEdit } from './account-edit-selectors';
import {
  editAccountInList,
  deleteAccountFromList,
} from './account-edit-actions';

const mapStateToProps = createStructuredSelector({
  accountToEdit: changeAccountToEdit,
});

export const EditAccountController = connect(
  mapStateToProps,
  {
    editAccountInList,
    deleteAccountFromList
  }
)(EditAccount);
