import { ADD_ACCOUNT } from './account-page-actions';

export const AccountPageReducer = (addAcc = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_ACCOUNT:
      return payload;
    default:
      return addAcc;
  }
}
