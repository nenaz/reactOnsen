import { EDITACCOUNTINLIST, DELETEACCOUNTFROMLIST } from './account-edit-constant';

export const editAccountInList = (value) => {
  return {
    type: EDITACCOUNTINLIST,
    payload: value,
  };
};

export const deleteAccountFromList = (value) => {
  return {
      type: DELETEACCOUNTFROMLIST,
      payload: value,
  };
};
