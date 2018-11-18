import { Send } from '@/js/requestToServer';
import { ACCOUNT_PAGE_NAME_SPACE } from './account-page-constants';


export const ADD_ACCOUNT = `${ACCOUNT_PAGE_NAME_SPACE}/ADD_ACCOUNT`;

export const addNewAccount = (accountObj = {}) => (dispatch) => {
  console.log('addNewAccount', 'Попытка сохранения', accountObj);
  return Send('addAccount', accountObj)
    .then((response) => {
      dispatch({
        type: ADD_ACCOUNT,
        payload: {},
      });
      return response;
    });
};
