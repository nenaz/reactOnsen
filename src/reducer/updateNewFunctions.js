import { SETNEWFUNCTIONS } from '../js/consts'

export default (obj = {}, action) => {
    const { type, payload } = action
    switch (type) {
        case SETNEWFUNCTIONS: return payload
        default: return obj
    }
}