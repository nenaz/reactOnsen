import { combineReducers } from "redux"
import changeAnimationState from './changeAnimationState'
import changeAccountsList from './changeAccountsList'
import changeLastOperations from './changeLastOperations'
import changeTypeOperation from './changeTypeOperation'
import changeAccountToEdit from './changeAccountToEdit'
import changeCategoryStatistic from './changeCategoryStatistic'

export default combineReducers({
    changeAnimationState,
    changeAccountsList,
    changeLastOperations,
    changeTypeOperation,
    changeAccountToEdit,
    changeCategoryStatistic
})