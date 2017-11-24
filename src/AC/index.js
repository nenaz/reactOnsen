import { BACKMAINFROMNEWACCOUNT } from '../js/consts'

export function changeAnimationState(value) {
    return {
        type: BACKMAINFROMNEWACCOUNT,
        payload: value
    }
}