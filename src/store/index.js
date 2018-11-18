import { createStore, applyMiddleware, compose } from 'redux';
import { compact } from 'lodash';
import thunk from 'redux-thunk';
import reducer from '../reducer'
import { loggingMiddleware } from '../middlewares/logger'

export const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    ...compact([window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()])
  ),
);
