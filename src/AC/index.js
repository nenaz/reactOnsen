import {
    BACKMAINFROMNEWACCOUNT,
    ADDACCOUNTTOLIST
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