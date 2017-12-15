import { SELECTTYPEOPERATION } from '../js/consts'

export default (typeOperation = '0', action) => {
    const { type, payload } = action
    switch (type) {
        case SELECTTYPEOPERATION: return payload
        default: return typeOperation
    }
}