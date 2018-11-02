import { ADDACCOUNTTOLIST } from './account-add-constants';
export const addAccountToList = (value) => {
  return {
    type: ADDACCOUNTTOLIST,
    payload: value
  }
}