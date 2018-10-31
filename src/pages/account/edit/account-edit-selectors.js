import { createSelector } from 'reselect';

export const newCreditRequestPageState = state => state['accounts'];

export const changeAccountToEdit = createSelector(
  newCreditRequestPageState,
  pageState => pageState,
);
