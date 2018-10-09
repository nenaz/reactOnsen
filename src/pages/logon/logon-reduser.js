// @flow
import { SET_AUTH_RESULT } from './logon-actions';

const INITIAL_STATE = {};

export const logonReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case SET_AUTH_RESULT:
      return {
        ...state,
        ...payload,
      };
    default: return state;
  }
};