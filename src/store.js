import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { compact } from 'lodash';
import reducers from './reducer';

export const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    // $FlowIgnore Can't type
    ...compact([window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()]),
  ),
);

window.store = store;
