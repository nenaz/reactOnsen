import { BACKMAINFROMNEWACCOUNT } from '../js/consts'

export default (animationDirection = '', action) => {
    const {type, payload} = action
    switch(type) {
        case BACKMAINFROMNEWACCOUNT: return payload 
        default: return animationDirection
    }
}