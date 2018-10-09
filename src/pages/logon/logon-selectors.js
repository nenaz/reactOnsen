// @flow
import { createSelector } from 'reselect';
import { LOGON_PAGE_NAMESPACE } from './logon-constants';

const LogonState = (state) => {
  console.log();
  // return state[LOGON_PAGE_NAMESPACE];
  return state['logonReducer'];
};

export const getAuthResult = createSelector(
  LogonState,
  (pageState) => {
    console.log();
    return pageState;
  }
);
