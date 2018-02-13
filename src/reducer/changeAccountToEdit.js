import { ACCOUNTTOEDIT } from '../js/consts'

export default (obj = {}, action) => {
    const { type, payload } = action
    switch (type) {
        case ACCOUNTTOEDIT: return payload
        default: return obj
    }
}