import { getFormValues } from 'redux-form';
// import { createSelector } from 'reselect';
import { ACCOUNT_PAGE_FORM_NAME } from './account-page-constants';

export const formSelector = getFormValues(ACCOUNT_PAGE_FORM_NAME);
 