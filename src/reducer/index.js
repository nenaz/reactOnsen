import { combineReducers } from "redux"
import changeAnimationState from './changeAnimationState'
import changeAccountsList from './changeAccountsList'
import changeLastOperations from './changeLastOperations'

export default combineReducers({
    changeAnimationState,
    changeAccountsList,
    changeLastOperations
})