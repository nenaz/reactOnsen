import { createStore, applyMiddleware } from 'redux'
import reducer from './reducer'
import logger from './middlewares/logger'

const enhancer = applyMiddleware(logger)
export const store = createStore(reducer, {}, enhancer)

window.store = store
