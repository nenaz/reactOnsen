import {
    BACKMAINFROMNEWACCOUNT,
    ADDACCOUNTTOLIST,
    ADDOPERATIONTOLIST,
    EDITACCOUNTINLIST
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