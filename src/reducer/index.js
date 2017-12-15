import { combineReducers } from "redux"
import changeAnimationState from './changeAnimationState'
import changeAccountsList from './changeAccountsList'
import changeLastOperations from './changeLastOperations'
import changeTypeOperation from './changeTypeOperation'

export default combineReducers({
    changeAnimationState,
    changeAccountsList,
    changeLastOperations,
    changeTypeOperation
})