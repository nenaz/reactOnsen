import { combineReducers } from "redux"
import { reducer as formReducer } from 'redux-form'
import changeAnimationState from './changeAnimationState'
import changeAccountsList from './changeAccountsList'
import changeLastOperations from './changeLastOperations'
import changeTypeOperation from './changeTypeOperation'
import changeAccountToEdit from './changeAccountToEdit'
import changeCategoryStatistic from './changeCategoryStatistic'
import updateNewFunctions from './updateNewFunctions'
import redAddDataToList from './redAddDataToList'
import changePassCode from './changePassCode'
import saveDataOfScan from './saveDataOfScan'
import updateStatusSync from './updateStatusSync'
import changeAuthButtonClassName from './changeAuthButtonClassName';
import { logonReducer } from '@/pages/logon';

export default combineReducers({
    changeAnimationState,
    changeAccountsList,
    changeLastOperations,
    changeTypeOperation,
    changeAccountToEdit,
    changeCategoryStatistic,
    updateNewFunctions,
    redAddDataToList,
    changePassCode,
    saveDataOfScan,
    updateStatusSync,
    changeAuthButtonClassName,
    form: formReducer,
    logonReducer,
})