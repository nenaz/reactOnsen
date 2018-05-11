import { CHANGEPASSCODE } from '../js/consts'

export default (passcode = '', action) => {
    const {type, payload} = action
    switch(type) {
        case (CHANGEPASSCODE): return payload
        default: return passcode
    }
} 