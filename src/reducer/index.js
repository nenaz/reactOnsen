import { combineReducers } from "redux"
import changeAnimationState from './changeAnimationState'
import changeAccountsList from './changeAccountsList'

export default combineReducers({
    changeAnimationState,
    changeAccountsList
})