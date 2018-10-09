// @flow
import Requester from '@/js/requester';
import { LOGON_PAGE_NAMESPACE } from './logon-constants';

const serverRequests = new Requester();

export const SET_AUTH_RESULT = `${LOGON_PAGE_NAMESPACE}/SET_AUTH_RESULT`;
export const setAuthResult = (logonResult: Object) => ({
  type: SET_AUTH_RESULT,
  payload: logonResult,
});

export const logonRequest = (logonData) => (dispatch) => {
  logonData.actionName = SET_AUTH_RESULT;
  return serverRequests.send('authUser', 'POST', logonData, dispatch)
    .then((responce) => {
      dispatch(setAuthResult(responce));
    })
};
