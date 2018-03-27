import {
    BACKMAINFROMNEWACCOUNT,
    ADDACCOUNTTOLIST,
    ADDOPERATIONTOLIST,
    EDITACCOUNTINLIST,
    SELECTTYPEOPERATION,
    ACCOUNTTOEDIT,
    CHANGECATEGORYSTATISTIC
} from '../js/consts'

export function changeAnimationState(value) {
    return {
        type: BACKMAINFROMNEWACCOUNT,
        payload: value
    }
}

export function addAccountToList(value) {
    return {
        type: ADDACCOUNTTOLIST,
        payload: value
    }
}

export function editAccountInList(value) {
    return {
        type: EDITACCOUNTINLIST,
        payload: value
    }
}

export function addOperationToList(value) {
    return {
        type: ADDOPERATIONTOLIST,
        payload: value
    }
}

export function selectTypeOperation(value) {
    return {
        type: SELECTTYPEOPERATION,
        payload: value
    }
}

export function accountToEdit(id) {
    return {
        type: ACCOUNTTOEDIT,
        payload: id
    }
}

export function changeCategoryStatistic(id) {
    return {
        type: CHANGECATEGORYSTATISTIC,
        payload: id
    }
}