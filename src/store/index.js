import { createStore, applyMiddleware } from 'redux'
import reducer from '../reducer'
import logger from '../middlewares/logger'
// import updateRate from '../middlewares/updateOneRate'

const enhancer = applyMiddleware(logger)
const store = createStore(reducer, {}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

//dev only
window.store = store

export default store